<template>
    <header>
      <div class="topbar d-flex align-items-center">
        <nav class="navbar navbar-expand w-100">
          <!-- Logo chữ AIHOTEL bên trái -->
          <div class="d-flex align-items-center">
            <h4 class="logo-text mb-0">AIHOTEL</h4>
          </div>
  
          <!-- Nút menu mobile -->
          <div class="mobile-toggle-menu d-lg-none ms-auto me-3">
            <i class='bx bx-menu fs-3'></i>
          </div>
  
          <!-- User dropdown ở góc phải -->
          <div class="ms-auto d-flex align-items-center">
            <div class="user-box dropdown">
              <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                 role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg" 
                     class="user-img rounded-circle" alt="Admin">
                <div class="user-info ps-3 text-start">
                  <p class="user-name mb-0 fw-semibold">{{ ten_hien_thi }}</p>
                  <p class="designattion mb-0 text-muted small">Quản trị viên</p>
                </div>
              </a>
              <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0">
                <li>
                  <a class="dropdown-item d-flex align-items-center" @click="dangXuat()">
                    <i class='bx bx-log-out-circle me-2'></i><span>Đăng xuất</span>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item d-flex align-items-center" @click="dangXuatAll()">
                    <i class='bx bx-log-out-circle me-2'></i><span>Đăng xuất tất cả thiết bị</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  import axios from 'axios';
  import { createToaster } from "@meforma/vue-toaster";
  import baseRequest from '../../core/baseRequest';
  const toaster = createToaster({ position: "top-right" });
  
  export default {
    data() {
      return {
        ten_hien_thi: 'Chưa đăng nhập',
        avatar: 'Chưa đăng nhập',
      }
    },
    mounted() {
      this.checkLogin();
    },
    methods: {
      checkLogin() {
        baseRequest
          .post('kiem-tra-token-admin', {})
          .then((res) => {
            if (res.data.status) {
              this.ten_hien_thi = localStorage.getItem('ho_ten_admin') || 'Admin';
              this.avatar = localStorage.getItem('avatar_admin');
            }
          });
      },
      dangXuat() {
        baseRequest.get('admin/dang-xuat').then((res) => {
          toaster.success(res.data.message);
          this.$router.push('/admin/dang-nhap');
        });
      },
      dangXuatAll() {
        baseRequest.get('admin/dang-xuat-all').then((res) => {
          toaster.success(res.data.message);
          this.$router.push('/admin/dang-nhap');
        });
      }
    },
  }
  </script>
  
  <style scoped>
  /* Nền trắng + viền dưới nhẹ */
  .topbar {
    background: #ffffff !important;
    border-bottom: 1px solid #e9ecef;
    padding: 0 20px;
    height: 70px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  
  /* Logo chữ AIHOTEL */
  .logo-text {
    font-size: 28px;
    font-weight: 800;
    color: #DBAB57 !important;
    letter-spacing: 1px;
    font-family: 'Playfair Display', Georgia, serif;
  }
  
  /* Ảnh admin - kích thước vừa mắt, không viền */
  .user-img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  /* Ẩn hoàn toàn thanh tìm kiếm */
  .search-bar,
  .mobile-search-icon,
  .top-menu {
    display: none !important;
  }
  
  /* Dropdown menu đẹp */
  .dropdown-menu {
    border: none;
    border-radius: 12px;
    padding: 8px 0;
    min-width: 220px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }
  
  .dropdown-item {
    padding: 10px 20px;
    font-size: 15px;
    border-radius: 8px;
    margin: 0 8px;
  }
  
  .dropdown-item:hover {
    background: #f8f9fa;
    color: #DBAB57;
  }
  
  /* Responsive */
  @media (max-width: 991px) {
    .logo-text {
      font-size: 24px;
    }
    .user-info {
      display: none;
    }
    .user-img {
      width: 42px;
      height: 42px;
    }
  }
  </style>