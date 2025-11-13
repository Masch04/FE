<template>
    <!-- 1. BANNER -->
    <section class="hero-section position-relative overflow-hidden mb-5" data-aos="fade-zoom-in" data-aos-delay="100">
        <!-- Carousel Banner -->
        <div id="carouselHero" class="carousel slide h-100" data-bs-ride="carousel" data-bs-interval="4000">
            <div class="carousel-indicators">
                <template v-for="(v, k) in ds_slide" :key="k">
                    <button type="button" :data-bs-target="'#carouselHero'" :data-bs-slide-to="k"
                        :class="{ active: k === 0 }" :aria-current="k === 0 ? 'true' : null" class="bg-white opacity-75"
                        style="width: 12px; height: 12px; border-radius: 50%;"></button>
                </template>
            </div>

            <div class="carousel-inner h-100">
                <template v-for="(v, k) in ds_slide" :key="k">
                    <div :class="['carousel-item h-100', { active: k === 0 }]">
                        <img :src="v.link_hinh_anh" class="d-block w-100 h-100 object-fit-cover slide-img" alt="Slide">
                        <div class="position-absolute top-0 start-0 w-100 h-100"
                            style="background: linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 100%);">
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- Nội dung trên banner -->
        <div class="hero-content position-absolute top-50 start-50 translate-middle text-center w-100 px-3"
            style="z-index: 3;">
            <h1 class="hero-title display-3 fw-bold text-white mb-4 animate__animated animate__fadeInDown">
                <span class="d-block">Thiên đường nghỉ dưỡng</span>
                <span class="text-warning d-block">sang trọng & đẳng cấp</span>
            </h1>

            <p class="hero-subtitle text-white mb-5 animate__animated animate__fadeInUp animate__delay-1s lead"
                style="font-size: 1.3rem; opacity: 0.92;">
                Trải nghiệm dịch vụ 5 sao – Nơi mọi giấc mơ trở thành hiện thực
            </p>

            <!-- NÚT KHÁM PHÁ NGAY – GRADIENT VÀNG SANG TRỌNG -->
            <router-link to="/danh-sach-phong" class="d-inline-block">
                <button class="btn btn-explore btn-lg animate__animated animate__zoomIn animate__delay-1s">
                    <i class="bx bx-right-arrow-alt me-2"></i> KHÁM PHÁ NGAY
                </button>
            </router-link>
        </div>
    </section>

    <!-- 2. PHẦN GIỚI THIỆU -->
    <section class="intro-section py-5 bg-light">
        <div class="container">
            <div class="row g-5 align-items-center">
                <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
                    <p class="text-uppercase small mb-2"
                        style="font-style: italic; font-size: 1.1rem; color: #333; font-weight: 500;">
                        GIỚI THIỆU
                    </p>
                    <h2 class="display-5 fw-bold text-dark mb-4">Tận hưởng trải nghiệm nghỉ dưỡng tuyệt vời</h2>
                    <p class="text-muted lead mb-3">
                        Nơi đây là điểm đến lý tưởng cho những ai đang tìm kiếm sự hoàn hảo trong mỗi chuyến đi.
                    </p>
                    <p class="text-muted mb-4">
                        Vị trí đắc địa của chúng tôi nằm ngay tại trái tim thành phố, giúp bạn dễ dàng tiếp cận với các
                        điểm tham quan nổi tiếng, nhà hàng, cửa hàng mua sắm và hoạt động giải trí sôi động.
                    </p>
                </div>
                <div class="col-lg-6" data-aos="fade-left" data-aos-delay="200">
                    <div class="row g-3">
                        <div class="col-12 col-md-6" data-aos="fade-up" data-aos-delay="100">
                            <div class="image-container rounded-3 overflow-hidden shadow-sm">
                                <img src="https://mona-hotel.monamedia.net/wp-content/uploads/2022/08/image-1.jpg"
                                    alt="Hồ bơi resort" class="w-100 h-100 object-fit-cover">
                            </div>
                        </div>
                        <div class="col-12 col-md-6" data-aos="fade-up" data-aos-delay="200">
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

    <!-- 3. PHÒNG NGHỈ – CHỈ ẢNH + TÊN PHÒNG, TỰ ĐỘNG CHẬM, KHÔNG CHẤM -->
    <section class="py-5" style="background: linear-gradient(180deg, #111827 0%, #0f172a 100%);" id="rooms">
        <div class="container">
            <!-- Tiêu đề -->
            <div class="text-center mb-5">
                <p class="text-uppercase small text-warning mb-2" style="letter-spacing: 2px; font-weight: 500;"
                    data-aos="fade-down">
                    PHÒNG TỐT CHO NGHỈ DƯỠNG
                </p>
                <h2 class="display-5 fw-bold text-white" data-aos="fade-up">Phòng nghỉ đẳng cấp</h2>
            </div>

            <!-- Carousel tự động chậm, không chấm -->
            <div id="roomsCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="8000">
                <div class="carousel-inner">
                    <template v-for="(chunk, index) in roomChunks" :key="index">
                        <div :class="['carousel-item', { active: index === 0 }]">
                            <div class="row g-3 justify-content-center">
                                <div v-for="(phong, i) in chunk" :key="phong.id" class="col-12 col-md-6 col-lg-4"
                                    :data-aos="'fade-up'" :data-aos-delay="(i * 80) + 100">
                                    <div class="position-relative rounded-3 overflow-hidden shadow-lg"
                                        style="height: 280px;">
                                        <!-- Ảnh -->
                                        <img :src="phong.hinh_anh || 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Phòng'"
                                            :alt="phong.ten_loai_phong" class="w-100 h-100 object-cover"
                                            style="transition: transform 0.6s ease;"
                                            @mouseenter="$event.target.style.transform = 'scale(1.06)'"
                                            @mouseleave="$event.target.style.transform = 'scale(1)'">

                                        <!-- Tên phòng (dưới ảnh, nền mờ) -->
                                        <div class="position-absolute bottom-0 start-0 end-0 p-3 text-center"
                                            style="background: linear-gradient(transparent, rgba(0,0,0,0.7));">
                                            <h6 class="text-white fw-bold mb-0"
                                                style="text-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                                {{ phong.ten_loai_phong }}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <!-- Nút xem tất cả -->
            <div class="text-center mt-5">
                <router-link to="/danh-sach-phong" class="btn btn-warning px-5 py-3 text-uppercase fw-bold"
                    style="border-radius: 50px; font-size: 0.9rem;" data-aos="zoom-in" data-aos-delay="200">
                    Xem tất cả phòng
                </router-link>
            </div>
        </div>
    </section>
    <!-- 4. REVIEW -->
    <section class="py-5 bg-light" id="review">
        <div class="container">
            <div class="text-center mb-5">
                <p class="text-uppercase small text-muted mb-2" style="letter-spacing: 2px; font-weight: 500;"
                    data-aos="fade-down">
                    ĐÁNH GIÁ CHẤT LƯỢNG
                </p>
                <h2 class="display-5 fw-bold text-dark" data-aos="fade-up">Trải nghiệm khách hàng</h2>
            </div>

            <div id="reviewCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="6000">
                <div class="carousel-inner">
                    <template v-for="(chunk, index) in reviewChunks" :key="index">
                        <div :class="['carousel-item', { active: index === 0 }]">
                            <div class="row g-4 justify-content-center">
                                <div v-for="(review, i) in chunk" :key="review.id" class="col-12 col-md-6 col-lg-4"
                                    :data-aos="'fade-up'" :data-aos-delay="(i * 100) + 100">
                                    <div class="card border-0 shadow-sm rounded-4 h-100 position-relative overflow-hidden bg-white p-4"
                                        style="transition: all 0.4s ease;"
                                        @mouseenter="$event.currentTarget.style.transform = 'translateY(-8px)'; $event.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)'"
                                        @mouseleave="$event.currentTarget.style.transform = 'translateY(0)'; $event.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)'">
                                        <div
                                            class="position-absolute top-0 start-0 translate-middle-x mt-3 ms-3 text-warning opacity-25">
                                            <i class="bx bxs-quote-left" style="font-size: 3rem;"></i>
                                        </div>
                                        <p class="text-muted small mb-4 lh-lg"
                                            style="font-style: italic; min-height: 120px;">
                                            "{{ review.noi_dung }}"
                                        </p>
                                        <div class="d-flex align-items-center mt-auto">
                                            <img :src="review.avatar" alt="Avatar" class="rounded-circle me-3"
                                                style="width: 50px; height: 50px; object-fit: cover; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                            <div>
                                                <h6 class="mb-0 fw-bold text-dark">{{ review.ho_va_ten }}</h6>
                                                <p class="text-muted small mb-0">{{ review.chuc_vu || 'Khách hàng' }}
                                                </p>
                                            </div>
                                            <i class="bx bxs-quote-right text-warning ms-auto"
                                                style="font-size: 1.5rem; opacity: 0.3;"></i>
                                        </div>
                                        <div class="mt-3 d-flex justify-content-start">
                                            <template v-for="n in 5" :key="n">
                                                <i :class="['bx', n <= review.sao_danh_gia ? 'bxs-star text-warning' : 'bx-star text-secondary']"
                                                    style="font-size: 0.9rem;"></i>
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
                                    :style="{ background: i === activeReviewIndex ? '#ffc107 !important' : '#6c757d' }">
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. TIỆN ÍCH XUNG QUANH -->
    <section class="py-5 bg-white" id="amenities">
        <div class="container">
            <div class="text-center mb-5">
                <p class="text-uppercase small text-muted mb-2" style="letter-spacing: 2px; font-weight: 500;"
                    data-aos="fade-down">
                    DỊCH VỤ CHUYÊN NGHIỆP
                </p>
                <h2 class="display-5 fw-bold text-dark" data-aos="fade-up">Tiện ích xung quanh</h2>
            </div>

            <div class="row g-5 align-items-stretch">
                <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
                    <div class="h-100 rounded-4 overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0071726636675!2d108.19095897694739!3d16.065117584613827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219ab21c3d9ab%3A0x473424e86286cba4!2zMjQ1IELhur8gVsSDbiDEkMOgbiwgQ2jDrW5oIEdpw6FuLCBUaGFuaCBLaMOqLCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1763018226481!5m2!1svi!2s"
                            width="100%" height="100%" style="border:0; min-height: 480px;" allowfullscreen=""
                            loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="rounded-4">
                        </iframe>
                    </div>
                </div>
                <div class="col-lg-6 d-flex" data-aos="fade-left" data-aos-delay="200">
                    <div class="row g-4 flex-fill">
                        <div class="col-6 d-flex" v-for="n in 6" :key="n" :data-aos="'fade-up'"
                            :data-aos-delay="n * 100">
                            <div
                                class="amenity-card flex-fill p-4 rounded-4 shadow-sm bg-light border-start border-warning border-5 d-flex flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <i :class="['bx', getAmenityIcon(n), 'text-warning', 'me-3']"
                                        style="font-size: 2.2rem;"></i>
                                    <h5 class="fw-bold mb-0">{{ getAmenityTitle(n) }}</h5>
                                </div>
                                <p class="text-muted small mb-0 flex-grow-1">{{ getAmenityDesc(n) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 6. DỊCH VỤ CHẤT LƯỢNG -->
    <section class="py-5 bg-light" id="services">
        <div class="container">
            <div class="row g-5">
                <!-- Gym -->
                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                    <div class="row g-4 align-items-center">
                        <div class="col-md-5">
                            <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600"
                                alt="Phòng Gym" class="img-fluid rounded-4 shadow-sm">
                        </div>
                        <div class="col-md-7">
                            <p class="text-uppercase small text-muted mb-1">DỊCH VỤ CHẤT LƯỢNG</p>
                            <h3 class="fw-bold mb-3">Phòng gym</h3>
                            <p class="text-muted mb-4">
                                "Trang bị đầy đủ các thiết bị hiện đại và chuyên nghiệp, không gian rộng rãi, bạn có thể
                                tập
                                luyện và rèn luyện cơ thể một cách hiệu quả."
                            </p>
                            <router-link to="/gym#top" class="d-inline-block">
                                <button class="btn btn-warning text-white px-4 py-2 rounded-pill fw-semibold">ĐỌC
                                    THÊM</button>
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- Nhà hàng -->
                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="row g-4 align-items-center">
                        <div class="col-md-5 order-md-2">
                            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600" alt="Nhà hàng"
                                class="img-fluid rounded-4 shadow-sm">
                        </div>
                        <div class="col-md-7 order-md-1">
                            <p class="text-uppercase small text-muted mb-1">DỊCH VỤ CHẤT LƯỢNG</p>
                            <h3 class="fw-bold mb-3">Nhà hàng</h3>
                            <p class="text-muted mb-4">
                                "Với thực đơn đa dạng từ các món ăn địa phương đến ẩm thực quốc tế, bạn sẽ được thưởng
                                thức
                                các món ăn tươi ngon và hương vị độc đáo."
                            </p>
                            <router-link to="/restaurant#top" class="d-inline-block">
                                <button class="btn btn-warning text-white px-4 py-2 rounded-pill fw-semibold">ĐỌC
                                    THÊM</button>
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- Spa -->
                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="row g-4 align-items-center">
                        <div class="col-md-5">
                            <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600" alt="Spa"
                                class="img-fluid rounded-4 shadow-sm">
                        </div>
                        <div class="col-md-7">
                            <p class="text-uppercase small text-muted mb-1">DỊCH VỤ CHẤT LƯỢNG</p>
                            <h3 class="fw-bold mb-3">Spa</h3>
                            <p class="text-muted mb-4">
                                "Trong không gian yên tĩnh và thư giãn của spa, bạn có thể tận hưởng các liệu pháp spa
                                tuyệt
                                vời để làm dịu cơ thể và tinh thần."
                            </p>
                            <router-link to="/spa#top" class="d-inline-block">
                                <button class="btn btn-warning text-white px-4 py-2 rounded-pill fw-semibold">ĐỌC
                                    THÊM</button>
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- Hồ bơi -->
                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="400">
                    <div class="row g-4 align-items-center">
                        <div class="col-md-5 order-md-2">
                            <img src="https://images.unsplash.com/photo-1509600110300-21b9d5fedeb7?w=600" alt="Hồ bơi"
                                class="img-fluid rounded-4 shadow-sm">
                        </div>
                        <div class="col-md-7 order-md-1">
                            <p class="text-uppercase small text-muted mb-1">DỊCH VỤ CHẤT LƯỢNG</p>
                            <h3 class="fw-bold mb-3">Hồ bơi</h3>
                            <p class="text-muted mb-4">
                                "Với nước trong xanh và không gian xung quanh thoáng đãng, bạn có thể tắm nắng, tập thể
                                dục
                                hoặc đơn giản là thư giãn trong nước."
                            </p>
                            <router-link to="/pool#top" class="d-inline-block">
                                <button class="btn btn-warning text-white px-4 py-2 rounded-pill fw-semibold">ĐỌC
                                    THÊM</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { createToaster } from '@meforma/vue-toaster';
const toaster = createToaster({ position: 'top-right' });

export default {
    data() {
        return {
            ds_review: [],
            ds_slide: [],
            ds_loai_phong: [],
            activeReviewIndex: 0,
        };
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
        },
    },
    mounted() {
        this.layDuLieuHomepage();

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
                params: { id: phong.id },
            });
        },
        layDuLieuHomepage() {
            axios
                .get('http://127.0.0.1:8000/api/homepage/data')
                .then((res) => {
                    this.ds_review = res.data.dataReview || [];
                    this.ds_slide = res.data.dataSlide || [];
                    this.ds_loai_phong = res.data.dataLoaiPhong || [];
                })
                .catch((err) => console.error('Lỗi API:', err));
        },
        hoverCard(e, isEnter) {
            if (isEnter) {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(251, 193, 7, 0.3)';
            } else {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
            }
        },
        getAmenityIcon(n) {
            const icons = ['bxs-car', 'bxs-car-mechanic', 'bxs-home-smile', 'bxs-swimming-pool', 'bxs-wifi', 'bxs-coffee'];
            return icons[n - 1];
        },
        getAmenityTitle(n) {
            const titles = ['Đưa đón', 'Chỗ đậu xe', 'Dịch vụ phòng', 'Hồ bơi', 'Internet', 'Bữa ăn sáng'];
            return titles[n - 1];
        },
        getAmenityDesc(n) {
            const descs = [
                'Dịch vụ đưa đón tiện lợi từ sân bay đến khách sạn và ngược lại, đảm bảo bạn có một chuyến đi dễ dàng và thoải mái.',
                'Chỗ đậu xe rộng rãi và an ninh, bạn có thể yên tâm về việc đỗ xe trong suốt thời gian lưu trú.',
                'Làm sạch và dọn dẹp phòng nghỉ hàng ngày, đảm bảo mọi thứ luôn sạch sẽ và gọn gàng.',
                'Hồ bơi rộng lớn và không gian thư giãn xung quanh, tận hưởng từng khoảnh khắc.',
                'Kết nối internet cáp quang tốc độ cao, kết nối nhanh chóng mọi lúc.',
                'Khởi đầu ngày mới với thực đơn đa dạng, món ăn tươi ngon và đặc sản địa phương.'
            ];
            return descs[n - 1];
        },
        inLog() {
            this.info.so_phong = 0;
            this.info.so_lon = 0;
            this.info.so_tre = 0;
            this.info.so_tien = 0;
            let date2 = new Date(this.tt_dat_phong.ngay_di);
            let date1 = new Date(this.tt_dat_phong.ngay_den);
            let Difference_In_Time = date2.getTime() - date1.getTime();
            let Difference_In_Days = Math.max(1, Math.round(Difference_In_Time / (1000 * 3600 * 24)));
            this.ds_loai_phong.forEach((value, index) => {
                if (value.chon_phong && value.chon_phong == true) {
                    this.info.so_phong = this.info.so_phong + value.so_phong_dat;
                    this.info.so_tien = this.info.so_tien + value.so_phong_dat * parseInt(value.gia_trung_binh_ko_format) * Difference_In_Days;
                    this.info.so_lon = this.info.so_lon + value.so_phong_dat * value.so_nguoi_lon;
                    this.info.so_tre = this.info.so_tre + value.so_phong_dat * value.so_tre_em;
                }
            })
        },
    },
    watch: {
        reviewChunks() {
            this.$nextTick(() => {
                const progress = document.querySelector('#reviewCarousel .progress-bar');
                if (progress) progress.style.width = '100%';
            });
        },
    },
};
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

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.08);
    }
}

