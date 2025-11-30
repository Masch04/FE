<template>
  <div class="room-detail-page font-primary bg-light min-vh-100" v-if="room">
    <!-- HEADER ẢNH (HERO) -->
    <section class="detail-hero position-relative overflow-hidden">
      <!-- SỬA: Thêm class ken-burns để ảnh chuyển động chậm -->
      <div
        class="hero-bg ken-burns"
        :style="{ backgroundImage: `url(${room.hinh_anh})` }"
      ></div>
      <div class="hero-overlay"></div>

      <div
        class="container position-relative h-100 d-flex align-items-end pb-5"
      >
        <!-- SỬA: Đổi animation class sang custom 'fade-in-up' -->
        <div class="text-white fade-in-up">
          <span
            class="text-gold text-uppercase letter-spacing-2 fw-bold mb-2 d-block"
            >Luxury Stay</span
          >
          <h1 class="display-3 fw-bold mb-3 font-playfair">
            {{ room.ten_loai_phong }}
          </h1>

          <!-- SỬA: Thêm delay nhẹ cho dòng thông tin -->
          <div
            class="d-flex align-items-center gap-4 text-white-50 flex-wrap fade-in-up delay-100"
          >
            <span><i class="bx bx-area me-1"></i> {{ room.dien_tich }} m²</span>
            <span
              ><i class="bx bx-user me-1"></i> {{ room.so_nguoi_lon }} Người
              lớn</span
            >
            <span v-if="room.so_tre_em > 0"
              ><i class="bx bx-child me-1"></i> {{ room.so_tre_em }} Trẻ
              em</span
            >

            <span
              class="badge bg-success rounded-pill px-3 py-2 border border-white backdrop-blur"
              v-if="room.so_phong_trong > 0"
            >
              Sẵn sàng: {{ room.so_phong_trong }} phòng
            </span>
            <span
              class="badge bg-danger rounded-pill px-3 py-2 border border-white backdrop-blur"
              v-else
            >
              Hết phòng hôm nay
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- NỘI DUNG CHÍNH -->
    <section class="container py-5 mt-n5 position-relative" style="z-index: 2">
      <div class="row g-5">
        <!-- CỘT TRÁI -->
        <div class="col-lg-8">
          <!-- SỬA: Đổi animation sang 'fade-in-up delay-200' mượt hơn -->
          <div class="bg-white p-5 rounded-4 shadow-sm fade-in-up delay-200">
            <h3 class="font-playfair fw-bold mb-4">Mô tả phòng</h3>
            
            <!-- ĐÃ SỬA: Gọi hàm getRoomDescription và truyền tên phòng vào -->
            <div
              class="text-muted lead mb-5"
              style="line-height: 1.8; white-space: pre-line"
            >
              {{ getRoomDescription(room.ten_loai_phong) }}
            </div>

            <h4 class="font-playfair fw-bold mb-4">Tiện nghi cao cấp</h4>
            <div
              v-if="room.tien_ich"
              class="amenities-html text-secondary mb-5"
            >
              <div v-html="room.tien_ich"></div>
            </div>
            <div v-else class="text-muted mb-5">Đang cập nhật tiện ích...</div>

            <hr class="text-muted opacity-25" />
            <div class="mt-4">
              <h4 class="font-playfair fw-bold mb-3">Quy định phòng</h4>
              <ul class="text-muted list-unstyled">
                <li class="mb-2">
                  <i class="bx bx-check text-success me-2"></i>Check-in: 14:00
                  PM
                </li>
                <li class="mb-2">
                  <i class="bx bx-check text-success me-2"></i>Check-out: 12:00
                  PM
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- CỘT PHẢI -->
        <div class="col-lg-4">
          <!-- SỬA: Thêm animation trượt nhẹ từ phải sang -->
          <div
            class="card border-0 shadow-lg rounded-4 sticky-top fade-in-right delay-300"
            style="top: 100px"
          >
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <p class="text-muted mb-1 text-uppercase small fw-bold">
                  Giá niêm yết
                </p>
                <h2 class="text-gold font-playfair fw-bold display-6">
                  {{ formatPrice(room.gia_mac_dinh) }}
                </h2>
                <small class="text-muted">/ đêm</small>
              </div>

              <div class="d-grid gap-3">
                <button
                  v-if="room.so_phong_trong > 0"
                  @click="openBookingModal"
                  class="btn btn-dark btn-lg py-3 rounded-3 text-uppercase fw-bold shadow-sm hover-gold transition-all"
                >
                  Đặt Phòng Ngay
                </button>
                <button
                  v-else
                  disabled
                  class="btn btn-secondary btn-lg py-3 rounded-3 text-uppercase fw-bold"
                >
                  TẠM HẾT PHÒNG
                </button>

                <router-link
                  to="/danh-sach-phong"
                  class="btn btn-outline-dark btn-lg py-3 rounded-3 text-uppercase fw-bold transition-all"
                >
                  Quay lại
                </router-link>
              </div>

              <div class="mt-4 pt-3 border-top text-center">
                <p class="mb-2">
                  <i class="bx bx-phone text-gold me-2"></i>Hỗ trợ 24/7
                </p>
                <a
                  href="tel:19001000"
                  class="fw-bold text-dark text-decoration-none fs-5 hover-gold-text transition-all"
                  >0357989225</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
   <!-- MODAL ĐẶT PHÒNG -->
    <!-- ============================================ -->
    <div v-if="showModal" class="modal-backdrop-custom fade-in">
  <div class="modal-content-custom rounded-4 shadow-lg pop-up-gentle">
    <div class="d-flex justify-content-between align-items-center p-4 border-bottom bg-light rounded-top-4">
      <h4 class="mb-0 font-playfair fw-bold text-dark">
        Đặt: {{ room.ten_loai_phong }}
      </h4>
      <button @click="showModal = false" class="btn-close hover-rotate"></button>
    </div>

    <div class="modal-body-custom p-4">
      <div class="row g-4">
        <!-- Cột Trái -->
        <div class="col-lg-7 border-end">
          
          <!-- SỬA: Đã xóa 'align-items-end' để các ô căn thẳng hàng từ trên xuống -->
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label fw-bold small text-muted">NGÀY ĐẾN</label>
              <input
                type="date"
                v-model="booking.ngay_den"
                :min="minToday"
                @change="capNhatNgay"
                class="form-control h-50px focus-ring"
              />
            </div>
            <div class="col-md-4">
              <label class="form-label fw-bold small text-muted">NGÀY ĐI</label>
              <input
                type="date"
                v-model="booking.ngay_di"
                :min="minNgayDi"
                @change="capNhatNgay"
                class="form-control h-50px focus-ring"
              />
            </div>

            <div class="col-md-4">
              <label class="form-label fw-bold small text-muted">SỐ PHÒNG</label>
              <div class="input-group">
                <button
                  class="btn btn-outline-secondary h-50px"
                  @click="booking.so_phong > 1 ? booking.so_phong-- : null"
                >
                  -
                </button>
                <input
                  type="text"
                  class="form-control text-center h-50px"
                  v-model="booking.so_phong"
                  readonly
                />
                <button
                  class="btn btn-outline-secondary h-50px"
                  @click="
                    booking.so_phong < room.so_phong_trong
                      ? booking.so_phong++
                      : null
                  "
                  :disabled="booking.so_phong >= room.so_phong_trong"
                >
                  +
                </button>
              </div>
              <small class="text-danger d-block mt-1" style="font-size: 0.75rem">
                Tối đa: {{ room.so_phong_trong }} phòng
              </small>
            </div>
          </div>
          
          <!-- Phần Dịch vụ bổ sung -->
          <div class="mt-4 pt-3 border-top">
            <h6 class="fw-bold text-gold mb-3">DỊCH VỤ BỔ SUNG</h6>
            <div
              class="d_services_list custom-scrollbar"
              style="max-height: 200px; overflow-y: auto"
            >
              <div
                v-for="dv in ds_dich_vu"
                :key="dv.id"
                class="d-flex justify-content-between align-items-center p-2 mb-2 border rounded-3 service-item transition-bg"
                :class="dv.chon ? 'border-warning bg-warning bg-opacity-10' : ''"
                @click="dv.chon = !dv.chon"
              >
                <div class="form-check pointer-events-none">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="dv.chon"
                  />
                  <label class="form-check-label ms-2 small fw-bold">
                    {{ dv.ten_dich_vu }}
                  </label>
                </div>
                <span class="text-success small fw-bold">
                  {{ formatPrice(dv.don_gia) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Cột Phải (Thanh toán) -->
        <div class="col-lg-5">
          <div class="bg-light p-4 rounded-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <h5 class="fw-bold mb-3">Thanh toán</h5>
              <div class="d-flex justify-content-between mb-2 small">
                <span>Đơn giá:</span>
                <span>{{ formatPrice(room.gia_mac_dinh) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2 small">
                <span>Thời gian:</span>
                <span>x {{ soDem }} đêm</span>
              </div>
              <div class="d-flex justify-content-between mb-2 small">
                <span>Số lượng:</span>
                <span>x {{ booking.so_phong }} phòng</span>
              </div>
              <div
                class="d-flex justify-content-between mb-2 small text-success slide-in-soft"
                v-if="tongTienDichVu > 0"
              >
                <span>Dịch vụ:</span>
                <span>+ {{ formatPrice(tongTienDichVu) }}</span>
              </div>
              <hr />
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold fs-5">TỔNG:</span>
                <span class="fw-bold fs-4 text-gold transition-colors">
                  {{ formatPrice(tongTien) }}
                </span>
              </div>
            </div>

            <div class="mt-4">
              <button
                @click="xuLyDatPhong"
                class="btn btn-warning w-100 py-3 fw-bold text-white rounded-3 shadow-sm hover-up hover-glow transition-all"
              >
                XÁC NHẬN ĐẶT PHÒNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>

  <div
    v-else
    class="vh-100 d-flex align-items-center justify-content-center bg-white"
  >
    <div
      class="spinner-grow text-gold"
      role="status"
      style="width: 3rem; height: 3rem"
    ></div>
  </div>
</template>

<script>
// GIỮ NGUYÊN TOÀN BỘ SCRIPT CỦA BẠN
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  props: ["id"],
  data() {
    return {
      room: null,
      ds_dich_vu: [],
      showModal: false,
      is_login: false,
      booking: {
        ngay_den: "",
        ngay_di: "",
        so_phong: 1,
        nguoi_lon: 1,
        tre_em: 0,
      },
    };
  },
  computed: {
    minToday() {
      return new Date().toISOString().split("T")[0];
    },
    minNgayDi() {
      if (!this.booking.ngay_den) return this.minToday;
      const date = new Date(this.booking.ngay_den);
      date.setDate(date.getDate() + 1);
      return date.toISOString().split("T")[0];
    },
    soDem() {
      if (!this.booking.ngay_den || !this.booking.ngay_di) return 1;
      const d1 = new Date(this.booking.ngay_den);
      const d2 = new Date(this.booking.ngay_di);
      return Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
    },
    tongTienDichVu() {
      return this.ds_dich_vu
        .filter((dv) => dv.chon)
        .reduce((sum, dv) => sum + parseInt(dv.don_gia), 0);
    },
    tongTien() {
      if (!this.room) return 0;
      return (
        this.room.gia_mac_dinh * this.booking.so_phong * this.soDem +
        this.tongTienDichVu
      );
    },
  },
  created() {
    this.fetchRoomDetail();
    this.fetchDichVu();
    this.checkLogin();

    this.booking.ngay_den = this.minToday;
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);
    this.booking.ngay_di = tmr.toISOString().split("T")[0];
  },
  methods: {
    getRoomDescription(tenPhong) {
      const desc = {
        "Standard": "Phòng tiêu chuẩn ấm cúng, đầy đủ tiện nghi cơ bản, phù hợp cho khách lẻ hoặc chuyến công tác ngắn ngày. Thiết kế hiện đại, sạch sẽ với cửa sổ lớn đón ánh sáng tự nhiên.",
        "Superior": "Không gian rộng rãi hơn Standard, nội thất cao cấp hơn, view thành phố hoặc vườn xanh mát. Lý tưởng cho cặp đôi muốn chút riêng tư và thoải mái.",
        "Deluxe": "Phòng sang trọng với ban công riêng, tầm nhìn đẹp ra biển hoặc hồ bơi. Giường king-size êm ái, phòng tắm rộng có bồn tắm, mang lại trải nghiệm nghỉ dưỡng thực thụ.",
        "Suite": "Căn hộ suite riêng biệt gồm phòng khách và phòng ngủ, nội thất tinh tế, sofa lớn, bàn làm việc. Hoàn hảo cho gia đình hoặc khách muốn không gian riêng rộng rãi.",
        "Family": "Phòng gia đình rộng tới 60m², có thể kê thêm giường phụ, nối thông hoặc 2 giường đôi. An toàn, tiện nghi và thân thiện với trẻ nhỏ.",
        "Executive": "Dành cho doanh nhân với bàn làm việc lớn, wifi siêu tốc, dịch vụ ưu tiên check-in, trà chiều miễn phí và quyền sử dụng Executive Lounge.",
        "Vip  ": "Đỉnh cao sang trọng với phòng khách riêng, phòng ngủ master, bồn tắm jacuzzi, view panorama toàn cảnh biển. Trải nghiệm hoàng gia đích thực.",
        "Bungalow": "Nhà gỗ riêng biệt giữa vườn nhiệt đới hoặc sát biển, mái lá, hiên rộng, không gian mở gần gũi thiên nhiên – lựa chọn hoàn hảo cho kỳ nghỉ riêng tư.",
        "Villa": "Biệt thự riêng có hồ bơi riêng, bếp, phòng khách rộng, nhân viên phục vụ riêng 24/7. Sự lựa chọn tối thượng cho gia đình lớn hoặc nhóm bạn."
      };
      // Tìm key khớp (không phân biệt hoa thường)
      const key = Object.keys(desc).find(k => tenPhong && tenPhong.toLowerCase().includes(k.toLowerCase()));
      return desc[key] || "Phòng được thiết kế tinh tế với đầy đủ tiện nghi hiện đại, mang đến sự thoải mái và thư giãn tuyệt đối cho kỳ nghỉ của bạn.";
    },
    async fetchRoomDetail() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/client/loai-phong/chi-tiet/${this.id}`
        );
        this.room = res.data.data || res.data;
        if (
          this.room.so_phong_trong === undefined ||
          this.room.so_phong_trong === null
        ) {
          this.room.so_phong_trong = 0;
        }
        this.booking.nguoi_lon = this.room.so_nguoi_lon || 1;
        this.booking.tre_em = this.room.so_tre_em || 0;
      } catch (error) {
        toaster.error("Lỗi tải thông tin phòng!");
      }
    },
    async fetchDichVu() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/dich-vu");
        if (res.data.status)
          this.ds_dich_vu = res.data.dich_vu.map((dv) => ({
            ...dv,
            chon: false,
          }));
      } catch (e) {
        console.error(e);
      }
    },
    checkLogin() {
      const token = localStorage.getItem("token_khachhang");
      if (!token) {
        this.is_login = false;
        return;
      }
      axios
        .get("http://127.0.0.1:8000/api/kiem-tra-token-khach-hang", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.is_login = res.data.status;
        })
        .catch(() => {
          this.is_login = false;
          localStorage.removeItem("token_khachhang");
        });
    },
    openBookingModal() {
      if (!this.is_login) {
        toaster.warning("Bạn cần đăng nhập để đặt phòng!");
        this.$router.push({
          path: "/khach-hang/dang-nhap",
          query: { redirect: this.$route.fullPath },
        });
        return;
      }
      this.booking.so_phong = 1;
      this.showModal = true;
    },
    capNhatNgay() {
      if (this.booking.ngay_den >= this.booking.ngay_di)
        this.booking.ngay_di = this.minNgayDi;
    },
    async xuLyDatPhong() {
      if (this.booking.so_phong > this.room.so_phong_trong) {
        toaster.error(`Chỉ còn ${this.room.so_phong_trong} phòng trống!`);
        return;
      }
      const giaPhong = parseInt(this.room.gia_mac_dinh);
      const soLuongPhong = parseInt(this.booking.so_phong);

      const payload = {
        tt_dat_phong: {
          ngay_den: this.booking.ngay_den,
          ngay_di: this.booking.ngay_di,
          so_phong: soLuongPhong,
          nguoi_lon: parseInt(this.booking.nguoi_lon),
          tre_em: parseInt(this.booking.tre_em),
        },
        tt_loai_phong: [
          {
            id: this.room.id,
            ten_loai_phong: this.room.ten_loai_phong,
            gia_trung_binh_ko_format: giaPhong,
            so_phong_dat: soLuongPhong,
          },
        ],
        ds_dich_vu: this.ds_dich_vu
          .filter((dv) => dv.chon)
          .map((dv) => ({
            id: dv.id,
            don_gia: parseInt(dv.don_gia),
          })),
      };

      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/khach-hang-dat-phong",
          payload,
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("token_khachhang"),
            },
          }
        );
        if (res.data.status) {
          toaster.success(
            res.data.message || "Đặt phòng thành công! Vui lòng kiểm tra email."
          );
          this.showModal = false;
          sessionStorage.removeItem("pending_booking");
          sessionStorage.removeItem("pending_booking_full");
          setTimeout(() => location.reload(), 2000);
        } else {
          toaster.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toaster.error("Có lỗi xảy ra khi đặt phòng.");
      }
    },
    formatPrice(price) {
      if (!price) return "0 VNĐ";
      return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
    },
    
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600&display=swap");

/* --- GENERAL STYLES --- */
.font-primary {
  font-family: "Inter", sans-serif;
}
.font-playfair {
  font-family: "Playfair Display", serif;
}
.text-gold {
  color: #d4af37 !important;
}
.bg-light {
  background-color: #f8f9fa !important;
}

/* --- HERO SECTION ANIMATION --- */
.detail-hero {
  height: 60vh;
  min-height: 400px;
  position: relative;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.8);
}

/* Hiệu ứng Ken Burns (Zoom chậm) */
.ken-burns {
  animation: kenBurns 20s infinite alternate;
}
@keyframes kenBurns {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.15);
  }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 60%
  );
}
.mt-n5 {
  margin-top: -80px !important;
}

/* --- CONTENT ANIMATIONS --- */
/* Fade Up mượt mà */
.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0;
  transform: translateY(30px);
}
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade Right (cho cột giá bên phải) */
.fade-in-right {
  animation: fadeInRight 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0;
  transform: translateX(30px);
}
@keyframes fadeInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Delays */
.delay-100 {
  animation-delay: 0.1s;
}
.delay-200 {
  animation-delay: 0.2s;
}
.delay-300 {
  animation-delay: 0.3s;
}

/* --- MODAL ANIMATIONS --- */
.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px); /* Blur mạnh hơn chút cho đẹp */
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hiệu ứng Fade In cho nền đen */
.fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content-custom {
  background: white;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

/* Hiệu ứng Pop Up Gentle cho Modal Content */
.pop-up-gentle {
  animation: popUpGentle 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
@keyframes popUpGentle {
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* --- INTERACTIVE ELEMENTS --- */
.service-item {
  cursor: pointer;
  border: 1px solid #dee2e6;
}
.service-item:hover {
  border-color: #d4af37;
  transform: translateX(5px);
}

/* Transition mượt cho màu nền */
.transition-bg {
  transition: background-color 0.3s ease, border-color 0.3s ease,
    transform 0.2s ease;
}
.transition-all {
  transition: all 0.3s ease;
}
.transition-colors {
  transition: color 0.3s ease;
}

.hover-gold:hover {
  background-color: #bfa34a !important;
  border-color: #bfa34a !important;
}
.hover-gold-text:hover {
  color: #d4af37 !important;
}
.hover-up:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}
.hover-rotate:hover {
  transform: rotate(90deg);
  transition: transform 0.3s ease;
}
.hover-glow:hover {
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.5) !important;
}

/* Focus input đẹp hơn */
.focus-ring:focus {
  box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.15);
  border-color: #d4af37;
}

/* Scrollbar tùy chỉnh */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e9ecef;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #adb5bd;
}

.slide-in-soft {
  animation: slideInSoft 0.3s ease-out;
}
@keyframes slideInSoft {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* AMENITIES STYLES (Giữ nguyên) */
:deep(.amenities-html) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}
:deep(.amenities-html p) {
  margin-bottom: 0;
  display: flex;
  align-items: center;
  color: #6c757d;
}
:deep(.amenities-html i) {
  color: #d4af37;
  font-size: 1.2rem;
  width: 30px;
  margin-right: 10px;
  background: #fff9e6;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
}

.backdrop-blur {
  backdrop-filter: blur(4px);
  background-color: rgba(25, 135, 84, 0.8) !important;
}
.bg-danger.backdrop-blur {
  background-color: rgba(220, 53, 69, 0.8) !important;
}
.pointer-events-none {
  pointer-events: none;
} /* Chặn click vào label/input để click vào div cha */
.h-50px {
  height: 45px;
}

@media (max-width: 991px) {
  .mt-n5 {
    margin-top: 20px !important;
  }
  .detail-hero {
    height: 40vh;
  }
  :deep(.amenities-html) {
    grid-template-columns: 1fr;
  }
  .modal-content-custom {
    width: 95%;
  }
  .fade-in-right {
    animation-name: fadeInUp;
  } /* Mobile thì fade up hết cho đẹp */
}
</style>