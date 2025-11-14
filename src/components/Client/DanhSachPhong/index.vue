<template>
    <div class="room-list-page">
        <!-- BANNER DÙNG ẢNH PEXELS -->
        <section class="hero-rooms position-relative overflow-hidden" data-aos="fade-zoom-in">
            <div class="hero-overlay"></div>
            <div class="container position-relative" style="z-index: 2;">
                <div class="row justify-content-center align-items-center min-vh-100 py-5">
                    <div class="col-lg-10 col-xl-8 text-center">
                        <h1 class="display-2 fw-bold text-white mb-4 animate__animated animate__fadeInDown"
                            style="text-shadow: 0 2px 10px rgba(0,0,0,0.5); letter-spacing: -1px;">
                            KHÁM PHÁ <span class="text-warning" style="text-shadow: 0 0 15px rgba(255,153,0,0.6);">PHÒNG
                                NGHỈ</span>
                        </h1>
                        <p class="lead text-white mb-0 opacity-95 animate__animated animate__fadeInUp animate__delay-1s"
                            style="font-size: 1.25rem; max-width: 700px; margin: 0 auto; line-height: 1.7;">
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
                    <h2 class="display-5 fw-bold" data-aos="fade-up">Tất Cả Loại Phòng</h2>
                    <p class="text-muted lead" data-aos="fade-up" data-aos-delay="100">
                        Chọn phòng phù hợp với nhu cầu của bạn
                    </p>
                </div>

                <div class="row g-4">
                    <template v-for="(v, k) in ds_loai_phong" :key="k">
                        <div class="col-lg-4 col-md-6" data-aos="fade-up" :data-aos-delay="k * 100">
                            <div
                                class="room-card rounded-4 overflow-hidden shadow-lg bg-white h-100 position-relative transition-all">
                                <!-- Ảnh -->
                                <div class="position-relative overflow-hidden" style="height: 260px;">
                                    <img :src="v.hinh_anh" class="w-100 h-100 object-cover" :alt="v.ten_loai_phong"
                                        style="transition: transform 0.6s ease;">
                                </div>

                                <!-- Nội dung -->
                                <div class="p-4">
                                    <h5 class="fw-bold text-dark mb-3">{{ v.ten_loai_phong }}</h5>

                                    <!-- Tiện ích: Diện tích, Giường, Người lớn, Trẻ em -->
                                    <div class="d-flex flex-wrap gap-3 text-muted small mb-3">
                                        <span><i class="bx bx-expand text-warning me-1"></i>{{ v.dien_tich }} m²</span>
                                        <span><i class="bx bx-bed text-warning me-1"></i>{{ v.so_giuong }} Giường</span>
                                        <span><i class="bx bx-user text-warning me-1"></i>{{ v.so_nguoi_lon }} Người
                                            lớn</span>
                                        <span v-if="v.so_tre_em > 0">
                                            <i class="bx bx-child text-primary me-1"></i>{{ v.so_tre_em }} Trẻ em
                                        </span>
                                    </div>

                                    <hr class="my-3">

                                    <!-- Nút Xem chi tiết (không có giá) -->
                                    <div class="text-end">
                                        <router-link :to="'/chi-tiet-phong/' + v.id">
                                            <button class="btn btn-outline-warning rounded-pill px-4 py-2 fw-semibold">
                                                XEM CHI TIẾT
                                            </button>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>

                <!-- Không có phòng -->
                <div v-if="ds_loai_phong.length === 0" class="text-center py-5" data-aos="fade-up">
                    <i class="bx bx-home fs-1 text-muted mb-3"></i>
                    <p class="text-muted">Không tìm thấy phòng nào phù hợp.</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            ds_loai_phong: []
        }
    },
    mounted() {
        this.LaydulieuLoaiPhong();
    },
    methods: {
        LaydulieuLoaiPhong() {
            axios
                .get('http://127.0.0.1:8000/api/client/loai-phong/data')
                .then((res) => {
                    const rooms = res.data.loai_phong || [];
                    this.ds_loai_phong = rooms.map(room => ({
                        ...room,
                        so_tre_em: room.so_tre_em ?? 0  // Đảm bảo luôn có so_tre_em
                    }));
                })
                .catch(() => {
                    toaster.error("Không tải được danh sách phòng!");
                });
        },
        formatPrice(price) {
            return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
        }
    }
}
</script>

<style scoped>
/* === BANNER DÙNG ẢNH PEXELS === */
.hero-rooms {
    height: 75vh;
    min-height: 600px;
    background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.45)),
        url('https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&w=1600') center/cover no-repeat;
    display: flex;
    align-items: center;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.6) 100%);
}

/* === CARD PHÒNG === */
.room-card {
    transition: all 0.4s ease;
    border: none !important;
}

.room-card:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12) !important;
}

.room-card:hover img {
    transform: scale(1.05);
}

/* Nút Xem chi tiết */
.btn-outline-warning {
    border: 2px solid #ff9900;
    color: #ff9900;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-outline-warning:hover {
    background: #ff9900;
    color: white;
    transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 992px) {
    .hero-rooms h1 {
        font-size: 2.8rem !important;
    }

    .hero-rooms .lead {
        font-size: 1.1rem !important;
    }
}

@media (max-width: 576px) {
    .hero-rooms {
        height: 60vh;
        min-height: 500px;
    }

    .hero-rooms h1 {
        font-size: 2.2rem !important;
    }

    .hero-rooms .lead {
        font-size: 1rem !important;
    }
}
</style>