/* Nút chấm tròn */
#carouselHero .carousel-indicators button {
    transition: all 0.3s ease;
}

#carouselHero .carousel-indicators button.active {
    background-color: #ffc107 !important;
    transform: scale(1.2);
}

/* NÚT KHÁM PHÁ NGAY – GRADIENT VÀNG SANG TRỌNG */
.btn-explore {
    background: linear-gradient(135deg, #ffb800 0%, #ff8c00 100%);
    color: white !important;
    font-weight: 700;
    text-transform: uppercase;
    padding: 1rem 3rem;
    font-size: 1.1rem;
    border-radius: 50px;
    border: none;
    box-shadow: 0 10px 25px rgba(255, 140, 0, 0.4);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    z-index: 1;
}

.btn-explore::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #ffcc00, #ff6b00);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
}

.btn-explore:hover::before {
    opacity: 1;
}

.btn-explore:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 20px 40px rgba(255, 140, 0, 0.5);
}

.btn-explore:active {
    transform: translateY(-2px) scale(1.03);
}

/* === ANIMATION === */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
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
    transition: transform 3s ease-in-out !important;
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
    .hero-title {
        font-size: 2.5rem !important;
    }

    .hero-subtitle {
        font-size: 1.1rem !important;
    }

    .btn-explore {
        padding: 0.9rem 2.2rem;
        font-size: 1rem;
    }
}

