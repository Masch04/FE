<template>
  <div class="restaurant-page" id="top">
    <!-- Banner -->
    <section class="hero-restaurant position-relative overflow-hidden" data-aos="fade-zoom-in" data-aos-delay="100">
      <div class="hero-bg"></div>
      <div class="container position-relative" style="z-index: 2;">
        <div class="row justify-content-center text-center py-5">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold text-white mb-3" data-aos="fade-up" data-aos-delay="200">
              NHÀ HÀNG <span class="text-warning">SANG TRỌNG</span>
            </h1>
            <p class="text-white lead mb-0 opacity-90" data-aos="fade-up" data-aos-delay="300">
              Trải nghiệm ẩm thực đỉnh cao với thực đơn đa dạng và không gian tinh tế.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- Nội dung chính -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row g-5 align-items-center">
          <!-- Cột văn bản -->
          <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
            <p class="text-uppercase small text-muted mb-2" style="letter-spacing: 2px;">
              TRẢI NGHIỆM ẨM THỰC QUAN TRỌNG
            </p>
            <h2 class="display-5 fw-bold mb-4">Nhà hàng sang trọng</h2>
            <p class="text-muted mb-4">
              Được dẫn dắt bởi Chef de Michael Martin, Nhà hàng nổi tiếng với ẩm thực tuyệt vời và không
              gian độc đáo. Phòng ăn tuyệt đẹp có ba bếp studio mở, cho phép bạn thưởng thức quang cảnh và
              âm thanh của nghệ thuật ẩm thực được trưng bày. Thực đơn thể hiện cảm hứng của châu Á và
              châu Âu.
            </p>

            <h5 class="fw-bold mb-3">Khung giờ</h5>
            <ul class="list-unstyled text-muted">
              <li class="mb-2 d-flex align-items-center" data-aos="fade-up" data-aos-delay="100">
                <i class="bx bxs-time text-warning me-2"></i>
                <strong>Bữa sáng:</strong> 07:00 sáng – 11:00 trưa (hàng ngày)
              </li>
              <li class="mb-2 d-flex align-items-center" data-aos="fade-up" data-aos-delay="200">
                <i class="bx bxs-time text-warning me-2"></i>
                <strong>Bữa trưa:</strong> 12:00 trưa – 02:00 chiều (hàng ngày)
              </li>
              <li class="mb-2 d-flex align-items-center" data-aos="fade-up" data-aos-delay="300">
                <i class="bx bxs-time text-warning me-2"></i>
                <strong>Bữa tối:</strong> 05:00 chiều – 09:00 tối (daily)
              </li>
            </ul>
          </div>
          <!-- Cột carousel ảnh (TỰ ĐỘNG, KHÔNG CÓ NÚT) -->
          <div class="col-lg-6" data-aos="fade-left" data-aos-delay="200">
            <div id="restaurantCarousel" class="carousel slide shadow-lg rounded-4 overflow-hidden restaurant-carousel"
              data-bs-ride="carousel" data-bs-interval="3500" data-bs-pause="false">
              <!-- Ảnh chuyển mượt -->
              <div class="carousel-inner">
                <div v-for="(img, i) in images" :key="i" :class="['carousel-item', { active: i === 0 }]" data-aos="fade"
                  data-aos-delay="100">
                  <img :src="img" class="d-block w-100" style="height: 400px; object-fit: cover;" alt="Món ăn">
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
  name: 'RestaurantPage',
  data() {
    return {
      images: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'
      ]
    }
  }
}
</script>

<style scoped>
.hero-restaurant {
  height: 70vh;
  min-height: 500px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600') center/cover no-repeat;
}

/* Carousel mượt hơn */
.carousel-item {
  transition: transform 0.8s ease-in-out !important;
}

/* Indicators nhỏ gọn, đẹp */
.carousel-indicators {
  bottom: 10px;
}

.carousel-indicators button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.carousel-indicators .active {
  background-color: #ffc107;
  opacity: 1;
  transform: scale(1.3);
}

/* Hover toàn bộ carousel */
.restaurant-carousel {
  transition: all 0.4s ease;
}

.restaurant-carousel:hover {
  transform: scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}
</style>