<template>
  <div class="room-detail-page font-primary bg-light min-vh-100" v-if="room">
    
    <!-- HEADER ẢNH (HERO) -->
    <section class="detail-hero position-relative">
      <div class="hero-bg" :style="{ backgroundImage: `url(${room.hinh_anh})` }"></div>
      <div class="hero-overlay"></div>
      <div class="container position-relative h-100 d-flex align-items-end pb-5">
        <div class="text-white animate__animated animate__fadeInUp">
          <span class="text-gold text-uppercase letter-spacing-2 fw-bold mb-2 d-block">Luxury Stay</span>
          <h1 class="display-3 fw-bold mb-3" style="font-family: 'Playfair Display', serif;">
            {{ room.ten_loai_phong }}
          </h1>
          <div class="d-flex align-items-center gap-4 text-white-50">
            <span><i class="bx bx-area me-1"></i> {{ room.dien_tich }} m²</span>
            <span><i class="bx bx-user me-1"></i> {{ room.so_nguoi_lon }} Người lớn</span>
            <!-- Hiển thị thêm trẻ em nếu có dữ liệu -->
            <span v-if="room.so_tre_em"><i class="bx bx-child me-1"></i> {{ room.so_tre_em }} Trẻ em</span>
          </div>
        </div>
      </div>
    </section>

    <!-- NỘI DUNG CHÍNH -->
    <section class="container py-5 mt-n5 position-relative" style="z-index: 2;">
      <div class="row g-5">
        
        <!-- CỘT TRÁI: THÔNG TIN -->
        <div class="col-lg-8">
          <div class="bg-white p-5 rounded-4 shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
            
            <h3 class="font-playfair fw-bold mb-4">Mô tả phòng</h3>
            <!-- SỬA: Lấy trực tiếp từ Database, dùng pre-line để giữ xuống dòng -->
            <div class="text-muted lead mb-5" style="line-height: 1.8; white-space: pre-line;">
              {{ room.mo_ta || 'Đang cập nhật mô tả cho phòng này...' }}
            </div>

            <h4 class="font-playfair fw-bold mb-4">Tiện nghi cao cấp</h4>
            
            <!-- SỬA: Hiển thị HTML từ cột 'tien_ich' trong Database -->
            <div v-if="room.tien_ich" class="amenities-html text-secondary mb-5">
                <div v-html="room.tien_ich"></div>
            </div>
            
            <!-- Fallback nếu DB chưa có tiện ích -->
            <div v-else class="text-muted mb-5">
                Đang cập nhật tiện ích...
            </div>

            <hr class="text-muted opacity-25">
            
            <div class="mt-4">
               <h4 class="font-playfair fw-bold mb-3">Quy định phòng</h4>
               <ul class="text-muted list-unstyled">
                 <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Check-in: 14:00 PM</li>
                 <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Check-out: 12:00 PM</li>
                 <li><i class="bx bx-x text-danger me-2"></i>Không hút thuốc trong phòng</li>
               </ul>
            </div>
          </div>
        </div>

        <!-- CỘT PHẢI: ĐẶT PHÒNG -->
        <div class="col-lg-4">
          <div class="card border-0 shadow-lg rounded-4 sticky-top" style="top: 100px;">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <p class="text-muted mb-1 text-uppercase small fw-bold">Giá niêm yết</p>
                <h2 class="text-gold font-playfair fw-bold display-6">
                  {{ formatPrice(room.gia_mac_dinh) }}
                </h2>
                <small class="text-muted">/ đêm</small>
              </div>

              <div class="d-grid gap-3">
                <button class="btn btn-dark btn-lg py-3 rounded-3 text-uppercase fw-bold shadow-sm hover-gold">
                  Đặt Phòng Ngay
                </button>
                <button class="btn btn-outline-dark btn-lg py-3 rounded-3 text-uppercase fw-bold" @click="$router.go(-1)">
                  Quay lại
                </button>
              </div>

              <div class="mt-4 pt-3 border-top text-center">
                <p class="mb-2"><i class="bx bx-phone text-gold me-2"></i>Hỗ trợ 24/7</p>
                <a href="tel:19001000" class="fw-bold text-dark text-decoration-none fs-5">1900 1000</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
  
  <!-- Loading State -->
  <div v-else class="vh-100 d-flex align-items-center justify-content-center bg-white">
    <div class="spinner-border text-gold" role="status" style="width: 3rem; height: 3rem;"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  props: ['id'], 
  data() {
    return {
      room: null,
      // Đã xóa biến description thừa
    }
  },
  created() {
    this.fetchRoomDetail();
  },
  methods: {
    async fetchRoomDetail() {
      // Đảm bảo URL này đúng với Laravel của bạn
      const apiUrl = `http://127.0.0.1:8000/api/client/loai-phong/chi-tiet/${this.id}`;
      
      try {
        const res = await axios.get(apiUrl);
        // Gán trực tiếp dữ liệu từ DB vào biến room
        this.room = res.data.data || res.data; 
        
        // Đã xóa dòng gọi hàm fake description
        
      } catch (error) {
        console.error(error);
        toaster.error("Không thể tải thông tin phòng này.");
        this.$router.push('/'); 
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
    },
    // Đã xóa hàm getRoomDescription() vì không còn dùng nữa
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

.font-primary { font-family: 'Inter', sans-serif; }
.font-playfair { font-family: 'Playfair Display', serif; }
.text-gold { color: #D4AF37 !important; }
.bg-light { background-color: #f8f9fa !important; }

/* Hero Section */
.detail-hero {
  height: 60vh;
  min-height: 400px;
  position: relative;
}
.hero-bg {
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.8);
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);
}

.letter-spacing-2 { letter-spacing: 2px; }

.mt-n5 { margin-top: -80px !important; }

/* Button */
.btn-dark {
  background-color: #1a1a1a; border: none;
  transition: all 0.3s ease;
}
.btn-dark:hover {
  background-color: #D4AF37;
  transform: translateY(-2px);
}
.hover-gold:hover {
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3) !important;
}

/* --- MỚI: CSS CHO PHẦN TIỆN ÍCH TỪ DATABASE --- */
/* Vì DB lưu thẻ p và i, ta cần style cho nó đẹp */
:deep(.amenities-html) {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Chia làm 2 cột */
    gap: 15px;
}
:deep(.amenities-html p) {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: #6c757d; /* text-secondary */
}
:deep(.amenities-html i) {
    color: #D4AF37; /* Màu vàng */
    font-size: 1.2rem;
    width: 30px;
    text-align: center;
    margin-right: 10px;
    background: #fff9e6; /* Nền tròn vàng nhạt */
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
}

@media (max-width: 991px) {
  .mt-n5 { margin-top: 20px !important; }
  .detail-hero { height: 40vh; }
  :deep(.amenities-html) { grid-template-columns: 1fr; } /* Mobile 1 cột */
}
</style>