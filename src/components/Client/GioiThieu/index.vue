<template>
    <div class="gioi-thieu-page" id="top">
        <!-- Banner Giới Thiệu -->
        <section class="hero-gioithieu position-relative overflow-hidden" data-aos="fade-zoom-in">
            <div class="hero-overlay"></div>
            <div class="container position-relative" style="z-index: 2;">
                <div class="row justify-content-center text-center py-5">
                    <div class="col-lg-10">
                        <h1 class="display-3 fw-bold text-white mb-4 animate__animated animate__fadeInDown">
                            CHÀO MỪNG ĐẾN VỚI <span class="text-warning">AIHOTEL PRO</span>
                        </h1>
                        <p
                            class="lead text-white mb-0 opacity-90 animate__animated animate__fadeInUp animate__delay-1s">
                            Nơi nghỉ dưỡng 5 sao – Nâng tầm trải nghiệm sống
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Phần 1: Sứ mệnh & Tầm nhìn -->
        <section class="py-5 bg-light">
            <div class="container">
                <!-- SỨ MỆNH -->
                <div class="row g-5 align-items-center mb-5">
                    <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
                        <h2 class="display-5 fw-bold mb-4 text-dark" style="letter-spacing: -0.5px;">
                            SỨ MỆNH CỦA CHÚNG TÔI
                        </h2>
                        <p class="lead mb-4" style="font-size: 1.15rem; line-height: 1.8; color: #4a5568;">
                            Mang đến cho du khách những khoảnh khắc nghỉ dưỡng
                            <span class="text-warning fw-bold">đẳng cấp, riêng tư và trọn vẹn</span>.
                        </p>
                        <p class="text-muted mb-0" style="font-size: 1rem; line-height: 1.75; color: #718096;">
                            Với tâm huyết xây dựng một không gian sống hoàn hảo, chúng tôi không chỉ cung cấp dịch vụ
                            lưu trú,<br>
                            mà còn kiến tạo những
                            <span class="text-warning fw-semibold">trải nghiệm đáng nhớ</span>,
                            nơi mỗi chi tiết đều được chăm chút tỉ mỉ.
                        </p>
                    </div>
                    <div class="col-lg-6" data-aos="fade-left" data-aos-delay="200">
                        <div class="ratio ratio-16x9 rounded-4 overflow-hidden shadow-lg">
                            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" alt="Sứ mệnh"
                                class="w-100 h-100 object-cover">
                        </div>
                    </div>
                </div>

                <!-- TẦM NHÌN -->
                <div class="row g-5 align-items-center">
                    <div class="col-lg-6 order-lg-2" data-aos="fade-left" data-aos-delay="100">
                        <h2 class="display-5 fw-bold mb-4 text-dark" style="letter-spacing: -0.5px;">
                            TẦM NHÌN ĐẾN 2030
                        </h2>
                        <p class="lead mb-4" style="font-size: 1.15rem; line-height: 1.8; color: #4a5568;">
                            Trở thành
                            <span class="text-warning fw-bold">thương hiệu khách sạn hàng đầu Việt Nam</span>,
                            được công nhận quốc tế về chất lượng và dịch vụ.
                        </p>
                        <p class="text-muted mb-0" style="font-size: 1rem; line-height: 1.75; color: #718096;">
                            Chúng tôi hướng tới việc mở rộng hệ thống lên
                            <span class="text-warning fw-semibold">10 cơ sở</span> trên toàn quốc,
                            đồng thời duy trì tiêu chuẩn 5 sao và phát triển bền vững, thân thiện với môi trường.
                        </p>
                    </div>
                    <div class="col-lg-6 order-lg-1" data-aos="fade-right" data-aos-delay="200">
                        <div class="ratio ratio-16x9 rounded-4 overflow-hidden shadow-lg">
                            <img src="https://images.unsplash.com/photo-1464757494038-157e877f60d4?w=800" alt="Tầm nhìn"
                                class="w-100 h-100 object-cover">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Phần 2: Giá trị cốt lõi -->
        <section class="py-5">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="display-5 fw-bold" data-aos="fade-up">GIÁ TRỊ CỐT LÕI</h2>
                    <p class="text-muted lead" data-aos="fade-up" data-aos-delay="100">
                        Những nguyên tắc định hình mọi hoạt động của AIHOTEL PRO
                    </p>
                </div>

                <div class="row g-4 justify-content-center">
                    <div class="col-md-6 col-lg-3" v-for="gt in giaTri" :key="gt.id" data-aos="fade-up"
                        :data-aos-delay="gt.delay">
                        <div class="text-center p-4">
                            <div class="icon-box mb-3 mx-auto">
                                <i :class="gt.icon" class="text-warning"></i>
                            </div>
                            <h5 class="fw-bold">{{ gt.tieuDe }}</h5>
                            <p class="text-muted small">{{ gt.moTa }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Phần 3: Đội ngũ -->
        <section class="py-5 bg-light">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="display-5 fw-bold" data-aos="fade-up">ĐỘI NGŨ LÃNH ĐẠO</h2>
                    <p class="text-muted lead" data-aos="fade-up" data-aos-delay="100">
                        Những con người tài năng đứng sau thành công của AIHOTEL PRO
                    </p>
                </div>

                <div class="row g-4 justify-content-center">
                    <div class="col-md-6 col-lg-4" v-for="nv in doiNgu" :key="nv.id" data-aos="fade-up"
                        :data-aos-delay="nv.delay">
                        <div class="text-center">
                            <img :src="nv.avatar" alt="Nhân viên" class="rounded-circle mb-3 shadow-sm"
                                style="width: 120px; height: 120px; object-fit: cover;">
                            <h6 class="fw-bold">{{ nv.ten }}</h6>
                            <p class="text-muted small">{{ nv.chucVu }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Phần 4: Thành tựu -->
        <section class="py-5">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="display-5 fw-bold" data-aos="fade-up">THÀNH TỰU NỔI BẬT</h2>
                </div>

                <div class="row g-4 text-center">
                    <div class="col-6 col-md-3" v-for="tt in thanhTuu" :key="tt.id" data-aos="zoom-in"
                        :data-aos-delay="tt.delay">
                        <h3 class="display-4 fw-bold text-warning mb-0">{{ tt.so }}</h3>
                        <p class="text-muted small text-uppercase">{{ tt.ten }}</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'GioiThieu',
    data() {
        return {
            giaTri: [
                { id: 1, icon: 'bx bx-heart', tieuDe: 'TẬN TÂM', moTa: 'Mỗi khách hàng là một người thân trong gia đình.', delay: 100 },
                { id: 2, icon: 'bx bx-star', tieuDe: 'CHẤT LƯỢNG', moTa: 'Tiêu chuẩn 5 sao trong từng chi tiết nhỏ nhất.', delay: 200 },
                { id: 3, icon: 'bx bx-leaf', tieuDe: 'BỀN VỮNG', moTa: 'Phát triển xanh, bảo vệ môi trường sống.', delay: 300 },
                { id: 4, icon: 'bx bx-group', tieuDe: 'ĐOÀN KẾT', moTa: 'Sức mạnh đến từ tinh thần đồng đội.', delay: 400 }
            ],
            doiNgu: [
                { id: 1, avatar: 'https://randomuser.me/api/portraits/men/32.jpg', ten: 'Nguyễn Văn A', chucVu: 'Giám đốc điều hành', delay: 100 },
                { id: 2, avatar: 'https://randomuser.me/api/portraits/women/44.jpg', ten: 'Trần Thị B', chucVu: 'Giám đốc dịch vụ', delay: 200 },
                { id: 3, avatar: 'https://randomuser.me/api/portraits/men/45.jpg', ten: 'Lê Văn C', chucVu: 'Trưởng phòng kỹ thuật', delay: 300 }
            ],
            thanhTuu: [
                { id: 1, so: '60+', ten: 'Phòng nghỉ', delay: 100 },
                { id: 2, so: '98%', ten: 'Khách hài lòng', delay: 200 },
                { id: 3, so: '10+', ten: 'Giải thưởng', delay: 300 },
                { id: 4, so: '24/7', ten: 'Hỗ trợ khách hàng', delay: 400 }
            ]
        }
    }
}
</script>

<style scoped>
/* Banner */
.hero-gioithieu {
    height: 70vh;
    min-height: 500px;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),
        url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600') center/cover no-repeat;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
}

/* Icon box */
.icon-box {
    width: 70px;
    height: 70px;
    background: rgba(255, 193, 7, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-box i {
    font-size: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-gioithieu h1 {
        font-size: 2.5rem !important;
    }
}

/* Đảm bảo font Poppins được áp dụng */
* {
    font-family: 'Poppins', sans-serif !important;
}
</style>