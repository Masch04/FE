<template>
  <div class="restaurant-page" id="top">
    <!-- Banner -->
    <section
      class="hero-restaurant position-relative overflow-hidden"
      data-aos="fade-zoom-in"
      data-aos-delay="100"
    >
      <div class="hero-bg"></div>
      <div class="container position-relative" style="z-index: 2">
        <div class="row justify-content-center text-center py-5">
          <div class="col-lg-8">
            <h1
              class="display-3 fw-bold text-white mb-4 text-shadow-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              NHÀ HÀNG <span class="text-gold">SANG TRỌNG</span>
            </h1>
            <p
              class="fs-3 text-white opacity-95 lh-base"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Trải nghiệm ẩm thực đỉnh cao với thực đơn đa dạng và không gian
              tinh tế.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 bg-light">
      <div class="container py-lg-5">
        <div class="row g-5 align-items-center">
          <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
            <p
              class="text-uppercase small text-gold fw-semibold mb-3 tracking-wider"
              style="letter-spacing: 4px"
            >
              TRẢI NGHIỆM ẨM THỰC ĐẲNG CẤP
            </p>
            <h2 class="display-4 fw-bold mb-4 text-dark lh-1 playfair">
              Nhà Hàng Sang Trọng
            </h2>
            <p class="lead text-muted mb-5 fs-5 lh-lg">
              Được dẫn dắt bởi Chef de Cuisine Michael Martin, nhà hàng nổi
              tiếng với ẩm thực tuyệt vời và không gian độc đáo. Phòng ăn tuyệt
              đẹp có ba bếp studio mở, cho phép bạn thưởng thức quang cảnh và âm
              thanh của nghệ thuật ẩm thực được trưng bày. Thực đơn thể hiện cảm
              hứng từ châu Á và châu Âu.
            </p>

            <h4 class="fw-bold mb-4 text-dark playfair">Giờ mở cửa</h4>
            <ul class="list-unstyled text-muted fs-5">
              <li
                class="mb-3 d-flex align-items-center"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <i class="bx bxs-time fs-4 text-gold me-3"></i>
                <div>
                  <strong class="text-dark">Bữa sáng:</strong><br />
                  <span class="opacity-90">07:00 – 11:00 hàng ngày</span>
                </div>
              </li>
              <li
                class="mb-3 d-flex align-items-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <i class="bx bxs-time fs-4 text-gold me-3"></i>
                <div>
                  <strong class="text-dark">Bữa trưa:</strong><br />
                  <span class="opacity-90">12:00 – 14:00 hàng ngày</span>
                </div>
              </li>
              <li
                class="mb-3 d-flex align-items-center"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <i class="bx bxs-time fs-4 text-gold me-3"></i>
                <div>
                  <strong class="text-dark">Bữa tối:</strong><br />
                  <span class="opacity-90">17:00 – 21:00 hàng ngày</span>
                </div>
              </li>
            </ul>
          </div>

          <div class="col-lg-6" data-aos="fade-left" data-aos-delay="200">
            <div
              id="restaurantCarousel"
              class="carousel slide shadow-2xl rounded-4 overflow-hidden restaurant-carousel"
              data-bs-ride="carousel"
              data-bs-interval="4000"
              data-bs-pause="false"
            >
              <div class="carousel-inner">
                <div
                  v-for="(img, i) in images"
                  :key="i"
                  :class="['carousel-item', { active: i === 0 }]"
                >
                  <img
                    :src="img"
                    class="d-block w-100"
                    style="height: 480px; object-fit: cover"
                    alt="Món ăn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "RestaurantPage",
  data() {
    return {
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
      ],
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700&display=swap");

.restaurant-page {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
}

.playfair {
  font-family: "Playfair Display", Georgia, serif !important;
}

.hero-restaurant {
  height: 80vh;
  min-height: 600px;
  background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600")
      center/cover no-repeat;
  display: flex;
  align-items: center;
}

.text-shadow-lg {
  text-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
}

.text-gold {
  color: #dbab57 !important;
}

.tracking-wider {
  letter-spacing: 6px;
}

/* Carousel siêu mượt */
.carousel-item {
  transition: transform 1s ease-in-out !important;
}

.restaurant-carousel {
  transition: all 0.5s ease;
  border-radius: 20px;
  overflow: hidden;
}

.restaurant-carousel:hover {
  transform: scale(1.02);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-restaurant {
    height: 60vh;
    min-height: 500px;
  }
  .display-3 {
    font-size: 3rem !important;
  }
  .display-4 {
    font-size: 2.5rem !important;
  }
}
</style>