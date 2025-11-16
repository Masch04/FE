<template>
  <main class="blog-page py-5">
    <div class="container">

      <!-- BÀI VIẾT NỔI BẬT -->
      <div class="row g-4 mb-5">
        <!-- Bài 1 -->
        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
          <div class="featured-card rounded-3 overflow-hidden shadow-lg h-100">
            <div class="row g-0 h-100">
              <div class="col-md-8 p-4 p-lg-5 d-flex flex-column justify-content-center">
                <span class="badge-custom badge-new mb-3">Bài viết mới</span>
                <h3 class="fw-bold text-dark mb-2 lh-base">Phòng Superior</h3>
                <p class="text-muted small mb-3">Nov 12</p>
                <p class="text-dark mb-0 lh-base">
                  Phòng superior (SUP) là hạng phòng khách sạn cao cấp hơn phòng standard.
                </p>
              </div>
              <div class="col-md-4 d-flex align-items-center justify-content-center p-2 bg-white">
                <img 
                  src="https://th.bing.com/th/id/OIP.1TA7eGyx9jvLxRDwzQtMAwHaGW?w=212&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  class="img-fluid rounded-2 shadow-sm" 
                  style="max-height: 180px; object-fit: cover;"
                  alt="Phòng Superior">
              </div>
            </div>
          </div>
        </div>

        <!-- Bài 2 -->
        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
          <div class="featured-card rounded-3 overflow-hidden shadow-lg h-100">
            <div class="row g-0 h-100">
              <div class="col-md-8 p-4 p-lg-5 d-flex flex-column justify-content-center">
                <span class="badge-custom badge-popular mb-3">Truy cập nhiều nhất</span>
                <h3 class="fw-bold text-dark mb-2 lh-base">Phòng View Biển</h3>
                <p class="text-muted small mb-3">Nov 11</p>
                <p class="text-dark mb-0 lh-base">
                  Khách sạn view đẹp ngắm biển Vũng Tàu.
                </p>
              </div>
              <div class="col-md-4 d-flex align-items-center justify-content-center p-2 bg-white">
                <img 
                  src="https://statics.vinpearl.com/Hinh-anh-lich-trinh-du-lich-phu-quoc-cho-nhom-ban-3-ngay-1.jpg"
                  class="img-fluid rounded-2 shadow-sm" 
                  style="max-height: 180px; object-fit: cover;"
                  alt="Phòng View Biển">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TIÊU ĐỀ DANH SÁCH -->
      <div class="section-header mb-5" data-aos="fade-up" data-aos-delay="100">
        <h2 class="section-title">BÀI VIẾT</h2>
        <div class="underline"></div>
      </div>

      <!-- DANH SÁCH BÀI VIẾT -->
      <div class="row g-4">
        <template v-for="(v, k) in ds_bai_viet" :key="k">
          <div 
            class="col-md-6 col-lg-4" 
            data-aos="fade-up" 
            :data-aos-delay="100 + (k % 3) * 100"
          >
            <router-link :to="'/chi-tiet-bai-viet/' + v.id" class="text-decoration-none d-block h-100">
              <div class="blog-card rounded-3 overflow-hidden h-100 transition-card">
                <div class="position-relative overflow-hidden">
                  <img 
                    :src="v.hinh_anh" 
                    class="card-img-top" 
                    alt="..." 
                    style="height: 200px; object-fit: cover; transition: transform 0.5s ease;">
                  <div class="card-overlay"></div>
                </div>
                <div class="card-body p-4 bg-white">
                  <h5 class="card-title fw-bold text-dark mb-2 lh-base">
                    {{ v.ten_bai_viet }}
                  </h5>
                  <p class="card-text text-secondary small line-clamp-3 mb-0">
                    {{ v.mo_ta_ngan }}
                  </p>
                </div>
                <div class="card-footer bg-white border-0 px-4 pb-4 pt-2">
                  <small class="text-muted">
                    Cập nhật 3 phút trước
                  </small>
                </div>
              </div>
            </router-link>
          </div>
        </template>
      </div>

      <!-- Không có bài viết -->
      <div v-if="ds_bai_viet.length === 0" class="text-center py-5" data-aos="fade-up">
        <div class="icon-empty mb-3">
          <svg width="64" height="64" fill="#666" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M4 4.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </div>
        <p class="text-dark lead mb-0">Chưa có bài viết nào trong chuyên mục này.</p>
      </div>
    </div>
  </main>
