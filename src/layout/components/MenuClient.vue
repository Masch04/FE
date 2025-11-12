<template>
    <div class="sticky-header">
      <nav class="navbar navbar-expand-lg navbar-dark mona-navbar">
        <div class="container-fluid">
          <!-- Logo -->
          <router-link to="/" class="navbar-brand d-flex align-items-center">
            <span class="logo-text">MONA MEDIA</span>
          </router-link>
  
          <!-- Toggle button for mobile -->
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#monaNavbarContent"
            aria-controls="monaNavbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
  
          <!-- Navbar Content -->
          <div class="collapse navbar-collapse" id="monaNavbarContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0 text-center text-lg-start">
              <!-- TRANG CHỦ -->
              <li class="nav-item">
                <router-link to="/" class="nav-link home-link" active-class="active">
                  <i class="bx bx-home-alt"></i> TRANG CHỦ
                </router-link>
              </li>
  
              <!-- GIỚI THIỆU -->
              <li class="nav-item">
                <router-link to="/gioi-thieu" class="nav-link">
                  <i class="bx bx-user"></i> GIỚI THIỆU
                </router-link>
              </li>
  
              <!-- DANH SÁCH PHÒNG -->
              <li class="nav-item">
                <router-link to="/danh-sach-phong" class="nav-link">
                  <i class="bx bx-building"></i> PHÒNG
                </router-link>
              </li>
  
              <!-- DỊCH VỤ -->
              <li class="nav-item">
                <router-link to="/dich-vu" class="nav-link">
                  <i class="bx bx-concierge"></i> DỊCH VỤ
                </router-link>
              </li>
  
              <!-- TIN TỨC (Dropdown) -->
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="bx bx-news"></i> TIN TỨC
                </a>
                <ul class="dropdown-menu">
                  <template v-for="(v, k) in ds_chuyen_muc" :key="k">
                    <li>
                      <router-link
                        :to="'/bai-viet/' + v.slug_chuyen_muc"
                        class="dropdown-item"
                      >
                        {{ v.ten_chuyen_muc }}
                      </router-link>
                    </li>
                  </template>
                </ul>
              </li>
  
              <!-- LIÊN HỆ -->
              <li class="nav-item">
                <router-link to="/lien-he" class="nav-link">
                  <i class="bx bx-phone"></i> LIÊN HỆ
                </router-link>
              </li>
            </ul>
  
            <!-- Nút Đặt Phòng + Đăng nhập/Đăng ký + User -->
            <div class="d-flex align-items-center justify-content-center justify-content-lg-end gap-2">
              <!-- Nút Đặt Phòng -->
              <router-link to="/dat-phong">
                <button class="btn btn-book-now">ĐẶT PHÒNG NGAY</button>
              </router-link>
  
              <!-- Khi CHƯA đăng nhập: Hiển thị Đăng Nhập + Đăng Ký -->
              <template v-if="!is_check">
                <router-link to="/khach-hang/dang-nhap">
                  <button class="btn btn-outline-light btn-login">Đăng Nhập</button>
                </router-link>
                <router-link to="/khach-hang/dang-ky">
                  <button class="btn btn-register">Đăng Ký</button>
                </router-link>
              </template>
  
              <!-- Khi ĐÃ đăng nhập: Hiển thị avatar + tên -->
              <template v-else>
                <div class="user-box dropdown ms-3">
                  <a
                    class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret text-white"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
                      class="user-img rounded-circle"
                      alt="user avatar"
                    >
                    <div class="user-info ps-3 text-start d-none d-lg-block">
                      <p class="user-name mb-0 fw-bold">{{ ten_hien_thi }}</p>
                      <p class="designation mb-0 small">Khách Hàng</p>
                    </div>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <router-link to="/profile" class="dropdown-item">
                        <i class="bx bx-user"></i> Profile
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/khach-hang/hoa-don" class="dropdown-item">
                        <i class="bx bx-receipt"></i> Hóa Đơn Đặt Phòng
                      </router-link>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a @click="dangXuat" class="dropdown-item text-danger">
                        <i class="bx bx-log-out"></i> Đăng Xuất
                      </a>
                    </li>
                    <li>
                      <a @click="dangXuatAll" class="dropdown-item text-danger">
                        <i class="bx bx-log-out-circle"></i> Đăng Xuất Tất Cả
                      </a>
                    </li>
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
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("token_khachhang")
            }
          })
          .then((res) => {
            if (res.data.status) {
              this.is_check = true;
              this.ten_hien_thi = localStorage.getItem('ho_ten') || 'Khách Hàng';
            }
          })
          .catch(() => {
            this.is_check = false;
          });
      },
      layDuLieuChuyenMuc() {
        axios
          .get('http://127.0.0.1:8000/api/client/chuyen-muc/data')
          .then((res) => {
            this.ds_chuyen_muc = res.data.chuyen_muc || [];
          })
          .catch(() => {
            this.ds_chuyen_muc = [];
          });
      },
      dangXuat() {
        axios
          .get('http://127.0.0.1:8000/api/khach-hang/dang-xuat', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("token_khachhang")
            }
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
      dangXuatAll() {
        axios
          .get('http://127.0.0.1:8000/api/khach-hang/dang-xuat-all', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("token_khachhang")
            }
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
            const height = navbar.offsetHeight;
            document.body.style.paddingTop = `${height}px`;
          }
        });
      }
    },
  }
  </script>
  
  <style scoped>
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
    background: transparent !important;
    padding: 1rem 1.5rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  /* Logo */
  .logo-text {
    color: #ff9900;
    font-weight: 800;
    font-size: 1.8rem;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(255, 153, 0, 0.6);
    font-family: 'Montserrat', sans-serif;
  }
  
  /* Nav links chung */
  .mona-navbar .nav-link {
    color: #e0e0e0 !important;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.9rem;
    padding: 0.5rem 1rem !important;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .mona-navbar .nav-link i {
    font-size: 1.1rem;
    color: #aaa;
    transition: color 0.3s ease;
  }
  
  .mona-navbar .nav-link:hover,
  .mona-navbar .nav-link.active {
    color: #ff9900 !important;
  }
  
  .mona-navbar .nav-link:hover i,
  .mona-navbar .nav-link.active i {
    color: #ff9900;
  }
  
  /* TRANG CHỦ - viền vàng khi active */
  .home-link {
    position: relative;
    border: 1px solid transparent;
    border-radius: 8px;
    padding: 0.4rem 1rem !important;
  }
  
  .home-link.active {
    border-color: #ff9900;
    background-color: rgba(255, 153, 0, 0.15);
    color: #ff9900 !important;
  }
  
  .home-link.active i {
    color: #ff9900;
  }
  
  /* Dropdown */
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
  
  /* Nút Đặt Phòng Ngay */
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
  
  /* Nút Đăng Nhập - viền trắng */
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
  
  /* Nút Đăng Ký - nền vàng */
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
  
  /* Mobile Responsive */
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
  
    .nav-link {
      justify-content: center;
    }
  }
  
  /* Fallback padding */
  body {
    padding-top: 90px;
  }
  </style>