<template>
    <div class="gioi-thieu-page" id="top">
      <!-- Banner Giới Thiệu -->
      <section class="hero-gioithieu position-relative overflow-hidden" data-aos="fade-zoom-in">
        <div class="hero-overlay"></div>
        <div class="container position-relative" style="z-index: 2;">
          <div class="row justify-content-center text-center py-5">
            <div class="col-lg-10">
              <h1 class="display-3 fw-bold text-white mb-4 text-shadow-lg playfair" data-aos="fade-up" data-aos-delay="200">
                CHÀO MỪNG ĐẾN VỚI <span class="text-gold">AIHOTEL PRO</span>
              </h1>
              <p class="fs-3 text-white opacity-95 lh-base" data-aos="fade-up" data-aos-delay="300">
                Nơi nghỉ dưỡng 5 sao – Nâng tầm trải nghiệm sống
              </p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Phần 1: Sứ mệnh & Tầm nhìn -->
      <section class="py-5 bg-light">
        <div class="container py-lg-5">
          <!-- SỨ MỆNH -->
          <div class="row g-5 align-items-center mb-5">
            <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
              <h2 class="display-4 fw-bold mb-4 playfair">Sứ Mệnh Của Chúng Tôi</h2>
              <p class="lead fs-4 lh-lg text-muted mb-4">
                Mang đến cho du khách những khoảnh khắc nghỉ dưỡng
                <span class="text-gold fw-bold">đẳng cấp, riêng tư và trọn vẹn</span>.
              </p>
              <p class="fs-5 text-muted lh-lg">
                Với tâm huyết xây dựng một không gian sống hoàn hảo, chúng tôi không chỉ cung cấp dịch vụ lưu trú,
                mà còn kiến tạo những
                <span class="text-gold fw-semibold">trải nghiệm đáng nhớ</span>,
                nơi mỗi chi tiết đều được chăm chút tỉ mỉ.
              </p>
            </div>
            <div class="col-lg-6" data-aos="fade-left" data-aos-delay="200">
              <div class="ratio ratio-16x9 rounded-4 overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" alt="Sứ mệnh"
                     class="w-100 h-100 object-cover">
              </div>
            </div>
          </div>
  
          <!-- TẦM NHÌN -->
          <div class="row g-5 align-items-center">
            <div class="col-lg-6 order-lg-2" data-aos="fade-left" data-aos-delay="100">
              <h2 class="display-4 fw-bold mb-4 playfair">Tầm Nhìn Đến 2030</h2>
              <p class="lead fs-4 lh-lg text-muted mb-4">
                Trở thành
                <span class="text-gold fw-bold">thương hiệu khách sạn hàng đầu Việt Nam</span>,
                được công nhận quốc tế về chất lượng và dịch vụ.
              </p>
              <p class="fs-5 text-muted lh-lg">
                Chúng tôi hướng tới việc mở rộng hệ thống lên
                <span class="text-gold fw-semibold">10 cơ sở</span> trên toàn quốc,
                đồng thời duy trì tiêu chuẩn 5 sao và phát triển bền vững, thân thiện với môi trường.
              </p>
            </div>
            <div class="col-lg-6 order-lg-1" data-aos="fade-right" data-aos-delay="200">
              <div class="ratio ratio-16x9 rounded-4 overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1464757494038-157e877f60d4?w=800" alt="Tầm nhìn"
                     class="w-100 h-100 object-cover">
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Phần 2: Giá trị cốt lõi -->
      <section class="py-5">
        <div class="container py-lg-5">
          <div class="text-center mb-5">
            <h2 class="display-4 fw-bold mb-4 playfair">Giá Trị Cốt Lõi</h2>
            <p class="lead fs-5 text-muted">
              Những nguyên tắc định hình mọi hoạt động của AIHOTEL PRO
            </p>
          </div>
  
          <div class="row g-5 justify-content-center">
            <div class="col-md-6 col-lg-3" v-for="gt in giaTri" :key="gt.id" data-aos="fade-up" :data-aos-delay="gt.delay">
              <div class="text-center p-5 rounded-4 bg-white shadow-lg h-100 d-flex flex-column align-items-center hover-lift">
                <div class="benefit-icon mb-4 bg-gold text-white rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                     style="width: 90px; height: 90px;">
                  <i :class="gt.icon" class="fs-2"></i>
                </div>
                <h5 class="fw-bold mt-3 playfair">{{ gt.tieuDe }}</h5>
                <p class="text-muted lh-lg px-3">{{ gt.moTa }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Phần 3: Đội ngũ -->
      <section class="py-5 bg-light">
        <div class="container py-lg-5">
          <div class="text-center mb-5">
            <h2 class="display-4 fw-bold mb-4 playfair">Đội Ngũ Lãnh Đạo</h2>
            <p class="lead fs-5 text-muted">
              Những con người tài năng đứng sau thành công của AIHOTEL PRO
            </p>
          </div>
  
          <div class="row g-5 justify-content-center">
            <div class="col-md-6 col-lg-4" v-for="nv in doiNgu" :key="nv.id" data-aos="fade-up" :data-aos-delay="nv.delay">
              <div class="text-center hover-lift">
                <img :src="nv.avatar" alt="Nhân viên" class="rounded-circle mb-4 shadow-2xl border border-4 border-white"
                     style="width: 180px; height: 180px; object-fit: cover;">
                <h5 class="fw-bold playfair">{{ nv.ten }}</h5>
                <p class="text-muted fs-5">{{ nv.chucVu }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Phần 4: Thành tựu -->
      <section class="py-5">
  <div class="container py-lg-5">
    <div class="text-center mb-5">
      <h2 class="display-4 fw-bold mb-4 playfair">Thành Tựu Nổi Bật</h2>
    </div>

    <!-- Dùng justify-content-md-center để căn giữa đẹp trên mọi màn hình -->
    <div class="row g-5 justify-content-center">
      <div class="col-6 col-md-3" v-for="tt in thanhTuu" :key="tt.id" data-aos="zoom-in" :data-aos-delay="tt.delay">
        <div class="p-5 rounded-4 bg-white shadow-lg hover-lift text-center h-100 d-flex flex-column justify-content-center">
          <h3 class="display-3 fw-bold text-gold mb-2 playfair">{{ tt.so }}</h3>
          <p class="text-muted text-uppercase tracking-wider fw-semibold mt-auto" style="letter-spacing: 3px;">
            {{ tt.ten }}
          </p>
        </div>
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
          { id: 1, icon: 'bx bxs-heart', tieuDe: 'TẬN TÂM', moTa: 'Mỗi khách hàng là một người thân trong gia đình.', delay: 100 },
          { id: 2, icon: 'bx bxs-star', tieuDe: 'CHẤT LƯỢNG', moTa: 'Tiêu chuẩn 5 sao trong từng chi tiết nhỏ nhất.', delay: 200 },
          { id: 3, icon: 'bx bxs-leaf', tieuDe: 'BỀN VỮNG', moTa: 'Phát triển xanh, bảo vệ môi trường sống.', delay: 300 },
          { id: 4, icon: 'bx bxs-group', tieuDe: 'ĐOÀN KẾT', moTa: 'Sức mạnh đến từ tinh thần đồng đội.', delay: 400 }
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
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');
  
  .gioi-thieu-page {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
  
  .playfair {
    font-family: 'Playfair Display', Georgia, serif !important;
  }
  
  /* Banner */
  .hero-gioithieu {
    height: 80vh;
    min-height: 600px;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)),
      url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600') center/cover no-repeat;
    display: flex;
    align-items: center;
  }
  
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.75), rgba(0,0,0,0.3));
  }
  
  .text-shadow-lg {
    text-shadow: 0 8px 30px rgba(0,0,0,0.7);
  }
  
  .text-gold {
    color: #DBAB57 !important;
  }
  
  .tracking-widest {
    letter-spacing: 8px;
  }
  
  .bg-gold {
    background: linear-gradient(135deg, #DBAB57, #e68a00) !important;
  }
  
  /* Hover nâng lên cho card */
  .hover-lift {
    transition: all 0.4s ease;
    border: 1px solid transparent;
  }
  
  .hover-lift:hover {
    transform: translateY(-15px);
    border-color: #DBAB57 !important;
    box-shadow: 0 25px 50px rgba(219,171,87,0.25);
  }
  
  /* Ảnh đội ngũ + thành tựu */
  .shadow-2xl {
    box-shadow: 0 25px 50px rgba(0,0,0,0.2);
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .hero-gioithieu {
      height: 70vh;
    }
    .display-3 {
      font-size: 3rem !important;
    }
  }
  </style>