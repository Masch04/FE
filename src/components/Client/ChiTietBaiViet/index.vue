<template>
  <div class="blog-detail-page">
    <!-- Hero Section - Ảnh lớn, overlay, tiêu đề trắng -->
    <header
      class="hero-header position-relative overflow-hidden"
      data-aos="fade"
      data-aos-duration="1000"
    >
      <div class="hero-bg">
        <img
          :src="bai_viet.hinh_anh"
          :alt="bai_viet.ten_bai_viet"
          class="hero-img"
        />
      </div>
      <div class="hero-overlay"></div>
      <div class="container position-relative">
        <div class="row justify-content-center">
          <div class="col-lg-10 col-xl-9 text-center text-md-start">
            <div class="hero-content">
              <h1 class="display-4 fw-bold text-white mb-4 lh-1">
                {{ bai_viet.ten_bai_viet || "Đang tải..." }}
              </h1>
              <p class="lead text-white opacity-90 mb-0">
                {{ bai_viet.mo_ta_ngan }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Nội dung chi tiết -->
    <section class="section-article py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="col-lg-9 col-xl-8"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <article class="article-card">
              <div
                class="article-body"
                v-if="bai_viet.mo_ta_chi_tiet"
                v-html="bai_viet.mo_ta_chi_tiet"
              ></div>
              <div v-else class="text-center py-5">
                <div class="spinner-border text-gold" role="status">
                  <span class="visually-hidden">Đang tải...</span>
                </div>
              </div>
            </article>

            <!-- Meta -->
            <footer class="article-footer mt-5 pt-4 border-top border-light">
              <small class="text-white fst-italic">
                <i class="bi bi-clock me-1"></i>
                Cập nhật: {{ formatDate(bai_viet.updated_at) || "Vừa xong" }}
              </small>
            </footer>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
  <script>
import baseRequest from "../../../core/baseRequest";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  props: ["id"],
  data() {
    return {
      bai_viet: {},
    };
  },
  mounted() {
    this.loadDataBaiViet();
  },
  beforeRouteUpdate(to, from, next) {
    this.loadDataBaiViet();
    next();
  },
  methods: {
    loadDataBaiViet() {
      baseRequest
        .get(`client/chi-tiet-bai-viet/` + this.id)
        .then((res) => {
          this.bai_viet = res.data.bai_viet;
        })
        .catch((err) => {
          toaster.error("Không tải được bài viết!");
          console.error(err);
        });
    },
    formatDate(dateString) {
      if (!dateString) return null;
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("vi-VN", options);
    },
  },
};
</script>
  
  <style scoped>
.blog-detail-page {
  background: #0a0a0a;
  color: #e0e0e0;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  line-height: 1.7;
  min-height: 100vh;
}

/* === HERO HEADER === */
.hero-header {
  height: 80vh;
  min-height: 500px;
  max-height: 750px;
  position: relative;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s ease;
}

.hero-header:hover .hero-img {
  transform: scale(1.05);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding-top: 15vh;
}

.hero-content h1 {
  font-weight: 800;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  letter-spacing: -0.5px;
}

.hero-content .lead {
  font-weight: 400;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.section-article {
  background: #0a0a0a;
  padding-top: 3rem;
  padding-bottom: 5rem;
}

.text-gold {
  color: #dbab57 !important;
}
.article-card {
  background: #ffffff;
  color: #1a1a1a;
  padding: 3rem;
  border-radius: 1.5rem;
  border: 1px solid #ffd70022;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 215, 0, 0.08);
  transition: all 0.4s ease;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 215, 0, 0.15);
  border-color: #ffd70044;
}

.article-body {
  font-size: 1.15rem;
  line-height: 1.9;
  color: #2c2c2c;
}

.article-body > *:first-child {
  margin-top: 0;
}

.article-body p {
  margin-bottom: 1.6rem;
  color: #333;
}

.article-body img {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  margin: 2rem 0;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  transition: transform 0.4s ease;
}

.article-body img:hover {
  transform: scale(1.02);
}

.article-body h1,
.article-body h2,
.article-body h3,
.article-body h4,
.article-body h5,
.article-body h6 {
  color: #1a1a1a;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.article-body h2 {
  font-size: 1.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ffd700;
  display: inline-block;
}

.article-body ul,
.article-body ol {
  padding-left: 1.8rem;
  margin-bottom: 1.6rem;
}

.article-body li {
  margin-bottom: 0.6rem;
  color: #444;
}

.article-body a {
  color: #d4a017;
  text-decoration: underline;
  font-weight: 600;
  transition: color 0.3s ease;
}

.article-body a:hover {
  color: #dbab57;
}

.article-body blockquote {
  border-left: 4px solid #ffd700;
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: #555;
  background: #f9f9f9;
  padding: 1.2rem 1.5rem;
  border-radius: 0.5rem;
}

/* === FOOTER === */
.article-footer {
  color: #888;
  font-size: 0.95rem;
}

/* === RESPONSIVE === */
@media (max-width: 992px) {
  .hero-content h1 {
    font-size: 2.8rem;
  }
  .hero-content {
    padding-top: 12vh;
  }
}

@media (max-width: 768px) {
  .hero-header {
    height: 65vh;
  }
  .hero-content h1 {
    font-size: 2.3rem;
  }
  .hero-content .lead {
    font-size: 1.1rem;
  }
  .article-card {
    padding: 2rem;
    border-radius: 1rem;
  }
  .article-body {
    font-size: 1.05rem;
  }
}

@media (max-width: 576px) {
  .hero-header {
    height: 55vh;
  }
  .hero-content h1 {
    font-size: 2rem;
  }
  .article-card {
    padding: 1.5rem;
  }
}
</style>