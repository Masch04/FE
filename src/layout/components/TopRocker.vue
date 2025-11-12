<template>
    <header>
        <div class="topbar d-flex align-items-center">
            <nav class="navbar navbar-expand">
                <div class="topbar-logo-header">
                    <div class="">
                        <img src="https://i.pinimg.com/736x/cc/55/23/cc55235082b0cbee0f53587c11278fb2.jpg" class="logo-icon" alt="logo icon">
                    </div>
                    <div class="">
                        <h4 class="logo-text">Hotel</h4>
                    </div>
                </div>
                <div class="mobile-toggle-menu"><i class='bx bx-menu'></i></div>
                <div class="search-bar flex-grow-1">
                    <div class="position-relative search-bar-box">
                        <input type="text" class="form-control search-control" placeholder="Type to search..."> <span
                            class="position-absolute top-50 search-show translate-middle-y"><i
                                class='bx bx-search'></i></span>
                        <span class="position-absolute top-50 search-close translate-middle-y"><i
                                class='bx bx-x'></i></span>
                    </div>
                </div>
                <div class="top-menu ms-auto">
                    <ul class="navbar-nav align-items-center">
                        <li class="nav-item mobile-search-icon">
                            <a class="nav-link" href="#"> <i class='bx bx-search'></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="user-box dropdown">
                    <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img v-bind:src="avatar" class="user-img" alt="user avatar">
                        <div class="user-info ps-3">
                            <p class="user-name mb-0">{{ ten_hien_thi }}</p>
                            <p class="designattion mb-0">Admin</p>
                        </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a v-on:click="dangXuat()" class="dropdown-item"><i
                                    class='bx bx-log-out-circle'></i><span>Đăng Xuất</span></a>
                        </li>
                        <li><a v-on:click="dangXuatAll()" class="dropdown-item"><i
                                    class='bx bx-log-out-circle'></i><span>Đăng Xuất Tất Cả</span></a>
                        </li>
                    </ul>
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
                        this.ten_hien_thi = localStorage.getItem('ho_ten_admin');
                        this.avatar = localStorage.getItem('avatar_admin');
                    }
                });
        },
        dangXuat() {
            baseRequest
                .get('admin/dang-xuat')
                .then((res) => {
                    toaster.success(res.data.message);
                    this.$router.push('/admin/dang-nhap');
                })
        },
        dangXuatAll() {
            baseRequest
                .get('admin/dang-xuat-all')
                .then((res) => {
                    toaster.success(res.data.message);
                    this.$router.push('/admin/dang-nhap');
                })
        }
    },
}
</script>
<style></style>