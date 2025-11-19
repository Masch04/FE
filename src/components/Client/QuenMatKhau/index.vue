<template>
  <div
    class="forgot-page min-vh-100 d-flex align-items-center justify-content-center py-5"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            class="card border-0 shadow-lg rounded-4 overflow-hidden animate__animated animate__fadeIn"
          >
            <!-- Header vàng cam – GIỐNG HỆT ĐĂNG NHẬP -->
            <div
              class="card-header bg-gradient text-center py-4 position-relative"
            >
              <div class="header-bg"></div>
              <h3 class="mb-3 fw-bold position-relative z-10 text-dark">
                QUÊN MẬT KHẨU
              </h3>
              <p
                class="mb-0 position-relative z-10 small text-white d-inline-flex align-items-center gap-1 lh-1"
              >
                Đã nhớ mật khẩu?
                <router-link
                  to="/khach-hang/dang-nhap"
                  class="text-white fw-bold text-decoration-underline link-glow"
                  style="vertical-align: baseline"
                >
                  Đăng nhập ngay
                </router-link>
              </p>
            </div>

            <!-- Body -->
            <div class="card-body p-4 p-md-5">
              <p class="text-muted text-center mb-4 fst-italic opacity-75">
                <em>Nhập email của bạn để nhận liên kết đặt lại mật khẩu</em>
              </p>

              <form @submit.prevent="gui()" class="row g-3">
                <!-- Email -->
                <div class="col-12">
                  <label class="form-label text-dark fw-semibold">Email</label>
                  <input
                    v-model="tai_khoan.email"
                    type="email"
                    class="form-control form-control-lg rounded-pill"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <!-- Nút Gửi -->
                <div class="col-12 mt-4">
                  <button
                    type="submit"
                    class="btn btn-login w-100 py-3 rounded-pill fw-bold text-uppercase shadow-lg"
                  >
                    Gửi Yêu Cầu
                  </button>
                </div>

                <!-- Quay lại đăng nhập -->
                <div class="col-12 text-center mt-3">
                  <router-link
                    to="/khach-hang/dang-nhap"
                    class="text-muted small text-decoration-underline link-forgot"
                  >
                    <i class="bx bx-arrow-back me-1"></i> Quay lại đăng nhập
                  </router-link>
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
// Giữ nguyên 100% script cũ của bạn – KHÔNG ĐỘNG GÌ HẾT
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  data() {
    return {
      tai_khoan: {},
    };
  },
  methods: {
    gui() {
      axios
        .post(
          "http://127.0.0.1:8000/api/khach-hang/quen-mat-khau",
          this.tai_khoan
        )
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message);
            this.$router.push("/");
          } else {
            toaster.error(res.data.message);
          }
        })
        .catch((res) => {
          var result = Object.entries(res.response.data.errors);
          result.forEach((v) => {
            toaster.error(v[1][0]);
          });
        });
    },
  },
  mounted() {
    document.body.style.paddingTop = "0";
  },
  beforeUnmount() {
    const navbar = document.querySelector(".sticky-header");
    if (navbar) {
      document.body.style.paddingTop = `${navbar.offsetHeight}px`;
    }
  },
};
</script>

<style scoped>
/* ĐỒNG BỘ HOÀN TOÀN VỚI TRANG ĐĂNG NHẬP */
.forgot-page {
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  min-height: 100vh;
  padding-top: 0 !important;
}

/* Header giống hệt đăng nhập */
.card-header {
  background: linear-gradient(135deg, #dbab57, #977334) !important;
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem 1.5rem 0 0;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,30 L100,100 L0,100 Z" fill="rgba(255,255,255,0.1)"/></svg>')
    no-repeat bottom;
  background-size: cover;
  opacity: 0.3;
}

.card-header p {
  line-height: 1 !important;
  margin: 0 !important;
}

/* Input giống hệt */
.form-control {
  border: 2px solid #ddd;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  background-color: #f8f9fa;
}
.form-control:focus {
  border-color: #dbab57;
  box-shadow: 0 0 0 0.2rem rgba(219, 171, 87, 0.25);
  transform: translateY(-1px);
  background-color: white;
}

/* Nút giống hệt nút Đăng nhập */
.btn-login {
  background: linear-gradient(135deg, #dbab57, #e68a00);
  color: white;
  font-size: 1.1rem;
  letter-spacing: 1px;
  transition: all 0.4s ease;
  border: none;
}
.btn-login:hover {
  background: linear-gradient(135deg, #e68a00, #cc7700);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 153, 0, 0.4);
}

/* Link "Đăng nhập ngay" – hiệu ứng glow giống trang đăng nhập */
.link-glow {
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  overflow: hidden;
  line-height: 1;
}
.link-glow::after {
  content: "";
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
  color: #ffcc00 !important;
  text-shadow: 0 0 8px rgba(255, 204, 0, 0.6);
  transform: scale(1.05);
}
.link-glow:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Link "Quay lại đăng nhập" */
.link-forgot {
  color: #888 !important;
  transition: all 0.3s ease;
}
.link-forgot:hover {
  color: #dbab57 !important;
}

/* Responsive giống hệt */
@media (max-width: 576px) {
  .card {
    margin: 1rem;
    border-radius: 1rem;
  }
  .card-body {
    padding: 1.5rem !important;
  }
  .btn-login {
    font-size: 1rem;
    padding: 0.75rem !important;
  }
}
</style>