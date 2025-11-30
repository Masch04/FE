<template>
  <div class="room-detail-page font-primary bg-light min-vh-100" v-if="room">
    
    <!-- HEADER ẢNH (HERO) -->
    <section class="detail-hero position-relative">
      <div class="hero-bg" :style="{ backgroundImage: `url(${room.hinh_anh})` }"></div>
      <div class="hero-overlay"></div>
      <div class="container position-relative h-100 d-flex align-items-end pb-5">
        <div class="text-white animate__animated animate__fadeInUp">
          <span class="text-gold text-uppercase letter-spacing-2 fw-bold mb-2 d-block">Luxury Stay</span>
          <h1 class="display-3 fw-bold mb-3 font-playfair">{{ room.ten_loai_phong }}</h1>
          <div class="d-flex align-items-center gap-4 text-white-50 flex-wrap">
            <!-- Diện tích -->
            <span><i class="bx bx-area me-1"></i> {{ room.dien_tich }} m²</span>
            <!-- Người lớn -->
            <span><i class="bx bx-user me-1"></i> {{ room.so_nguoi_lon }} Người lớn</span>
            <!-- Trẻ em (ĐÃ KHÔI PHỤC) -->
            <span v-if="room.so_tre_em > 0"><i class="bx bx-child me-1"></i> {{ room.so_tre_em }} Trẻ em</span>
            
            <!-- Badge số phòng trống -->
            <span class="badge bg-success rounded-pill px-3 py-2 border border-white" v-if="room.so_phong_trong > 0">
                Sẵn sàng: {{ room.so_phong_trong }} phòng
            </span>
            <span class="badge bg-danger rounded-pill px-3 py-2 border border-white" v-else>
                Hết phòng hôm nay
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- NỘI DUNG CHÍNH -->
    <section class="container py-5 mt-n5 position-relative" style="z-index: 2;">
      <div class="row g-5">
        <!-- CỘT TRÁI: THÔNG TIN CHI TIẾT -->
        <div class="col-lg-8">
          <div class="bg-white p-5 rounded-4 shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
            <h3 class="font-playfair fw-bold mb-4">Mô tả phòng</h3>
            <div class="text-muted lead mb-5" style="line-height: 1.8; white-space: pre-line;">
              {{ room.mo_ta || 'Đang cập nhật mô tả...' }}
            </div>
            
            <h4 class="font-playfair fw-bold mb-4">Tiện nghi cao cấp</h4>
            <div v-if="room.tien_ich" class="amenities-html text-secondary mb-5">
                <div v-html="room.tien_ich"></div>
            </div>
            <div v-else class="text-muted mb-5">Đang cập nhật tiện ích...</div>

            <hr class="text-muted opacity-25">
            <div class="mt-4">
               <h4 class="font-playfair fw-bold mb-3">Quy định phòng</h4>
               <ul class="text-muted list-unstyled">
                 <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Check-in: 14:00 PM</li>
                 <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Check-out: 12:00 PM</li>
                 <li><i class="bx bx-x text-danger me-2"></i>Không hút thuốc</li>
               </ul>
            </div>
          </div>
        </div>

        <!-- CỘT PHẢI: GIÁ & ĐẶT PHÒNG -->
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
                <!-- NÚT ĐẶT PHÒNG (Disabled nếu hết phòng) -->
                <button v-if="room.so_phong_trong > 0" 
                        @click="openBookingModal" 
                        class="btn btn-dark btn-lg py-3 rounded-3 text-uppercase fw-bold shadow-sm hover-gold">
                  Đặt Phòng Ngay
                </button>
                <button v-else disabled class="btn btn-secondary btn-lg py-3 rounded-3 text-uppercase fw-bold">
                  TẠM HẾT PHÒNG
                </button>

                <button class="btn btn-outline-dark btn-lg py-3 rounded-3 text-uppercase fw-bold" @click="$router.go(-1)">
                  Quay lại
                </button>
              </div>

              <!-- PHẦN LIÊN HỆ (ĐÃ KHÔI PHỤC Y NHƯ CŨ) -->
              <div class="mt-4 pt-3 border-top text-center">
                <p class="mb-2"><i class="bx bx-phone text-gold me-2"></i>Hỗ trợ 24/7</p>
                <a href="tel:19001000" class="fw-bold text-dark text-decoration-none fs-5">1900 1000</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- MODAL ĐẶT PHÒNG -->
    <!-- ============================================ -->
    <div v-if="showModal" class="modal-backdrop-custom">
      <div class="modal-content-custom rounded-4 shadow-lg animate__animated animate__zoomIn">
        
        <div class="d-flex justify-content-between align-items-center p-4 border-bottom bg-light rounded-top-4">
            <h4 class="mb-0 font-playfair fw-bold text-dark">Đặt: {{ room.ten_loai_phong }}</h4>
            <button @click="showModal = false" class="btn-close"></button>
        </div>

        <div class="modal-body-custom p-4">
            <div class="row g-4">
                <!-- Cột Trái -->
                <div class="col-lg-7 border-end">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted">NGÀY ĐẾN</label>
                            <input type="date" v-model="booking.ngay_den" :min="minToday" @change="capNhatNgay" class="form-control h-50px">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted">NGÀY ĐI</label>
                            <input type="date" v-model="booking.ngay_di" :min="minNgayDi" @change="capNhatNgay" class="form-control h-50px">
                        </div>
                        
                        <!-- CHỌN SỐ PHÒNG (CÓ GIỚI HẠN) -->
                        <div class="col-md-4">
                            <label class="form-label fw-bold small text-muted">SỐ PHÒNG</label>
                            <div class="input-group">
                                <button class="btn btn-outline-secondary" @click="booking.so_phong > 1 ? booking.so_phong-- : null">-</button>
                                <input type="text" class="form-control text-center" v-model="booking.so_phong" readonly>
                                <button class="btn btn-outline-secondary" 
                                        @click="booking.so_phong < room.so_phong_trong ? booking.so_phong++ : null"
                                        :disabled="booking.so_phong >= room.so_phong_trong">
                                    +
                                </button>
                            </div>
                            <small class="text-danger" style="font-size: 0.75rem">Tối đa: {{ room.so_phong_trong }} phòng</small>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label fw-bold small text-muted">NGƯỜI LỚN</label>
                            <div class="input-group">
                                <button class="btn btn-outline-secondary" @click="booking.nguoi_lon > 1 ? booking.nguoi_lon-- : null">-</button>
                                <input type="text" class="form-control text-center" v-model="booking.nguoi_lon" readonly>
                                <button class="btn btn-outline-secondary" @click="booking.nguoi_lon < 10 ? booking.nguoi_lon++ : null">+</button>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label fw-bold small text-muted">TRẺ EM</label>
                            <div class="input-group">
                                <button class="btn btn-outline-secondary" @click="booking.tre_em > 0 ? booking.tre_em-- : null">-</button>
                                <input type="text" class="form-control text-center" v-model="booking.tre_em" readonly>
                                <button class="btn btn-outline-secondary" @click="booking.tre_em < 5 ? booking.tre_em++ : null">+</button>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 pt-3 border-top">
                        <h6 class="fw-bold text-gold mb-3">DỊCH VỤ BỔ SUNG</h6>
                        <div class="d_services_list" style="max-height: 200px; overflow-y: auto;">
                            <div v-for="dv in ds_dich_vu" :key="dv.id" 
                                 class="d-flex justify-content-between align-items-center p-2 mb-2 border rounded-3 service-item"
                                 :class="dv.chon ? 'border-warning bg-warning bg-opacity-10' : ''"
                                 @click="dv.chon = !dv.chon">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" v-model="dv.chon" @click.stop>
                                    <label class="form-check-label ms-2 small fw-bold">{{ dv.ten_dich_vu }}</label>
                                </div>
                                <span class="text-success small fw-bold">{{ formatPrice(dv.don_gia) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cột Phải: Thanh toán -->
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
                            <div class="d-flex justify-content-between mb-2 small text-success" v-if="tongTienDichVu > 0">
                                <span>Dịch vụ:</span>
                                <span>+ {{ formatPrice(tongTienDichVu) }}</span>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="fw-bold fs-5">TỔNG:</span>
                                <span class="fw-bold fs-4 text-gold">{{ formatPrice(tongTien) }}</span>
                            </div>
                        </div>
                        
                        <div class="mt-4">
                            <button @click="xuLyDatPhong" class="btn btn-warning w-100 py-3 fw-bold text-white rounded-3 shadow-sm hover-up">
                                XÁC NHẬN ĐẶT PHÒNG
                            </button>
                            <p class="text-muted text-center small mt-2 fst-italic">Thanh toán khi nhận phòng</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  
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
      ds_dich_vu: [],
      showModal: false,
      is_login: false,
      booking: {
          ngay_den: '',
          ngay_di: '',
          so_phong: 1,
          nguoi_lon: 1,
          tre_em: 0
      }
    }
  },
  computed: {
      minToday() { return new Date().toISOString().split('T')[0]; },
      minNgayDi() {
          if(!this.booking.ngay_den) return this.minToday;
          const date = new Date(this.booking.ngay_den);
          date.setDate(date.getDate() + 1);
          return date.toISOString().split('T')[0];
      },
      soDem() {
          if (!this.booking.ngay_den || !this.booking.ngay_di) return 1;
          const d1 = new Date(this.booking.ngay_den);
          const d2 = new Date(this.booking.ngay_di);
          return Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
      },
      tongTienDichVu() {
          return this.ds_dich_vu.filter(dv => dv.chon).reduce((sum, dv) => sum + parseInt(dv.don_gia), 0);
      },
      tongTien() {
          if (!this.room) return 0;
          return (this.room.gia_mac_dinh * this.booking.so_phong * this.soDem) + this.tongTienDichVu;
      }
  },
  created() {
    this.fetchRoomDetail();
    this.fetchDichVu();
    this.checkLogin();
    
    // Set ngày mặc định
    this.booking.ngay_den = this.minToday;
    const tmr = new Date(); tmr.setDate(tmr.getDate() + 1);
    this.booking.ngay_di = tmr.toISOString().split('T')[0];
  },
  methods: {
    async fetchRoomDetail() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/client/loai-phong/chi-tiet/${this.id}`);
        this.room = res.data.data || res.data;
        if(this.room.so_phong_trong === undefined || this.room.so_phong_trong === null) {
            this.room.so_phong_trong = 0; 
        }
        this.booking.nguoi_lon = this.room.so_nguoi_lon || 1; 
        this.booking.tre_em = this.room.so_tre_em || 0; 
      } catch (error) { toaster.error("Lỗi tải thông tin phòng!"); }
    },
    async fetchDichVu() {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/dich-vu');
            if(res.data.status) this.ds_dich_vu = res.data.dich_vu.map(dv => ({...dv, chon: false}));
        } catch(e) { console.error(e); }
    },

    // --- CẬP NHẬT HÀM KIỂM TRA ĐĂNG NHẬP ---
    checkLogin() {
        const token = localStorage.getItem("token_khachhang");
        if (!token) {
            this.is_login = false;
            return;
        }
        axios.get("http://127.0.0.1:8000/api/kiem-tra-token-khach-hang", {
            headers: { Authorization: 'Bearer ' + token }
        })
        .then(res => {
            this.is_login = res.data.status;
        })
        .catch(() => {
            this.is_login = false;
            // Nếu token lỗi/hết hạn thì xóa luôn cho sạch
            localStorage.removeItem("token_khachhang");
        });
    },
    
    // --- CẬP NHẬT HÀM MỞ MODAL: CHẶN NẾU CHƯA LOGIN ---
    openBookingModal() {
        // 1. Kiểm tra biến is_login
        if(!this.is_login) {
            toaster.warning("Bạn cần đăng nhập để đặt phòng!");
            
            // (Mẹo nhỏ) Lưu lại đường dẫn hiện tại để đăng nhập xong thì quay lại đây
            // Bạn có thể xử lý logic này bên trang Login nếu muốn
            
            this.$router.push({ 
                path: '/khach-hang/dang-nhap', 
                query: { redirect: this.$route.fullPath } 
            });
            return;
        }

        // 2. Nếu đã đăng nhập thì mới mở Modal
        this.booking.so_phong = 1;
        this.showModal = true;
    },
    
    capNhatNgay() {
        if(this.booking.ngay_den >= this.booking.ngay_di) this.booking.ngay_di = this.minNgayDi;
    },

    async xuLyDatPhong() {
        if (this.booking.so_phong > this.room.so_phong_trong) {
            toaster.error(`Chỉ còn ${this.room.so_phong_trong} phòng trống!`);
            return;
        }

        const payload = {
            tt_dat_phong: this.booking,
            tt_loai_phong: [{
                ...this.room,
                so_phong_dat: this.booking.so_phong,
                gia_trung_binh_ko_format: this.room.gia_mac_dinh
            }],
            ds_dich_vu: this.ds_dich_vu.filter(dv => dv.chon).map(dv => ({ id: dv.id, don_gia: dv.don_gia }))
        };

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/khach-hang-dat-phong", payload, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem("token_khachhang") }
            });
            if (res.data.status) {
                toaster.success(res.data.message || "Đặt phòng thành công!");
                this.showModal = false;
                setTimeout(() => location.reload(), 2000); 
            } else {
                toaster.error(res.data.message);
            }
        } catch (error) {
            toaster.error("Có lỗi xảy ra khi đặt phòng.");
        }
    },
    formatPrice(price) {
      if(!price) return '0 VNĐ';
      return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
    }
}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
.font-primary { font-family: 'Inter', sans-serif; }
.font-playfair { font-family: 'Playfair Display', serif; }
.text-gold { color: #D4AF37 !important; }
.bg-light { background-color: #f8f9fa !important; }
.detail-hero { height: 60vh; min-height: 400px; position: relative; }
.hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(0.8); }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%); }
.mt-n5 { margin-top: -80px !important; }
:deep(.amenities-html) { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
:deep(.amenities-html p) { margin-bottom: 0; display: flex; align-items: center; color: #6c757d; }
:deep(.amenities-html i) { color: #D4AF37; font-size: 1.2rem; width: 30px; margin-right: 10px; background: #fff9e6; height: 30px; line-height: 30px; text-align: center; border-radius: 50%; }

.modal-backdrop-custom { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); z-index: 1050; display: flex; align-items: center; justify-content: center; }
.modal-content-custom { background: white; width: 90%; max-width: 900px; max-height: 90vh; overflow-y: auto; position: relative; }
.service-item { cursor: pointer; transition: all 0.2s; }
.service-item:hover { border-color: #D4AF37; }
.h-50px { height: 45px; }
.hover-up:hover { transform: translateY(-3px); }

@media (max-width: 991px) {
  .mt-n5 { margin-top: 20px !important; }
  .detail-hero { height: 40vh; }
  :deep(.amenities-html) { grid-template-columns: 1fr; }
  .modal-content-custom { width: 95%; }
}
</style>