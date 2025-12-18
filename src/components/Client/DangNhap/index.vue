<template>
  <div
    class="login-page min-vh-100 d-flex align-items-center justify-content-center py-5"
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
                ĐĂNG NHẬP
              </h3>
              <p
                class="mb-0 position-relative z-10 small text-white d-inline-flex align-items-center gap-1 lh-1"
              >
                Bạn chưa có tài khoản?
                <router-link
                  to="/khach-hang/dang-ky"
                  class="text-white fw-bold text-decoration-underline link-glow"
                  style="vertical-align: baseline"
                >
                  Đăng ký tại đây
                </router-link>
              </p>
            </div>

            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="dangNhap()" class="row g-3">
                <div class="col-12">
                  <label class="form-label text-dark fw-semibold">Email</label>
                  <input
                    v-model="login.email"
                    type="email"
                    class="form-control form-control-lg rounded-pill"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div class="col-12">
                  <label class="form-label text-dark fw-semibold"
                    >Mật khẩu</label
                  >
                  <div class="input-group">
                    <input
                      v-model="login.password"
                      :type="passwordFieldType"
                      class="form-control form-control-lg rounded-pill"
                      placeholder="••••••••"
                      required
                    />
                    <span
                      class="input-group-text bg-white border-0 rounded-end-pill"
                      @click="togglePasswordVisibility"
                      style="cursor: pointer"
                    >
                      <i
                        :class="
                          passwordFieldType === 'password'
                            ? 'fa-regular fa-eye-slash'
                            : 'fa-regular fa-eye'
                        "
                      ></i>
                    </span>
                  </div>
                </div>

                <div class="col-12 text-end">
                  <router-link
                    to="/quen-mat-khau"
                    class="text-muted small text-decoration-underline link-forgot"
                  >
                    Quên mật khẩu?
                  </router-link>
                </div>

                <div class="col-12 mt-4">
                  <button
                    type="submit"
                    class="btn btn-login w-100 py-3 rounded-pill fw-bold text-uppercase shadow-lg"
                  >
                    Đăng Nhập
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
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      passwordFieldType: "password", // mặc định ẩn
    };
  },
  mounted() {
    this.checkLogin();
    document.body.style.paddingTop = "0";
  },
  beforeUnmount() {
    const navbar = document.querySelector(".sticky-header");
    if (navbar) {
      document.body.style.paddingTop = `${navbar.offsetHeight}px`;
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    dangNhap() {
      axios
        .post("http://127.0.0.1:8000/api/khach-hang/dang-nhap", this.login)
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message);
            localStorage.setItem("token_khachhang", res.data.token);
            localStorage.setItem("ho_ten", res.data.ho_ten);

            const redirectPath = this.$route.query.redirect;

            if (redirectPath) {
              this.$router.push(redirectPath);
            } else {
              this.$router.push("/");
            }
            // --------------------------------------------------
          } else {
            toaster.error(res.data.message);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const errors = error.response.data.errors;
            for (let value in errors) {
              toaster.error(errors[value][0]);
            }
          } else {
            toaster.error("Đã xảy ra lỗi không mong muốn!");
          }
        });
    },
    checkLogin() {
      axios
        .get("http://127.0.0.1:8000/api/kiem-tra-token-khach-hang", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token_khachhang"),
          },
        })
        .then((res) => {
          if (res.data.status) {
            const redirectPath = this.$route.query.redirect;
            if (redirectPath) {
              this.$router.push(redirectPath);
            } else {
              this.$router.push("/");
            }
          }
        });
    },
  },
};
</script>

<style scoped>
.login-page {
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
  box-shadow: 0 0 0 0.2rem rgba(255, 153, 0, 0.25);
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

.link-forgot {
  color: #888 !important;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  overflow: hidden;
}
.link-forgot::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: #dbab57;
  transition: width 0.3s ease;
}
.link-forgot:hover {
  color: #dbab57 !important;
  transform: translateY(-1px);
}
.link-forgot:hover::after {
  width: 100%;
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
    padding: 0.75rem !important;
  }
}
</style>