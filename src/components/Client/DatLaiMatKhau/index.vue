<template>
  <div
    class="reset-password-page min-vh-100 d-flex align-items-center justify-content-center py-5"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            class="card border-0 shadow-lg rounded-4 overflow-hidden animate__animated animate__fadeIn"
          >
            <div
              class="card-header bg-gradient text-center py-4 position-relative"
            >
              <div class="header-bg"></div>
              <h3 class="mb-3 fw-bold position-relative z-10 text-dark">
                ĐẶT LẠI MẬT KHẨU
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

            <div class="card-body p-4 p-md-5">
              <div class="text-center mb-4">
                <img
                  src="../../../assets/images/imgfooter.png"
                  width="120"
                  alt="Logo"
                />
              </div>

              <p class="text-muted text-center mb-4">
                Vui lòng nhập mật khẩu mới cho tài khoản của bạn
              </p>

              <form @submit.prevent="xacNhan()" class="row g-3">
                <input v-model="tai_khoan.hash_reset" type="hidden" />

                <div class="col-12">
                  <label class="form-label text-dark fw-semibold"
                    >Mật khẩu mới</label
                  >
                  <input
                    v-model="tai_khoan.password"
                    type="password"
                    class="form-control form-control-lg rounded-pill"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div class="col-12">
                  <label class="form-label text-dark fw-semibold"
                    >Nhập lại mật khẩu</label
                  >
                  <input
                    v-model="tai_khoan.re_password"
                    type="password"
                    class="form-control form-control-lg rounded-pill"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div class="col-12 mt-4">
                  <button
                    type="submit"
                    class="btn btn-login w-100 py-3 rounded-pill fw-bold text-uppercase shadow-lg"
                  >
                    Xác Nhận
                  </button>
                </div>

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
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  props: ["ma_bi_mat"],
  data() {
    return {
      tai_khoan: {},
    };
  },
  mounted() {
    this.tai_khoan.hash_reset = this.$route.params.ma_bi_mat;
  },
  methods: {
    xacNhan() {
      axios
        .post(
          "http://127.0.0.1:8000/api/khach-hang/dat-lai-mat-khau",
          this.tai_khoan
        )
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message);
            this.$router.push("/khach-hang/dang-nhap");
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
};
</script>
  
  <style scoped>
.reset-password-page {
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  min-height: 100vh;
  padding-top: 0 !important;
}

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

.link-glow {
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  overflow: hidden;
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

.link-forgot {
  color: #888 !important;
  transition: all 0.3s ease;
}
.link-forgot:hover {
  color: #dbab57 !important;
}

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
  }
}
</style>