<template>
  <div class="sticky-header">
    <nav class="navbar navbar-expand-lg navbar-dark mona-navbar">
      <div class="container-fluid">
        <!-- Logo -->
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <span class="logo-text">AIHOTEL PRO</span>
        </router-link>

        <!-- Toggle button for mobile -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#monaNavbarContent"
          aria-controls="monaNavbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Content -->
        <div class="collapse navbar-collapse" id="monaNavbarContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 text-center text-lg-start">
            <!-- TRANG CHỦ -->
            <li class="nav-item">
              <router-link to="/" class="nav-link active-link" active-class="active">
                TRANG CHỦ
              </router-link>
            </li>

            <!-- GIỚI THIỆU -->
            <li class="nav-item">
              <router-link to="/gioi-thieu" class="nav-link active-link" active-class="active">
                GIỚI THIỆU
              </router-link>
            </li>

            <!-- DANH SÁCH PHÒNG -->
            <li class="nav-item">
              <router-link to="/danh-sach-phong" class="nav-link active-link" active-class="active">
                PHÒNG
              </router-link>
            </li>

            <!-- DỊCH VỤ - DROPDOWN -->
            <li class="nav-item dropdown" ref="dichVuDropdown">
              <a class="nav-link dropdown-toggle active-link" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false" :class="{ active: isDichVuActive }" ref="dichVuToggle">
                DỊCH VỤ
              </a>
              <ul class="dropdown-menu">
                <template v-for="(dichVu, index) in ds_dich_vu" :key="index">
                  <li>
                    <router-link :to="dichVu.to" class="dropdown-item" @click="closeDichVuDropdown">
                      {{ dichVu.ten }}
                    </router-link>
                  </li>
                </template>
              </ul>
            </li>

            <!-- TIN TỨC (Dropdown) - ĐÃ SỬA -->
            <li class="nav-item dropdown" ref="tinTucDropdown">
              <a 
                class="nav-link dropdown-toggle active-link" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown"
                aria-expanded="false" 
                :class="{ active: $route.path.includes('/bai-viet') }"
                ref="tinTucToggle"
              >
                TIN TỨC
              </a>
              <ul class="dropdown-menu">
                <template v-for="(v, k) in ds_chuyen_muc" :key="k">
                  <li>
                    <router-link 
                      :to="'/bai-viet/' + v.slug_chuyen_muc" 
                      class="dropdown-item"
                      @click="closeTinTucDropdown"
                    >
                      {{ v.ten_chuyen_muc }}
                    </router-link>
                  </li>
                </template>
              </ul>
            </li>

            <!-- LIÊN HỆ -->
            <!-- <li class="nav-item">
              <router-link to="/lien-he" class="nav-link active-link" active-class="active">
                LIÊN HỆ
              </router-link>
            </li> -->
          </ul>

          <!-- Nút Đặt Phòng + Đăng nhập/Đăng ký + User -->
          <div class="d-flex align-items-center justify-content-center justify-content-lg-end gap-2">
            <router-link to="/dat-phong">
              <button class="btn btn-book-now">ĐẶT PHÒNG NGAY</button>
            </router-link>

            <template v-if="!is_check">
              <router-link to="/khach-hang/dang-nhap">
                <button class="btn btn-outline-light btn-login">Đăng Nhập</button>
              </router-link>
              <router-link to="/khach-hang/dang-ky">
                <button class="btn btn-register">Đăng Ký</button>
              </router-link>
            </template>

            <template v-else>
              <div class="user-box dropdown ms-3">
                <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret text-white"
                  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
                    class="user-img rounded-circle" alt="user avatar">
                  <div class="user-info ps-3 text-start d-none d-lg-block">
                    <p class="user-name mb-0 fw-bold">{{ ten_hien_thi }}</p>
                    <p class="designation mb-0 small">Khách Hàng</p>
                  </div>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><router-link to="/profile" class="dropdown-item">Profile</router-link></li>
                  <li><router-link to="/khach-hang/hoa-don" class="dropdown-item">Hóa Đơn Đặt Phòng</router-link></li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li><a @click="dangXuat" class="dropdown-item text-danger">Đăng Xuất</a></li>
                  <li><a @click="dangXuatAll" class="dropdown-item text-danger">Đăng Xuất Tất Cả</a></li>
                </ul>
              </div>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  data() {
    return {
      ho_lot_hien_thi: 'Chưa đăng nhập',
      ten_hien_thi: 'Chưa đăng nhập',
      is_check: false,
      ds_chuyen_muc: [],
      ds_dich_vu: [
        { ten: 'Nhà hàng', to: '/restaurant' },
        { ten: 'Spa', to: '/spa' },
        { ten: 'Bể bơi', to: '/pool' },
        { ten: 'Gym', to: '/gym' },
      ],
    }
  },
  computed: {
    isDichVuActive() {
      return this.ds_dich_vu.some(d => d.to === this.$route.path);
    }
  },
  mounted() {
    this.checkLogin();
    this.layDuLieuChuyenMuc();
    this.setNavbarPadding();
  },
  methods: {
    checkLogin() {
      axios
        .get('http://127.0.0.1:8000/api/kiem-tra-token-khach-hang', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem("token_khachhang") }
        })
        .then((res) => {
          if (res.data.status) {
            this.is_check = true;
            this.ten_hien_thi = localStorage.getItem('ho_ten') || 'Khách Hàng';
          }
        })
        .catch(() => { this.is_check = false; });
    },
    layDuLieuChuyenMuc() {
      axios
        .get('http://127.0.0.1:8000/api/client/chuyen-muc/data')
        .then((res) => { this.ds_chuyen_muc = res.data.chuyen_muc || []; })
        .catch(() => { this.ds_chuyen_muc = []; });
    },
    dangXuat() {
      axios
        .get('http://127.0.0.1:8000/api/khach-hang/dang-xuat', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem("token_khachhang") }
        })
        .then((res) => {
          if (res.data.status) {
            toaster.success('' + res.data.message);
            localStorage.removeItem('token_khachhang');
            localStorage.removeItem('ho_ten');
            this.is_check = false;
            this.$router.push('/');
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },
    dangXuatAll() {
      axios
        .get('http://127.0.0.1:8000/api/khach-hang/dang-xuat-all', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem("token_khachhang") }
        })
        .then((res) => {
          if (res.data.status) {
            toaster.success('Thông báo<br>' + res.data.message);
            localStorage.removeItem('token_khachhang');
            localStorage.removeItem('ho_ten');
            this.is_check = false;
            this.$router.push('/');
          } else {
            toaster.error('Thông báo<br>' + res.data.message);
          }
        });
    },
    setNavbarPadding() {
      this.$nextTick(() => {
        const navbar = document.querySelector('.sticky-header');
        if (navbar) {
          document.body.style.paddingTop = `${navbar.offsetHeight}px`;
        }
      });
    },

    // ĐÓNG DROPDOWN DỊCH VỤ
    closeDichVuDropdown() {
      this.$nextTick(() => {
        const toggle = this.$refs.dichVuToggle;
        if (toggle && window.bootstrap?.Dropdown) {
          const dropdown = window.bootstrap.Dropdown.getInstance(toggle) || new window.bootstrap.Dropdown(toggle);
          dropdown.hide();
        }
      });
    },

    // ĐÓNG DROPDOWN TIN TỨC - MỚI THÊM
    closeTinTucDropdown() {
      this.$nextTick(() => {
        const toggle = this.$refs.tinTucToggle;
        if (toggle && window.bootstrap?.Dropdown) {
          const dropdown = window.bootstrap.Dropdown.getInstance(toggle) || new window.bootstrap.Dropdown(toggle);
          dropdown.hide();
        }
      });
    }
  },
}
</script>

