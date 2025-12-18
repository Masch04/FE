<template>
    <div class="row">
        <!-- FILTER DATE (Giữ nguyên) -->
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-5">
                            <label class="mb-2"><b>Từ Ngày</b></label>
                            <input type="date" class="form-control mb-2">
                        </div>
                        <div class="col-lg-5">
                            <label class="mb-2"><b>Đến Ngày</b></label>
                            <input type="date" class="form-control mb-2">
                        </div>
                        <div class="col-lg-2">
                            <label class="mb-2">&nbsp;</label>
                            <button class="mb-2 btn btn-primary w-100">Tìm Kiếm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header mt-2">
                    <h6><b>Danh Sách Hoá Đơn</b></h6>
                    <div class="input-group mt-3 w-100">
                        <input v-on:keyup.enter="timKiemNe()" v-model="tim_kiem.noi_dung_tim" type="text"
                            class="form-control search-control border border-3 border-secondary">
                        <span class="position-absolute top-50 translate-middle-y" style="left: 15px;">
                            <i class='bx bx-search'></i>
                        </span>
                        <button @click="timKiemNe()" class="btn btn-outline-secondary">Tìm Kiếm</button>
                    </div>
                </div>

                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Mã Hoá Đơn</th>
                                    <th>Khách Hàng</th>
                                    <th class="text-center">Ngày Đến</th>
                                    <th class="text-center">Ngày Đi</th>
                                    <th class="text-end">Tổng Tiền</th>
                                    <th class="text-center">Tình Trạng</th>
                                    <th class="text-center">Ngày Đặt</th>
                                    <th class="text-center">Chi Tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(hd, i) in list_hoa_don" :key="hd.id">
                                    <td class="text-center">{{ i + 1 }}</td>
                                    <td class="text-center fw-bold">{{ hd.ma_hoa_don }}</td>
                                    <td>{{ hd.ho_lot }} {{ hd.ten }}</td>
                                    <td class="text-center">{{ formatDateA(hd.ngay_den) }}</td>
                                    <td class="text-center">{{ formatDateA(hd.ngay_di) }}</td>
                                    <td class="text-end text-danger fw-bold">{{ formatVND(hd.tong_tien) }}</td>
                                    
                                    <!-- CỘT TÌNH TRẠNG - CHỈ CHO CLICK KHI CHƯA THANH TOÁN -->
                                    <td class="text-center">
                                        <div class="mb-2">
                                            <!-- Trường hợp đã xử lý rồi (Đã thanh toán hoặc Đã huỷ) → không cho click -->
                                            <span v-if="hd.is_thanh_toan == -1" class="badge bg-danger">
                                                Đã huỷ
                                            </span>
                                            <span v-else-if="hd.is_thanh_toan == 1" class="badge bg-success">
                                                Đã thanh toán
                                            </span>

                                            <!-- Chỉ khi CHƯA thanh toán (0) mới cho click mở modal -->
                                            <span v-else 
                                                class="badge bg-warning text-dark cursor-pointer"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#thanhToanModal"
                                                @click="moModalTrangThai(hd)">
                                                Chưa thanh toán
                                            </span>
                                        </div>
                                    </td>

                                    <td class="text-center">{{ formatDate(hd.created_at) }}</td>
                                    <td class="text-center">
                                        <button @click="chiTietThue(hd)" data-bs-toggle="modal"
                                            data-bs-target="#chiTietModal" class="btn btn-primary btn-sm">Chi Tiết</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- MODAL CHI TIẾT (GIỮ NGUYÊN) -->
                <div class="modal fade" id="chiTietModal" tabindex="-1">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header bg-primary text-white">
                                <h5 class="modal-title">Chi tiết hoá đơn #{{ chi_tiet.ma_hoa_don }}</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row mb-4 text-muted">
                                    <div class="col-md-6">
                                        <strong>Khách hàng:</strong> {{ chi_tiet.ho_lot }} {{ chi_tiet.ten }}
                                    </div>
                                    <div class="col-md-6 text-end">
                                        <strong>Thời gian ở:</strong> {{ formatDateA(chi_tiet.ngay_den) }} → {{ formatDateA(chi_tiet.ngay_di) }}
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
                                            <small v-for="dv in dich_vu" :key="dv.id" class="d-block text-success">
                                                • {{ dv.ten_dich_vu || 'Dịch vụ' }}: {{ formatVND(dv.thanh_tien || 0) }}
                                            </small>
                                        </td>
                                        <td class="text-end text-success fw-bold">+ {{ formatVND(tong_tien_dich_vu) }}</td>
                                    </tr>
                                    <tr class="table-danger">
                                        <td class="fw-bold fs-5">TỔNG CỘNG</td>
                                        <td class="text-end fw-bold fs-4 text-danger">{{ formatVND(chi_tiet.tong_tien) }}</td>
                                    </tr>
                                </table>
                                <details class="mt-4">
                                    <summary class="text-primary fw-bold cursor-pointer">
                                        Xem chi tiết phòng đã đặt ({{ chi_tiet_phong.length }} lượt thuê)
                                    </summary>
                                    <div class="table-responsive mt-3">
                                        <table class="table table-sm table-striped">
                                            <thead class="table-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Ngày thuê</th>
                                                    <th>Loại phòng</th>
                                                    <th>Tên phòng</th>
                                                    <th class="text-end">Giá</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(p, i) in chi_tiet_phong" :key="i">
                                                    <td>{{ i + 1 }}</td>
                                                    <td>{{ formatDateA(p.ngay_thue) }}</td>
                                                    <td>{{ p.ten_loai_phong }}</td>
                                                    <td class="fw-bold text-primary">{{ p.ten_phong || 'Chưa phân phòng' }}</td>
                                                    <td class="text-end">{{ formatVND(p.gia_thue) }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </details>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODAL CẬP NHẬT TRẠNG THÁI (GIỮ NGUYÊN) -->
                <div class="modal fade" id="thanhToanModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Cập nhật trạng thái hoá đơn</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <p>Đang xử lý hoá đơn: <b class="text-primary">{{ chi_tiet.ma_hoa_don }}</b></p>
                                
                                <div class="alert alert-light border">
                                    <label class="form-label fw-bold mb-3">Chọn trạng thái mới:</label>
                                    
                                    <div class="form-check mb-2">
                                        <input class="form-check-input" type="radio" name="trangthai" id="tt0" :value="0" v-model="trang_thai_update">
                                        <label class="form-check-label text-warning fw-bold cursor-pointer" for="tt0">
                                            Chưa thanh toán
                                        </label>
                                    </div>

                                    <div class="form-check mb-2">
                                        <input class="form-check-input" type="radio" name="trangthai" id="tt1" :value="1" v-model="trang_thai_update">
                                        <label class="form-check-label text-success fw-bold cursor-pointer" for="tt1">
                                            Đã thanh toán
                                        </label>
                                    </div>

                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="trangthai" id="tt_1" :value="-1" v-model="trang_thai_update">
                                        <label class="form-check-label text-danger fw-bold cursor-pointer" for="tt_1">
                                            Huỷ hoá đơn
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button @click="xacNhanCapNhat()" class="btn btn-primary" data-bs-dismiss="modal">Lưu thay đổi</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
import baseRequest from '../../../core/baseRequest';
import moment from 'moment';

const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            list_hoa_don: [],
            chi_tiet: {},
            chi_tiet_phong: [],
            dich_vu: [],
            tong_tien_phong: 0,
            tong_tien_dich_vu: 0,
            tim_kiem: {},
            trang_thai_update: 0
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            baseRequest.get("hoa-don/data")
                .then(res => this.list_hoa_don = res.data.data || [])
                .catch(() => toaster.error("Lỗi tải danh sách hoá đơn"));
        },

        timKiemNe() {
            baseRequest.post("hoa-don/tim-kiem", this.tim_kiem)
                .then(res => this.list_hoa_don = res.data.data || [])
                .catch(() => toaster.error("Tìm kiếm thất bại"));
        },

        async chiTietThue(hd) {
            this.chi_tiet = hd;
            try {
                const res = await baseRequest.get(`hoa-don/chi-tiet/${hd.id}`);
                this.chi_tiet_phong = res.data.phong || [];
                this.dich_vu = res.data.dich_vu || [];
                this.tong_tien_phong = res.data.tong_tien_phong || 0;
                this.tong_tien_dich_vu = res.data.tong_tien_dich_vu || 0;
            } catch (err) {
                console.error(err);
                toaster.error("Lỗi tải chi tiết hoá đơn");
            }
        },

        moModalTrangThai(hd) {
            this.chi_tiet = hd;
            this.trang_thai_update = parseInt(hd.is_thanh_toan); 
        },

        xacNhanCapNhat() {
            const payload = {
                id_hoa_don: this.chi_tiet.id,
                thanh_toan: parseInt(this.trang_thai_update)
            };
            
            baseRequest.post("hoa-don/xac-nhan-don-hang", payload)
                .then(res => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.loadData();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch(() => toaster.error("Lỗi server!"));
        },

        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number || 0);
        },
        formatDateA(date) { return moment(date).format("DD/MM/YYYY"); },
        formatDate(date) { return moment(date).format("DD/MM/YYYY HH:mm:ss"); }
    }
}
</script>

<style scoped>
.cursor-pointer { cursor: pointer; }
.text-danger { color: #dc3545 !important; }
.text-success { color: #28a745 !important; }
</style>