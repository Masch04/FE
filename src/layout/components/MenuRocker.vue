<template>
    <div class="nav-container primary-menu">
      <div class="mobile-topbar-header">
        <div>
          <img src="../../assets/images/logo-icon.png" class="logo-icon" alt="logo icon">
        </div>
        <div>
          <h4 class="logo-text">Rukada</h4>
        </div>
        <div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i></div>
      </div>
  
      <nav class="navbar navbar-expand-xl w-100">
        <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
  
          <!-- Loại Phòng -->
          <li class="nav-item">
            <router-link to="/admin/loai-phong" class="nav-link">
              <div class="menu-title text-nowrap">Loại Phòng</div>
            </router-link>
          </li>
  
          <!-- Dịch Vụ -->
          <li class="nav-item">
            <router-link to="/admin/dich-vu" class="nav-link">
              <div class="menu-title text-nowrap">Dịch Vụ</div>
            </router-link>
          </li>
  
          <!-- Quản Lý Phòng -->
          <li class="nav-item dropdown">
            <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
              <div class="menu-title text-nowrap">Quản Lý Phòng</div>
            </a>
            <ul class="dropdown-menu">
              <li><router-link to="/admin/chi-tiet-thue-phong" class="dropdown-item">Chi tiết thuê phòng</router-link></li>
              <li><router-link to="/admin/tinh-trang-phong" class="dropdown-item">Tình trạng phòng</router-link></li>
            </ul>
          </li>
  
          <!-- Quản Lý Người Dùng -->
          <li class="nav-item dropdown">
            <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
              <div class="menu-title">Quản Lý Người Dùng</div>
            </a>
            <ul class="dropdown-menu">
              <li><router-link to="/admin/nhan-vien" class="dropdown-item">Quản Lý Nhân Viên</router-link></li>
              <li><router-link to="/admin/khach-hang" class="dropdown-item">Quản Lý Khách Hàng</router-link></li>
              <li><router-link to="/admin/phan-quyen" class="dropdown-item">Quản Lý Phân Quyền</router-link></li>
            </ul>
          </li>
  
          <!-- Quản Lý HomePage -->
          <li class="nav-item dropdown">
            <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
              <div class="menu-title">Quản Lý HomePage</div>
            </a>
            <ul class="dropdown-menu">
              <li><router-link to="/admin/slide" class="dropdown-item">Quản Lý Slide</router-link></li>
              <li><router-link to="/admin/review" class="dropdown-item">Quản Lý Review</router-link></li>
              <li><router-link to="/admin/chuyen-muc" class="dropdown-item">Quản Lý Chuyên Mục</router-link></li>
              <li><router-link to="/admin/bai-viet" class="dropdown-item">Quản Lý Bài Viết</router-link></li>
            </ul>
          </li>
  
          <!-- Danh Sách Hóa Đơn -->
          <li class="nav-item">
            <router-link to="/admin/danh-sach-hoa-don" class="nav-link">
              <div class="menu-title text-nowrap">Danh Sách Hóa Đơn</div>
            </router-link>
          </li>
  
          <!-- Thống Kê -->
          <li class="nav-item dropdown">
            <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
              <div class="menu-title text-nowrap">Thống Kê</div>
            </a>
            <ul class="dropdown-menu">
              <li><router-link to="/admin/thong-ke-1" class="dropdown-item">Thống Kê Doanh Thu</router-link></li>
              <li><router-link to="/admin/thong-ke-2" class="dropdown-item">Thống Kê Số Lượng Phòng</router-link></li>
              <li><router-link to="/admin/thong-ke-3" class="dropdown-item">Thống Kê Tổng Tiền Khách Thanh Toán</router-link></li>
              <li><router-link to="/admin/thong-ke-4" class="dropdown-item">Thống Kê Số Phòng Thuê Của Khách</router-link></li>
            </ul>
          </li>
  
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style scoped>
  /* Bỏ hoàn toàn icon (không có .parent-icon nữa) */
  .parent-icon {
    display: none !important;
  }
  
  /* Bỏ gạch xanh (active indicator) dưới menu */
  .navbar-nav .nav-link::after,
  .navbar-nav .dropdown-toggle::after {
    display: none !important;
  }
  
  /* Căn giữa chữ trong menu */
  .nav-link {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }
  
  /* Hover nhẹ cho menu */
  .nav-link:hover,
  .dropdown-item:hover {
    background-color: rgba(219, 171, 87, 0.1) !important;
    color: #DBAB57 !important;
  }
  
  /* Active menu (khi đang ở trang đó) */
  .router-link-active {
    background-color: rgba(219, 171, 87, 0.15) !important;
    color: #DBAB57 !important;
    font-weight: 600;
  }
  
  /* Dropdown menu đẹp hơn */
  .dropdown-menu {
    border: none;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border-radius: 12px;
  }
  
  .dropdown-item {
    padding: 10px 20px;
    border-radius: 8px;
    margin: 4px 8px;
  }
  
  /* Mobile menu vẫn hoạt động bình thường */
  .mobile-topbar-header {
    background: #1a1a1a;
    color: white;
  }
  </style>