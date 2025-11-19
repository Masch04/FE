<template>
  <div class="register-page min-vh-100 d-flex align-items-center justify-content-center py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card border-0 shadow-lg rounded-4 overflow-hidden animate__animated animate__fadeIn">
            <!-- Header vàng cam -->
            <div class="card-header bg-gradient text-center py-4 position-relative">
              <div class="header-bg"></div>
              <h3 class="mb-3 fw-bold position-relative z-10 text-dark">Đăng Ký</h3>
              <p class="mb-0 position-relative z-10 small text-white d-inline-flex align-items-center gap-1 lh-1">
                Bạn đã có tài khoản?
                <router-link to="/khach-hang/dang-nhap" class="text-white fw-bold text-decoration-underline link-glow"
                  style="vertical-align: baseline;">
                  Đăng nhập tại đây
                </router-link>
              </p>
            </div>

            <!-- Form -->
            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="dangKy()" class="row g-3">
                <!-- Họ & Tên -->
                <div class="col-md-6">
                  <label class="form-label text-dark fw-semibold">Họ đệm</label>
                  <input type="text" class="form-control form-control-lg rounded-pill" v-model="data_dang_ky.ho_lot"
                    placeholder="Nguyễn Văn" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label text-dark fw-semibold">Tên</label>
                  <input type="text" class="form-control form-control-lg rounded-pill" v-model="data_dang_ky.ten"
                    placeholder="A" required>
                </div>

                <!-- Email -->
                <div class="col-12">
                  <label class="form-label text-dark fw-semibold">Email</label>
                  <input type="email" class="form-control form-control-lg rounded-pill" v-model="data_dang_ky.email"
                    placeholder="you@example.com" required>
                </div>

                <!-- SĐT & Ngày sinh -->
                <div class="col-md-6">
                  <label class="form-label text-dark fw-semibold">Số điện thoại</label>
                  <input type="tel" class="form-control form-control-lg rounded-pill"
                    v-model="data_dang_ky.so_dien_thoai" placeholder="0901234567" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label text-dark fw-semibold">Ngày sinh</label>
                  <input type="date" class="form-control form-control-lg rounded-pill" v-model="data_dang_ky.ngay_sinh"
                    required>
                </div>

                <!-- Mật khẩu – ĐÃ SỬA ICON ĐÚNG LOGIC -->
                <div class="col-md-6">
                  <label class="form-label text-dark fw-semibold">Mật khẩu</label>
                  <div class="input-group">
                    <input :type="passwordFieldType" class="form-control form-control-lg rounded-pill"
                      v-model="data_dang_ky.password" placeholder="••••••••" required>
                    <span class="input-group-text bg-white border-0 rounded-end-pill" @click="togglePasswordVisibility"
                      style="cursor: pointer;">
                      <i :class="passwordFieldType === 'password' ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
                    </span>
                  </div>
                </div>

                <!-- Nhập lại mật khẩu – ĐÃ SỬA ICON ĐÚNG LOGIC -->
                <div class="col-md-6">
                  <label class="form-label text-dark fw-semibold">Nhập lại mật khẩu</label>
                  <div class="input-group">
                    <input :type="rePasswordFieldType" class="form-control form-control-lg rounded-pill"
                      v-model="data_dang_ky.re_password" placeholder="••••••••" required>
                    <span class="input-group-text bg-white border-0 rounded-end-pill"
                      @click="toggleRePasswordVisibility" style="cursor: pointer;">
                      <i :class="rePasswordFieldType === 'password' ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
                    </span>
                  </div>
                </div>

                <!-- Nút Đăng ký -->
                <div class="col-12 mt-4">
                  <button type="submit"
                    class="btn btn-register w-100 py-3 rounded-pill fw-bold text-uppercase shadow-lg">
                    <i class="fa-solid me-2"></i>Đăng Ký Ngay
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  data() {
    return {
      passwordFieldType: 'password',
      rePasswordFieldType: 'password',
      data_dang_ky: {
        ho_lot: '',
        ten: '',
        email: '',
        so_dien_thoai: '',
        ngay_sinh: '',
        password: '',
        re_password: '',
      }
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
    toggleRePasswordVisibility() {
      this.rePasswordFieldType = this.rePasswordFieldType === 'password' ? 'text' : 'password';
    },
    dangKy() {
      axios
        .post('http://127.0.0.1:8000/api/dang-ky', this.data_dang_ky)
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message);
            this.data_dang_ky = {
              ho_lot: '', ten: '', email: '', so_dien_thoai: '', ngay_sinh: '', password: '', re_password: ''
            };
            this.$router.push('/khach-hang/dang-nhap');
          } else {
            toaster.error(res.data.message);
          }
        })
        .catch((res) => {
          const errors = res.response?.data?.errors || {};
          Object.values(errors).forEach(errArray => {
            errArray.forEach(msg => toaster.error(msg));
          });
        });
    }
  },
  mounted() {
    document.body.style.paddingTop = '0';
  },
  beforeUnmount() {
    const navbar = document.querySelector('.sticky-header');
    if (navbar) {
      document.body.style.paddingTop = `${navbar.offsetHeight}px`;
    }
  }
}
</script>

<style scoped>
/* Toàn bộ style giữ nguyên đẹp như cũ */
.register-page {
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  min-height: 100vh;
  padding-top: 0 !important;
}

.card-header {
  background: linear-gradient(135deg, #DBAB57, #e68a00) !important;
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem 1.5rem 0 0;
}

.header-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,30 L100,100 L0,100 Z" fill="rgba(255,255,255,0.1)"/></svg>') no-repeat bottom;
  background-size: cover;
  opacity: 0.3;
}

.card-header p { line-height: 1 !important; margin: 0 !important; }

.form-control {
  border: 2px solid #ddd;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  background-color: #f8f9fa;
}
.form-control:focus {
  border-color: #DBAB57;
  box-shadow: 0 0 0 0.2rem rgba(255, 153, 0, 0.25);
  transform: translateY(-1px);
  background-color: white;
}

.btn-register {
  background: linear-gradient(135deg, #DBAB57, #e68a00);
  color: white;
  font-size: 1.1rem;
  letter-spacing: 1px;
  transition: all 0.4s ease;
  border: none;
}
.btn-register:hover {
  background: linear-gradient(135deg, #e68a00, #cc7700);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 153, 0, 0.4);
}

.link-glow {
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  overflow: hidden;
}
.link-glow::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}
.link-glow:hover {
  color: #fff !important;
  text-shadow: 0 0 5px rgba(255,255,255,0.8), 0 0 10px rgba(255,255,255,0.6);
  transform: scale(1.05);
}
.link-glow:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

@media (max-width: 576px) {
  .card { margin: 1rem; border-radius: 1rem; }
  .card-body { padding: 1.5rem !important; }
  .btn-register { font-size: 1rem; padding: 0.75rem !important; }
}
</style>