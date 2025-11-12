<template>
    <!-- 1. BANNER - ĐÃ LÀM ĐẸP, TÁCH RIÊNG -->
    <section class="hero-section position-relative overflow-hidden mb-5">
        <!-- Carousel Banner -->
        <div id="carouselHero" class="carousel slide h-100" data-bs-ride="carousel" data-bs-interval="4000">
            <div class="carousel-indicators">
                <template v-for="(v, k) in ds_slide" :key="k">
                    <button
                        type="button"
                        :data-bs-target="'#carouselHero'"
                        :data-bs-slide-to="k"
                        :class="{ active: k === 0 }"
                        :aria-current="k === 0 ? 'true' : null"
                        class="bg-white opacity-75"
                        style="width: 12px; height: 12px; border-radius: 50%;"
                    ></button>
                </template>
            </div>

            <div class="carousel-inner h-100">
                <template v-for="(v, k) in ds_slide" :key="k">
                    <div :class="['carousel-item h-100', { active: k === 0 }]">
                        <img
                            :src="v.link_hinh_anh"
                            class="d-block w-100 h-100 object-fit-cover slide-img"
                            alt="Slide"
                        >
                        <div class="position-absolute top-0 start-0 w-100 h-100" style="background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%);"></div>
                    </div>
                </template>
            </div>
        </div>

        <!-- Nội dung trên banner -->
        <div class="hero-content position-absolute top-50 start-50 translate-middle text-center w-100 px-3" style="z-index: 3;">
            <h1 class="hero-title display-4 fw-bold text-white mb-3 animate__animated animate__fadeInDown">
                <span class="d-block">Thiên đường nghỉ dưỡng</span>
                <span class="text-warning">sang trọng & đẳng cấp</span>
            </h1>
            <p class="hero-subtitle text-white mb-4 animate__animated animate__fadeInUp animate__delay-1s" style="font-size: 1.2rem; opacity: 0.9;">
                Trải nghiệm dịch vụ 5 sao – Nơi mọi giấc mơ trở thành hiện thực
            </p>

            <!-- Nút khám phá -->
            <router-link to="/danh-sach-phong" class="d-inline-block">
                <button class="btn btn-explore btn-lg animate__animated animate__zoomIn animate__delay-2s">
                    <i class="bx bx-right-arrow-alt me-2"></i> KHÁM PHÁ NGAY
                </button>
            </router-link>

            <!-- Form tìm kiếm - NÚT TÌM KIẾM XUỐNG DÒNG DƯỚI -->
            <div class="search-form-container mt-5 animate__animated animate__slideInUp animate__delay-3s">
                <form class="search-form bg-white p-4 rounded-4 shadow-xl mx-auto" style="max-width: 1100px;">
                    <!-- Dòng 1: Các ô input -->
                    <div class="d-flex flex-wrap gap-3 align-items-center justify-content-center mb-3">
                        <div class="form-group flex-fill" style="min-width: 150px;">
                            <label class="form-label text-muted small fw-semibold mb-1">Nhận phòng</label>
                            <input type="text" class="form-control rounded-3 shadow-sm" placeholder="dd/mm/yyyy" style="height: 48px;">
                        </div>
                        <div class="form-group flex-fill" style="min-width: 150px;">
                            <label class="form-label text-muted small fw-semibold mb-1">Trả phòng</label>
                            <input type="text" class="form-control rounded-3 shadow-sm" placeholder="dd/mm/yyyy" style="height: 48px;">
                        </div>
                        <div class="form-group" style="min-width: 100px;">
                            <label class="form-label text-muted small fw-semibold mb-1">Khách</label>
                            <input type="text" class="form-control text-center rounded-3 shadow-sm" value="2" readonly style="height: 48px;">
                        </div>
                        <div class="form-group" style="min-width: 120px;">
                            <label class="form-label text-muted small fw-semibold mb-1">Phòng</label>
                            <div class="input-group" style="height: 48px;">
                                <button class="btn btn-outline-secondary rounded-start-3 h-100">-</button>
                                <input type="text" class="form-control text-center h-100" value="1" style="max-width: 50px;">
                                <button class="btn btn-outline-secondary rounded-end-3 h-100">+</button>
                            </div>
                        </div>
                    </div>

                    <!-- Dòng 2: Nút Tìm kiếm (căn giữa) -->
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-search btn-lg px-5 d-flex align-items-center justify-content-center" style="height: 48px; min-width: 160px;">
                            <i class="bx bx-search me-2"></i> Tìm kiếm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <!-- 2. PHẦN GIỚI THIỆU -->
    <section class="intro-section py-5 bg-light">
        <div class="container">
            <div class="row g-5 align-items-center">
                <div class="col-lg-6">
                    <p class="text-uppercase small mb-2" style="font-style: italic; font-size: 1.1rem; color: #333; font-weight: 500;">
                        GIỚI THIỆU
                    </p>
                    <h2 class="display-5 fw-bold text-dark mb-4">
                        Tận hưởng trải nghiệm nghỉ dưỡng tuyệt vời
                    </h2>
                    <p class="text-muted lead mb-3">
                        Nơi đây là điểm đến lý tưởng cho những ai đang tìm kiếm sự hoàn hảo trong mỗi chuyến đi.
                    </p>
                    <p class="text-muted mb-4">
                        Vị trí đắc địa của chúng tôi nằm ngay tại trái tim thành phố, giúp bạn dễ dàng tiếp cận với các điểm
                        tham quan nổi tiếng, nhà hàng, cửa hàng mua sắm và hoạt động giải trí sôi động.
                    </p>
                </div>
                <div class="col-lg-6">
                    <div class="row g-3">
                        <div class="col-12 col-md-6">
                            <div class="image-container rounded-3 overflow-hidden shadow-sm">
                                <img src="https://mona-hotel.monamedia.net/wp-content/uploads/2022/08/image-1.jpg"
                                    alt="Hồ bơi resort" class="w-100 h-100 object-fit-cover">
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="image-container rounded-3 overflow-hidden shadow-sm">
                                <img src="https://mona-hotel.monamedia.net/wp-content/uploads/elementor/thumbs/image-2n-qnskkn93w2474ot7x21p35f3fbh9otaz3422c2sahw.jpg"
                                    alt="Khách check-in" class="w-100 h-100 object-fit-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. PHÒNG NGHỈ -->
    <section class="py-5" style="background: linear-gradient(180deg, #111827 0%, #0f172a 100%); color: white;" id="rooms">
        <div class="container">
            <div class="text-center mb-5">
                <p class="text-uppercase small text-warning mb-2" style="letter-spacing: 2px; font-weight: 500;">
                    PHÒNG TỐT CHO NGHỈ DƯỠNG
                </p>
                <h2 class="display-5 fw-bold text-white">Phòng nghỉ đẳng cấp</h2>
            </div>

            <div id="roomsCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="6000">
                <div class="carousel-inner">
                    <template v-for="(chunk, index) in roomChunks" :key="index">
                        <div :class="['carousel-item', { active: index === 0 }]">
                            <div class="row g-4 justify-content-center">
                                <div v-for="(phong, i) in chunk" :key="phong.id" class="col-12 col-md-6 col-lg-4"
                                    :style="{ animation: 'fadeInUp 0.6s ease forwards', animationDelay: (i * 0.15) + 's', opacity: 0 }">
                                    <div class="card bg-dark border-0 rounded-3 overflow-hidden shadow-lg h-100 position-relative cursor-pointer"
                                        style="transition: all 0.4s ease;" @mouseenter="hoverCard($event, true)"
                                        @mouseleave="hoverCard($event, false)" @click="xemChiTietPhong(phong)">
                                        <div class="position-relative overflow-hidden" style="height: 220px;">
                                            <img :src="phong.hinh_anh || 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Phòng'"
                                                :alt="phong.ten_loai_phong" class="w-100 h-100 object-cover"
                                                style="transition: transform 0.7s ease;"
                                                @mouseenter="$event.target.style.transform = 'scale(1.1)'"
                                                @mouseleave="$event.target.style.transform = 'scale(1)'" />
                                            <div class="position-absolute bottom-0 start-0 m-3 bg-white text-dark px-3 py-2 rounded-pill shadow-sm"
                                                style="font-weight: bold; font-size: 0.9rem;">
                                                Từ {{ formatPrice(phong.gia_ngay) }}/ngày
                                            </div>
                                        </div>
                                        <div class="p-4 d-flex flex-column flex-grow-1">
                                            <h5 class="fw-bold text-white mb-3">{{ phong.ten_loai_phong }}</h5>
                                            <div class="d-flex justify-content-between text-muted small mb-3">
                                                <span><i class="bx bx-user text-warning"></i> {{ phong.suc_chua }} người</span>
                                                <span><i class="bx bx-ruler text-warning"></i> {{ phong.dien_tich }} m²</span>
                                            </div>
                                            <button class="btn btn-outline-warning btn-sm mt-auto text-uppercase fw-semibold"
                                                style="border-radius: 50px; padding: 0.5rem 1.5rem;">
                                                Đặt ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>

                <div class="carousel-indicators mt-4">
                    <button v-for="(chunk, i) in roomChunks" :key="i" type="button" :data-bs-target="'#roomsCarousel'"
                        :data-bs-slide-to="i" :class="{ active: i === 0 }" class="bg-secondary mx-1"
                        style="width: 10px; height: 10px; border-radius: 50%;"></button>
                </div>
            </div>

            <div class="text-center mt-5">
                <router-link to="/danh-sach-phong" class="btn btn-warning px-5 py-3 text-uppercase fw-bold"
                    style="border-radius: 50px; font-size: 0.9rem;">
                    Xem tất cả phòng
                </router-link>
            </div>
        </div>
    </section>

    <!-- 4. REVIEW -->
    <section class="py-5 bg-light" id="review">
        <div class="container">
            <div class="text-center mb-5">
                <p class="text-uppercase small text-muted mb-2" style="letter-spacing: 2px; font-weight: 500;">
                    ĐÁNH GIÁ CHẤT LƯỢNG
                </p>
                <h2 class="display-5 fw-bold text-dark">Trải nghiệm khách hàng</h2>
            </div>

            <div id="reviewCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="6000">
                <div class="carousel-inner">
                    <template v-for="(chunk, index) in reviewChunks" :key="index">
                        <div :class="['carousel-item', { active: index === 0 }]">
                            <div class="row g-4 justify-content-center">
                                <div v-for="(review, i) in chunk" :key="review.id" class="col-12 col-md-6 col-lg-4"
                                    :style="{ animation: 'fadeInUp 0.6s ease forwards', animationDelay: (i * 0.15) + 's', opacity: 0 }">
                                    <div class="card border-0 shadow-sm rounded-4 h-100 position-relative overflow-hidden bg-white p-4"
                                        style="transition: all 0.4s ease;"
                                        @mouseenter="$event.currentTarget.style.transform = 'translateY(-8px)'; $event.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)'"
                                        @mouseleave="$event.currentTarget.style.transform = 'translateY(0)'; $event.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)'">
                                        <div class="position-absolute top-0 start-0 translate-middle-x mt-3 ms-3 text-warning opacity-25">
                                            <i class="bx bxs-quote-left" style="font-size: 3rem;"></i>
                                        </div>
                                        <p class="text-muted small mb-4 lh-lg" style="font-style: italic; min-height: 120px;">
                                            "{{ review.noi_dung }}"
                                        </p>
                                        <div class="d-flex align-items-center mt-auto">
                                            <img :src="review.avatar" alt="Avatar" class="rounded-circle me-3"
                                                style="width: 50px; height: 50px; object-fit: cover; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                            <div>
                                                <h6 class="mb-0 fw-bold text-dark">{{ review.ho_va_ten }}</h6>
                                                <p class="text-muted small mb-0">{{ review.chuc_vu || 'Khách hàng' }}</p>
                                            </div>
                                            <i class="bx bxs-quote-right text-warning ms-auto" style="font-size: 1.5rem; opacity: 0.3;"></i>
                                        </div>
                                        <div class="mt-3 d-flex justify-content-start">
                                            <template v-for="n in 5" :key="n">
                                                <i :class="['bx', n <= review.sao_danh_gia ? 'bxs-star text-warning' : 'bx-star text-secondary']" style="font-size: 0.9rem;"></i>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>

                <div class="text-center mt-5">
                    <div class="d-flex justify-content-center align-items-center gap-3">
                        <div class="progress flex-grow-1" style="height: 4px; width: 120px; background: #e9ecef;">
                            <div class="progress-bar bg-warning" role="progressbar" style="width: 0%;"></div>
                        </div>
                        <div class="d-flex gap-1">
                            <template v-for="(chunk, i) in reviewChunks" :key="i">
                                <div :class="['rounded-circle', i === 0 ? 'bg-warning' : 'bg-secondary']"
                                    style="width: 8px; height: 8px; transition: all 0.3s ease;"
                                    :style="{ background: i === activeReviewIndex ? '#ffc107 !important' : '#6c757d' }"></div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            ds_review: [],
            ds_slide: [],
            ds_loai_phong: [],
            tt_dat: {},
            activeReviewIndex: 0
        }
    },
    computed: {
        roomChunks() {
            const size = 3;
            const chunks = [];
            for (let i = 0; i < this.ds_loai_phong.length; i += size) {
                chunks.push(this.ds_loai_phong.slice(i, i + size));
            }
            return chunks;
        },
        reviewChunks() {
            const size = 3;
            const chunks = [];
            for (let i = 0; i < this.ds_review.length; i += size) {
                chunks.push(this.ds_review.slice(i, i + size));
            }
            return chunks;
        }
    },
    mounted() {
        this.layDuLieuHomepage();
        this.getToday();

        this.$nextTick(() => {
            const reviewCarousel = document.getElementById('reviewCarousel');
            if (reviewCarousel) {
                reviewCarousel.addEventListener('slid.bs.carousel', () => {
                    const progress = reviewCarousel.querySelector('.progress-bar');
                    if (progress) {
                        progress.style.transition = 'none';
                        progress.style.width = '0%';
                        setTimeout(() => {
                            progress.style.transition = 'width 6s linear';
                            progress.style.width = '100%';
                        }, 50);
                    }
                });
            }
        });
    },
    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
        },
        xemChiTietPhong(phong) {
            this.$router.push({
                name: 'chiTietPhong',
                params: { id: phong.id }
            });
        },
        getToday() {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            const formatted = `${yyyy}-${mm}-${dd}`;
            this.tt_dat.min_ngay_di = formatted;
            this.tt_dat.min_ngay_den = formatted;
        },
        layDuLieuHomepage() {
            axios.get('http://127.0.0.1:8000/api/homepage/data')
                .then((res) => {
                    this.ds_review = res.data.dataReview || [];
                    this.ds_slide = res.data.dataSlide || [];
                    this.ds_loai_phong = res.data.dataLoaiPhong || [];
                })
                .catch(err => console.error('Lỗi API:', err));
        },
        hoverCard(e, isEnter) {
            if (isEnter) {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(251, 193, 7, 0.3)';
            } else {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(423, 0, 0, 0.3)';
            }
        }
    },
    watch: {
        reviewChunks() {
            this.$nextTick(() => {
                const progress = document.querySelector('#reviewCarousel .progress-bar');
                if (progress) progress.style.width = '100%';
            });
        }
    }
}
</script>

