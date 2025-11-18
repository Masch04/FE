<template>
  <footer class="footer-premium py-5">
    <div class="container">
      <div class="row g-5">
        <!-- Logo + Mô tả (vẫn giữ col-lg-4) -->
        <div class="col-lg-4 text-center text-lg-start">
          <!-- Lồng một row nhỏ bên trong -->
          <div class="row g-3">
            <!-- g-3: khoảng cách giữa 2 cột nhỏ -->

            <!-- Phần 1: Logo (chiếm 6/12 của col-lg-4 → tương đương col-lg-2) -->
            <div class="col-6">
              <div
                class="d-flex align-items-center justify-content-center mb-3"
              >
                <img
                  src="../../assets/images/imgfooter.png"
                  alt="AIHOTEL PRO"
                  class="footer-logo"
                  style="width: 100%; max-width: 180px; height: auto"
                />
              </div>
            </div>

            <!-- Phần 2: Mô tả (chiếm 6/12 của col-lg-4) -->
            <div class="col-6 d-flex align-items-center">
              <p class="text-light small lh-lg opacity-80 mb-0">
                Khởi dựng từ năm 1995, chúng tôi không ngừng hoàn thiện để trở
                thành một trong những khách sạn mang đến trải nghiệm và dịch vụ
                tận tâm bậc nhất.
              </p>
            </div>
          </div>
        </div>
        <!-- 3 cột: Liên Kết | Địa Chỉ | Liên Hệ – CĂN CHỈNH THẲNG HÀNG -->
        <div class="col-lg-8">
          <div class="row g-4 g-lg-5">
            <!-- Liên Kết -->
            <div class="col-6 col-sm-4 col-lg-4">
              <h5 class="section-title">Liên Kết</h5>
              <ul class="list-unstyled footer-links">
                <!-- GIỚI THIỆU - ĐÃ SỬA ĐÚNG, KHÔNG BỊ SÁNG GẠCH CHÂN -->
                <li>
                  <router-link to="/gioi-thieu" class="nav-link">
                    Giới thiệu
                  </router-link>
                </li>

                <!-- Các mục khác (chưa có trang thì để href="#" bình thường) -->
                <li><a href="#" class="nav-link">Liên hệ</a></li>
                <li><a href="#" class="nav-link">Term & Condition</a></li>
                <li><a href="#" class="nav-link">Help Desk</a></li>
              </ul>
            </div>

            <!-- Địa Chỉ -->
            <div class="col-6 col-sm-4 col-lg-4">
              <h5 class="section-title">Địa Chỉ</h5>
              <p class="text-light small mb-2 opacity-80">
                245 Bế Văn Đàn, Thanh Khê, Đà Nẵng.
              </p>
              <a
                href="https://maps.app.goo.gl/81a7GXGaSkjqvMoJ6"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gold text-decoration-underline link-glow d-inline-block"
              >
                <i class="fas fa-map-marker-alt me-2"></i>Xem Google Map
              </a>
            </div>

            <!-- Liên Hệ -->
            <div class="col-12 col-sm-4 col-lg-4">
              <h5 class="section-title">Liên Hệ</h5>
              <p class="text-gold mb-2">
                <i class="fas fa-phone-alt me-2"></i>(+84) 379.892.25
              </p>
              <p class="text-gold mb-4">
                <i class="fas fa-envelope me-2"></i>aihotel@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Dòng cuối -->
      <hr class="footer-divider my-5" />
      <div class="text-center text-light small py-3">
        © Hẹn gặp bạn tại <strong class="text-gold">AIHotel Pro!</strong>
        <a href="#top" class="back-to-top ms-3 text-light">
          <i class="fas fa-arrow-up"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "PremiumFooter",
  mounted() {
    // Back to top smooth
    document.querySelectorAll(".back-to-top").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  },
};
</script>

<style scoped>
.footer-premium {
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  color: #ccc;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Logo */
.footer-logo {
  height: 50px;
  border-radius: 10px;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(255, 153, 0, 0.3));
}

.logo-text {
  background: linear-gradient(90deg, #a37e34, #DBAB57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800 !important;
}

/* Tiêu đề cột – CĂN CHỈNH THẲNG HÀNG */
.section-title {
  color: #DBAB57 !important;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: #DBAB57;
  border-radius: 2px;
}

/* Link – HIỆU ỨNG GIỐNG ĐĂNG NHẬP / ĐĂNG KÝ */
.nav-link {
  color: #bbb;
  text-decoration: none;
  font-size: 0.95rem;
  display: block;
  margin-bottom: 0.6rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.nav-link:hover {
  color: #fff !important;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8),
    0 0 10px rgba(255, 255, 255, 0.6);
  transform: scale(1.05);
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Link-glow – GIỐNG HỆT FORM */
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
  color: #fff !important;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8),
    0 0 10px rgba(255, 255, 255, 0.6);
  transform: scale(1.05);
}

.link-glow:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Icon mạng xã hội */
.social-btn {
  width: 38px;
  height: 38px;
  background: rgba(255, 153, 0, 0.15);
  color: #DBAB57;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 153, 0, 0.3);
}

.social-btn:hover {
  background: #DBAB57;
  color: white;
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 20px rgba(255, 153, 0, 0.4);
}

/* Nút back to top */
.back-to-top {
  width: 36px;
  height: 36px;
  background: #DBAB57;
  color: white;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.4s ease;
  box-shadow: 0 4px 12px rgba(255, 153, 0, 0.3);
}

.back-to-top:hover {
  background: #cc7700;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 153, 0, 0.5);
}

/* Divider */
.footer-divider {
  border: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #444, transparent);
  margin: 2.5rem 0 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-premium {
    text-align: center;
  }

  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .social-btn {
    width: 42px;
    height: 42px;
  }
}
.text-gold {
  color: #f1c881 !important;
}
</style>