</template>

<script>
// GIỮ NGUYÊN 100% SCRIPT - KHÔNG ĐỘNG VÀO
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  props: ['slug_chuyen_muc'],
  data() {
    return {
      ds_bai_viet: [],
    }
  },
  mounted() {
    this.layDuLieuBaiViet();
  },
  watch: {
    $route(to, from) {
      this.layDuLieuBaiViet();
    }
  },
  methods: {
    layDuLieuBaiViet() {
      axios
        .get('http://127.0.0.1:8000/api/client/bai-viet/data/' + this.slug_chuyen_muc)
        .then((res) => {
          this.ds_bai_viet = res.data.bai_viet;
        })
        .catch(() => {
          toaster.error("Không tải được dữ liệu bài viết!");
        });
    },
  },
}
</script>

<style scoped>
/* === BACKGROUND: ẢNH HOTEL SANG TRỌNG === */
.blog-page {
  position: relative;
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  line-height: 1.6;
  padding-bottom: 3rem;
}

.blog-page::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=90');
  background-size: cover;
  background-position: center 30%;
  background-repeat: no-repeat;
  z-index: -2;
  filter: brightness(0.7) contrast(1.15);
}

.blog-page::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, 
    rgba(15, 15, 15, 0.92) 0%,
    rgba(10, 10, 10, 0.88) 50%,
    rgba(20, 20, 20, 0.95) 100%
  );
  z-index: -1;
}

/* === CARD NỔI BẬT - BODY TRẮNG === */
.featured-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  height: 100%;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.featured-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 50px rgba(255, 193, 7, 0.25);
  border-color: #ffc107;
}

/* Badge - NỀN VÀNG, CHỮ ĐEN */
.badge-custom {
  display: inline-block;
  padding: 0.55rem 1.1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.badge-new {
  background: #ffc107;
  color: #212529;
  border: 1px solid #ffc107;
}

.badge-popular {
  background: #28a745;
  color: #fff;
  border: 1px solid #28a745;
}

/* === TIÊU ĐỀ DANH SÁCH === */
.section-header {
  text-align: center;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: #ffc107;
  margin: 0;
  text-shadow: 0 3px 10px rgba(0,0,0,0.6);
}

.underline {
  width: 100px;
  height: 5px;
  background: linear-gradient(90deg, #ffc107, #ff8c00);
  border-radius: 3px;
  margin: 16px auto 0;
  display: block;
  box-shadow: 0 2px 6px rgba(255, 193, 7, 0.4);
}

/* === CARD BÀI VIẾT NHỎ - BODY TRẮNG === */
.blog-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.35s ease;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.blog-card:hover {
  transform: translateY(-12px);
  border-color: #ffc107;
  box-shadow: 0 24px 48px rgba(255, 193, 7, 0.2);
}

.blog-card:hover img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.75));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.blog-card:hover .card-overlay {
  opacity: 1;
}

/* === TYPOGRAPHY === */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* === EMPTY STATE === */
.icon-empty svg {
  opacity: 0.6;
  transition: all 0.3s ease;
}

.icon-empty:hover svg {
  opacity: 0.8;
  transform: scale(1.08);
}

/* === RESPONSIVE === */
@media (max-width: 992px) {
  .featured-card .row > div {
    padding: 1.5rem !important;
  }
  .section-title {
    font-size: 2.3rem;
  }
}

@media (max-width: 768px) {
  .featured-card,
  .blog-card {
    margin-bottom: 1.5rem;
  }
  .section-title {
    font-size: 2.1rem;
  }
  .underline {
    width: 80px;
    height: 4px;
  }
}
</style>