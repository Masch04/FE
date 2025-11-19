<template>
  <div class="room-list-page font-primary">
    <!-- BANNER -->
    <section class="hero-rooms position-relative overflow-hidden" data-aos="fade-zoom-in">
      <div class="hero-overlay"></div>
      <div class="container position-relative" style="z-index: 2;">
        <div class="row justify-content-center align-items-center min-vh-100 py-5">
          <div class="col-lg-10 col-xl-8 text-center">
            <h1 class="display-2 fw-bold text-white mb-4 animate__animated animate__fadeInDown tracking-tight"
              style="text-shadow: 0 4px 20px rgba(0,0,0,0.6); letter-spacing: -1.5px;">
              KHÁM PHÁ <span class="text-gold">PHÒNG NGHỈ</span>
            </h1>
            <p class="lead text-white mb-0  opacity-95 animate__animated animate__fadeInUp animate__delay-1s tracking-wide">
              Chọn không gian lý tưởng cho kỳ nghỉ của bạn – nơi sang trọng gặp gỡ sự thoải mái
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- DANH SÁCH PHÒNG -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold text-dark tracking-tight" data-aos="fade-up">Tất Cả Loại Phòng</h2>
          <p class="text-muted lead tracking-wide" data-aos="fade-up" data-aos-delay="100">
            Chọn phòng phù hợp với nhu cầu của bạn
          </p>
        </div>

        <div class="row g-4">
          <template v-for="(v, k) in ds_loai_phong" :key="v.id || k">
            <div class="col-lg-4 col-md-6" data-aos="fade-up" :data-aos-delay="k * 100">
              <div class="room-card rounded-4 overflow-hidden shadow-lg bg-white position-relative">

                <!-- Ảnh -->
                <div class="ratio ratio-4x3 position-relative overflow-hidden">
                  <img :src="v.hinh_anh" class="w-100 h-100 object-cover img-scale" :alt="v.ten_loai_phong">
                </div>

                <!-- Nội dung mặc định -->
                <div class="p-4 content-default">
                  <h4 class="room-title fw-bold mb-4">{{ v.ten_loai_phong }}</h4>

                  <!-- TIỆN ÍCH NHỎ + ZOOM 1 HÀNG 100% -->
                  <div class="amenities d-flex justify-content-between align-items-center text-muted">
                    <span class="d-flex align-items-center gap-1">
                      <i class="bx bx-expand text-gold"></i>
                      <small>{{ v.dien_tich }} m²</small>
                    </span>
                    <span class="d-flex align-items-center gap-1">
                      <i class="bx bx-bed text-gold"></i>
                      <small>{{ v.so_giuong }} Giường</small>
                    </span>
                    <span class="d-flex align-items-center gap-1">
                      <i class="bx bx-user text-gold"></i>
                      <small>{{ v.so_nguoi_lon }} Người lớn</small>
                    </span>
                    <!-- ĐÃ SỬA: icon trẻ em giờ cũng màu vàng -->
                    <span class="d-flex align-items-center gap-1">
                      <i class="bx bx-child text-gold"></i>
                      <small>{{ v.so_tre_em > 0 ? v.so_tre_em + ' Trẻ em' : '—' }}</small>
                    </span>
                  </div>
                </div>

                <!-- Hover overlay -->
                <div class="content-hover position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center px-4 bg-white bg-opacity-95">
                  <h3 class="room-title-hover fw-bold mb-4">{{ v.ten_loai_phong }}</h3>
                  <p class="text-muted lead description-hover px-4 line-clamp-6">
                    {{ getRoomDescription(v.ten_loai_phong) }}
                  </p>
                </div>

              </div>
            </div>
          </template>
        </div>

        <!-- Không có phòng -->
        <div v-if="ds_loai_phong.length === 0" class="text-center py-5">
          <i class="bx bx-home fs-1 text-muted mb-3"></i>
          <p class="text-muted">Không tìm thấy phòng nào phù hợp.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<!-- Script và Style giữ nguyên hoàn toàn như bản trước -->