<style scoped>
/* === GOOGLE FONTS: POPPINS === */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

/* ÁP DỤNG FONT */
.mona-navbar,
.mona-navbar * {
  font-family: 'Poppins', sans-serif !important;
}

/* Cố định navbar */
.sticky-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1050;
  background: linear-gradient(to bottom, #1a1a1a, #0f0f0f);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
}

/* Navbar chính */
.mona-navbar {
  padding: 1rem 1.5rem;
}

/* Logo */
.logo-text {
  color: #ff9900;
  font-weight: 800;
  font-size: 1.8rem;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 153, 0, 0.6);
}

/* Nav links */
.mona-navbar .nav-link {
  color: #e0e0e0 !important;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.9rem;
  padding: 0.5rem 1rem !important;
  transition: all 0.3s ease;
}

.mona-navbar .nav-link:hover {
  color: #ff9900 !important;
}

/* Active link style */
.active-link {
  position: relative;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0.4rem 1rem !important;
  transition: all 0.3s ease;
}

.active-link.active,
.dropdown-toggle.active {
  border-color: #ff9900 !important;
  background-color: rgba(255, 153, 0, 0.15) !important;
  color: #ff9900 !important;
}

/* Dropdown menu */
.dropdown-menu {
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
  margin-top: 8px;
}

.dropdown-item {
  color: #ccc;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.dropdown-item:hover {
  background-color: #ff9900;
  color: #fff !important;
}

/* Buttons */
.btn-book-now {
  background-color: #ff9900;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(255, 153, 0, 0.4);
  min-width: 160px;
}

.btn-book-now:hover {
  background-color: #e68a00;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(255, 153, 0, 0.5);
}

.btn-login {
  color: #fff;
  border: 1.5px solid #fff;
  background: transparent;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  transition: all 0.3s ease;
  min-width: 110px;
}

.btn-login:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: #ff9900;
  color: #ff9900;
}

.btn-register {
  background-color: #ff9900;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  border: none;
  transition: all 0.3s ease;
  min-width: 110px;
  box-shadow: 0 3px 8px rgba(255, 153, 0, 0.3);
}

.btn-register:hover {
  background-color: #e68a00;
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(255, 153, 0, 0.4);
}

/* User avatar */
.user-img {
  width: 42px;
  height: 42px;
  object-fit: cover;
  border: 2px solid #ff9900;
  box-shadow: 0 0 8px rgba(255, 153, 0, 0.4);
}

.user-info .user-name {
  font-size: 0.95rem;
  color: #fff;
  font-weight: 600;
}

.user-info .designation {
  font-size: 0.75rem;
  color: #aaa;
}

/* Mobile */
@media (max-width: 992px) {
  .mona-navbar {
    padding: 0.8rem 1rem;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .btn-book-now,
  .btn-login,
  .btn-register {
    font-size: 0.75rem;
    padding: 0.5rem 0.8rem;
    min-width: 90px;
  }

  .user-info {
    display: none;
  }

  .user-img {
    width: 36px;
    height: 36px;
  }
}
</style>