@media (max-width: 576px) {
    .hero-title {
        font-size: 2rem !important;
    }

    .hero-subtitle {
        font-size: 1rem !important;
    }

    .btn-explore {
        padding: 0.8rem 2rem;
        font-size: 0.95rem;
    }
}

/* === TIỆN ÍCH XUNG QUANH === */
#amenities .row.g-5 {
    align-items: stretch !important;
}

#amenities .col-lg-6>div {
    height: 100%;
}

#amenities iframe {
    min-height: 480px;
    display: block;
}

.amenity-card {
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    background: #f8f9fa;
    min-height: 150px;
}

.amenity-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1) !important;
}

@media (max-width: 992px) {
    #amenities .row.g-5 {
        flex-direction: column;
    }

    #amenities .col-lg-6 {
        margin-bottom: 1.5rem;
    }

    #amenities iframe {
        min-height: 350px !important;
    }
}

@media (max-width: 576px) {
    .amenity-card {
        padding: 1rem !important;
    }

    .amenity-card i {
        font-size: 1.8rem !important;
    }
}

/* === DỊCH VỤ CHẤT LƯỢNG === */
#services .btn-warning {
    background: #d4a373;
    border: none;
    transition: all 0.3s ease;
}

#services .btn-warning:hover {
    background: #c48b5e;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(212, 163, 115, 0.3);
}

#services img {
    height: 220px;
    object-fit: cover;
    transition: transform 0.4s ease;
}

#services img:hover {
    transform: scale(1.05);
}

@media (max-width: 992px) {
    #services .order-md-1 {
        order: 2;
    }

    #services .order-md-2 {
        order: 1;
    }

    #services .col-md-5,
    #services .col-md-7 {
        margin-bottom: 1.5rem;
    }
}

@media (max-width: 576px) {
    #services img {
        height: 180px;
    }
}
</style>