<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  data() { return { ds_loai_phong: [] } },
  mounted() { this.LaydulieuLoaiPhong(); },
  methods: {
    LaydulieuLoaiPhong() {
      axios.get('http://127.0.0.1:8000/api/client/loai-phong/data')
        .then((res) => {
          const rooms = res.data.loai_phong || [];
          this.ds_loai_phong = rooms.map(room => ({
            ...room,
            so_tre_em: room.so_tre_em ?? 0
          }));
        })
        .catch((err) => {
          console.error(err);
          toaster.error("Không tải được danh sách phòng!");
        });
    },

    getRoomDescription(tenPhong) {
      const desc = {
        "Standard": "Phòng tiêu chuẩn ấm cúng, đầy đủ tiện nghi cơ bản, phù hợp cho khách lẻ hoặc chuyến công tác ngắn ngày. Thiết kế hiện đại, sạch sẽ với cửa sổ lớn đón ánh sáng tự nhiên.",
        "Superior": "Không gian rộng rãi hơn Standard, nội thất cao cấp hơn, view thành phố hoặc vườn xanh mát. Lý tưởng cho cặp đôi muốn chút riêng tư và thoải mái.",
        "Deluxe": "Phòng sang trọng với ban công riêng, tầm nhìn đẹp ra biển hoặc hồ bơi. Giường king-size êm ái, phòng tắm rộng có bồn tắm, mang lại trải nghiệm nghỉ dưỡng thực thụ.",
        "Suite": "Căn hộ suite riêng biệt gồm phòng khách và phòng ngủ, nội thất tinh tế, sofa lớn, bàn làm việc. Hoàn hảo cho gia đình hoặc khách muốn không gian riêng rộng rãi.",
        "Family": "Phòng gia đình rộng tới 60m², có thể kê thêm giường phụ, nối thông hoặc 2 giường đôi. An toàn, tiện nghi và thân thiện với trẻ nhỏ.",
        "Executive": "Dành cho doanh nhân với bàn làm việc lớn, wifi siêu tốc, dịch vụ ưu tiên check-in, trà chiều miễn phí và quyền sử dụng Executive Lounge.",
        "Presidential": "Đỉnh cao sang trọng với phòng khách riêng, phòng ngủ master, bồn tắm jacuzzi, view panorama toàn cảnh biển. Trải nghiệm hoàng gia đích thực.",
        "Bungalow": "Nhà gỗ riêng biệt giữa vườn nhiệt đới hoặc sát biển, mái lá, hiên rộng, không gian mở gần gũi thiên nhiên – lựa chọn hoàn hảo cho kỳ nghỉ riêng tư.",
        "Villa": "Biệt thự riêng có hồ bơi riêng, bếp, phòng khách rộng, nhân viên phục vụ riêng 24/7. Sự lựa chọn tối thượng cho gia đình lớn hoặc nhóm bạn."
      };
      const key = Object.keys(desc).find(k => tenPhong.toLowerCase().includes(k.toLowerCase()));
      return desc[key] || "Phòng được thiết kế tinh tế với đầy đủ tiện nghi hiện đại, mang đến sự thoải mái và thư giãn tuyệt đối cho kỳ nghỉ của bạn.";
    },
    formatPrice(price) {
      const num = parseInt(price);
      if (!num || isNaN(num)) return 'Chưa có giá';
      return new Intl.NumberFormat('vi-VN').format(num) + 'đ';
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

.font-primary { font-family: 'Inter', system-ui, sans-serif; }

.room-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.8rem;
  letter-spacing: -0.5px;
  color: #1a1a1a;
  line-height: 1.2;
}
.room-title-hover {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.5rem;
  letter-spacing: -1px;
  color: #1a1a1a;
}

.amenities {
  font-size: 0.78rem;
  line-height: 1;
}
.amenities small {
  font-weight: 500;
}
.amenities i {
  font-size: 1.1rem;
  width: 18px;
  text-align: center;
}

.text-gold { color: #D4AF37 !important; }

.hero-rooms {
  height: 75vh; min-height: 600px;
  background: linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.45)),
    url('https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&w=1600') center/cover no-repeat;
  display: flex; align-items: center;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%);
}

.room-card {
  cursor: pointer;
  transition: all 0.4s ease;
  overflow: hidden;
  border: none !important;
}
.room-card:hover {
  transform: translateY(-14px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.18) !important;
}
.img-scale { transition: transform 0.8s ease; }
.room-card:hover .img-scale { transform: scale(1.15); }

.content-default { transition: opacity 0.4s ease; position: relative; z-index: 2; }
.room-card:hover .content-default { opacity: 0; }
.content-hover { opacity: 0; transition: opacity 0.5s ease; z-index: 1; }
.room-card:hover .content-hover { opacity: 1; }

.description-hover { font-size: 1.1rem; line-height: 1.7; }

.line-clamp-6 {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 576px) {
  .room-title { font-size: 1.6rem; }
  .room-title-hover { font-size: 2rem; }
  .amenities { font-size: 0.75rem; }
}
</style>