<style scoped>
/* === BANNER === */
.hero-section {
    height: 100vh;
    min-height: 600px;
}
.slide-img {
    transition: transform 12s ease !important;
}
.carousel-item.active .slide-img {
    animation: zoom 12s ease infinite;
}
@keyframes zoom {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
}

/* Nút chấm tròn */
#carouselHero .carousel-indicators button {
    transition: all 0.3s ease;
}
#carouselHero .carousel-indicators button.active {
    background-color: #ffc107 !important;
    transform: scale(1.2);
}

/* Nút khám phá */
.btn-explore {
    background: linear-gradient(45deg, #ff8c00, #ffb800);
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    padding: 0.9rem 2.5rem;
    border-radius: 50px;
    border: none;
    box-shadow: 0 8px 20px rgba(255, 140, 0, 0.4);
    transition: all 0.3s ease;
}
.btn-explore:hover {
    background: linear-gradient(45deg, #e67e00, #ff9900);
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 12px 25px rgba(255, 140, 0, 0.5);
}

/* Form tìm kiếm */
.search-form {
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.3);
}
.btn-search {
    background: linear-gradient(45deg, #ff8c00, #ffb800);
    color: white;
    font-weight: 600;
    border-radius: 50px;
    padding: 0.75rem 2rem;
    min-width: 160px;
    box-shadow: 0 5px 15px rgba(255, 140, 0, 0.3);
}
.btn-search:hover {
    background: linear-gradient(45deg, #e67e00, #ff9900);
}

/* === ANIMATION === */
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

/* === ẨN NÚT PREV/NEXT === */
#roomsCarousel .carousel-control-prev,
#roomsCarousel .carousel-control-next,
#reviewCarousel .carousel-control-prev,
#reviewCarousel .carousel-control-next {
    display: none !important;
}

/* === TỐC ĐỘ TRƯỢT === */
#roomsCarousel .carousel-item,
#reviewCarousel .carousel-item {
    transition: transform 2s ease-in-out !important;
}

/* === THANH TIẾN TRÌNH === */
#reviewCarousel .progress-bar {
    transition: width 6s linear !important;
}
#reviewCarousel .carousel-item.active .progress-bar {
    width: 100% !important;
}
#reviewCarousel .carousel-item:not(.active) .progress-bar {
    width: 0% !important;
}

/* === RESPONSIVE === */
@media (max-width: 992px) {
    .hero-title { font-size: 2.5rem !important; }
    .hero-subtitle { font-size: 1rem; }
    .search-form { padding: 1.5rem !important; }
    .search-form .d-flex { flex-direction: column; }
    .form-group { min-width: 100% !important; margin-bottom: 1rem; }
    .btn-search { width: 100%; }
}
</style>