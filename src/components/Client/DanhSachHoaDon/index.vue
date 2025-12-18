<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-header mt-2">
                        <h6><b>Danh Sách Hoá Đơn</b></h6>
                        <div class="input-group mt-3 w-100">
                            <input v-on:keyup.enter="timKiemNe()" v-model="tim_kiem.noi_dung_tim" type="text"
                                class="form-control search-control border border-3 border-secondary">
                            <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px;"><i
                                    class="bx bx-search"></i></span>
                            <button v-on:click="timKiemNe()" class="btn btn-outline-secondary" type="button">Tìm
                                Kiếm</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th class="text-center">Mã Hoá Đơn</th>
                                        <th class="text-center">Tên Khách Hàng</th>
                                        <th class="text-center">Ngày Đến</th>
                                        <th class="text-center">Ngày Đi</th>
                                        <th class="text-center">Tổng Tiền</th>
                                        <th class="text-center">Tình Trạng</th>
                                        <th class="text-center">Ngày Đặt Phòng</th>
                                        <th class="text-center">Chi Tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(value, index) in list_hoa_don" :key="index">
                                        <th class="text-center align-middle">{{ index + 1 }}</th>
                                        <td class="text-center align-middle">{{ value.ma_hoa_don }}</td>
                                        <td class="align-middle">{{ value.ho_lot }} {{ value.ten }}</td>
                                        <td class="text-center align-middle">{{ formatDateA(value.ngay_den) }}</td>
                                        <td class="text-center align-middle">{{ formatDateA(value.ngay_di) }}</td>
                                        <td class="text-end align-middle text-danger fw-bold">{{
                                            formatVND(value.tong_tien) }}</td>
                                        <td class="text-center">
                                            <span v-if="value.is_thanh_toan == -1" class="badge bg-danger">Huỷ Đặt
                                                Phòng</span>
                                            <span v-else-if="value.is_thanh_toan == 0"
                                                class="badge bg-warning text-dark">Chưa Thanh Toán</span>
                                            <span v-else class="badge bg-success">Đã Thanh Toán</span>
                                        </td>
                                        <td class="text-center align-middle">{{ formatDate(value.created_at) }}</td>
                                        <td class="text-center">
                                            <button @click="chiTietThue(value)" data-bs-toggle="modal"
                                                data-bs-target="#chiTietModal" class="btn btn-primary btn-sm">Chi
                                                Tiết</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- MODAL CHI TIẾT -->
                    <div class="modal fade" id="chiTietModal" tabindex="-1">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header bg-primary text-white">
                                    <h5 class="modal-title">Chi tiết hoá đơn #{{ chi_tiet.ma_hoa_don }}</h5>
                                    <button type="button" class="btn-close btn-close-white"
                                        data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row mb-3 text-muted small">
                                        <div class="col-6">Khách hàng: <strong>{{ chi_tiet.ho_lot }} {{ chi_tiet.ten
                                                }}</strong></div>
                                        <div class="col-6 text-end">
                                            Ở từ <strong>{{ formatDateA(chi_tiet.ngay_den) }}</strong> đến <strong>{{
                                                formatDateA(chi_tiet.ngay_di) }}</strong>
                                        </div>
                                    </div>

                                    <table class="table table-bordered">
                                        <tr>
                                            <td><strong>Tiền phòng</strong></td>
                                            <td class="text-end fw-bold">{{ formatVND(tong_tien_phong) }}</td>
                                        </tr>
                                        <tr v-if="dich_vu.length > 0">
                                            <td>
                                                <strong>Dịch vụ bổ sung</strong><br>
                                                <small v-for="dv in dich_vu" :key="dv.ten_dich_vu"
                                                    class="d-block text-success">
                                                    • {{ dv.ten_dich_vu }}: {{ formatVND(dv.thanh_tien) }}
                                                </small>
                                            </td>
                                            <td class="text-end text-success fw-bold">+ {{ formatVND(tong_tien_dich_vu)
                                                }}</td>
                                        </tr>
                                        <tr class="table-danger">
                                            <td class="fw-bold fs-5">TỔNG CỘNG</td>
                                            <td class="text-end fw-bold fs-4 text-danger">{{
                                                formatVND(chi_tiet.tong_tien) }}</td>
                                        </tr>
                                    </table>

                                    <details class="mt-4">
                                        <summary class="fw-bold text-primary" style="cursor:pointer">
                                            Xem chi tiết phòng ({{ chi_tiet_thue.length }} lượt thuê)
                                        </summary>
                                        <div class="table-responsive mt-3">
                                            <table class="table table-sm table-striped">
                                                <thead class="table-light">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Ngày Thuê</th>
                                                        <th>Loại Phòng</th>
                                                        <th>Số Phòng</th>
                                                        <th class="text-end">Giá</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(value, index) in chi_tiet_thue" :key="index">
                                                        <td>{{ index + 1 }}</td>
                                                        <td>{{ formatDateA(value.ngay_thue) }}</td>
                                                        <td>{{ value.ten_loai_phong }}</td>
                                                        <td class="fw-bold">{{ value.ten_phong }}</td>
                                                        <td class="text-end">{{ formatVND(value.gia_thue) }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </details>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import moment from 'moment'

export default {
    data() {
        return {
            list_hoa_don: [],
            chi_tiet_thue: [],
            dich_vu: [],
            tong_tien_phong: 0,
            tong_tien_dich_vu: 0,
            chi_tiet: {},
            tim_kiem: {},
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        timKiemNe() {
            axios.post("http://127.0.0.1:8000/api/khach-hang/hoa-don/tim-kiem", this.tim_kiem, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem("token_khachhang") }
            }).then(res => this.list_hoa_don = res.data.data || []);
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number || 0);
        },
        formatDateA(ngay) { return moment(ngay).format("DD/MM/YYYY"); },
        formatDate(ngay) { return moment(ngay).format("DD/MM/YYYY HH:mm:ss"); },

        loadData() {
            axios.get("http://127.0.0.1:8000/api/khach-hang/hoa-don/data", {
                headers: { Authorization: 'Bearer ' + localStorage.getItem("token_khachhang") }
            }).then(res => this.list_hoa_don = res.data.data || []);
        },

        async chiTietThue(payload) {
            this.chi_tiet = payload;
            this.chi_tiet_thue = [];
            this.dich_vu = [];
            this.tong_tien_phong = 0;
            this.tong_tien_dich_vu = 0;

            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/hoa-don/chi-tiet/${payload.id}`, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem("token_khachhang") }
                });

                this.chi_tiet_thue = res.data.phong || [];
                this.tong_tien_phong = res.data.tong_tien_phong || 0;
                this.dich_vu = res.data.dich_vu || [];
                this.tong_tien_dich_vu = res.data.tong_tien_dich_vu || 0;

            } catch (err) {
                console.error(err);
                toaster.error("Lỗi tải chi tiết hoá đơn");
            }
        }
    },
}
</script>

<style scoped>
summary {
    list-style: none;
    cursor: pointer;
}

summary::before {
    content: "▶ ";
    margin-right: 8px;
}

details[open] summary::before {
    content: "▼ ";
}
</style>