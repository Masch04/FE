<template>
    <div class="dat-phong-page py-5">
        <div class="container">
            <!-- FORM TÌM KIẾM -->
            <div class="card search-card mb-5 shadow-lg border-0 rounded-4" data-aos="fade-up">
                <div class="card-body p-4 p-lg-5">
                    <div class="row g-3 align-items-end">

                        <!-- Ngày Đến -->
                        <div class="col-md">
                            <label class="form-label fw-semibold text-dark">Ngày Đến</label>
                            <input v-bind:min="tt_dat_phong.min_ngay_den"
                                @change="capNhatNgayDiTuDong(); clearToaster('ngay_den')"
                                v-model="tt_dat_phong.ngay_den" type="date" class="form-control rounded-pill h-50px">
                        </div>

                        <!-- Ngày Đi -->
                        <div class="col-md">
                            <label class="form-label fw-semibold text-dark">Ngày Đi</label>
                            <input :min="minNgayDi" v-model="tt_dat_phong.ngay_di" type="date"
                                @change="clearToaster('ngay_di')" class="form-control rounded-pill h-50px">
                        </div>

                        <!-- Số Phòng (1-3) -->
                        <div class="col-md-auto">
                            <label class="form-label fw-semibold text-dark">Số Phòng</label>
                            <div class="d-inline-flex align-items-center border rounded-pill p-1 w-100 h-50px">
                                <button @click="giamSoPhong" class="btn btn-outline-secondary rounded-pill px-3 h-100"
                                    :disabled="tt_dat_phong.so_phong <= 1">
                                    -
                                </button>
                                <input v-model="tt_dat_phong.so_phong"
                                    class="form-control text-center border-0 mx-2 flex-grow-1" style="width: 50px;"
                                    readonly>
                                <button @click="tangSoPhong" class="btn btn-outline-secondary rounded-pill px-3 h-100"
                                    :disabled="tt_dat_phong.so_phong >= 3">
                                    +
                                </button>
                            </div>
                        </div>

                        <!-- Người Lớn (1-4) -->
                        <div class="col-md-auto">
                            <label class="form-label fw-semibold text-dark">Người Lớn</label>
                            <div class="d-inline-flex align-items-center border rounded-pill p-1 w-100 h-50px">
                                <button @click="giamNguoiLon" class="btn btn-outline-secondary rounded-pill px-3 h-100"
                                    :disabled="tt_dat_phong.nguoi_lon <= 1">
                                    -
                                </button>
                                <input v-model="tt_dat_phong.nguoi_lon"
                                    class="form-control text-center border-0 mx-2 flex-grow-1" style="width: 50px;"
                                    readonly>
                                <button @click="tangNguoiLon" class="btn btn-outline-secondary rounded-pill px-3 h-100"
                                    :disabled="tt_dat_phong.nguoi_lon >= 4">
                                    +
                                </button>
                            </div>
                        </div>

                        <!-- Trẻ Em (0-3) -->
                        <div class="col-md-auto">
                            <label class="form-label fw-semibold text-dark">Trẻ Em</label>
                            <div class="d-inline-flex align-items-center border rounded-pill p-1 w-100 h-50px">
                                <button @click="giamTreEm" class="btn btn-outline-secondary rounded-pill px-3 h-100"
                                    :disabled="tt_dat_phong.tre_em <= 0">
                                    -
                                </button>
                                <input v-model="tt_dat_phong.tre_em"
                                    class="form-control text-center border-0 mx-2 flex-grow-1" style="width: 50px;"
                                    readonly>
                                <button @click="tangTreEm" class="btn btn-outline-secondary rounded-pill px-3 h-100"
                                    :disabled="tt_dat_phong.tre_em >= 3">
                                    +
                                </button>
                            </div>
                        </div>

                        <!-- Nút Tìm Kiếm -->
                        <div class="col-md-auto">
                            <div class="d-flex flex-column h-100 justify-content-end">
                                <button @click="layDanhSachPhong()"
                                    class="btn btn-warning fw-bold text-uppercase shadow-sm px-4 py-2 w-100 rounded-pill h-50px">
                                    TÌM KIẾM
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TÓM TẮT ĐẶT PHÒNG -->
            <div class="card summary-card mb-5 shadow-sm border-0 rounded-4" data-aos="fade-up" data-aos-delay="100">
                <div class="card-body p-4">
                    <div class="row text-center">
                        <div class="col">
                            <p class="text-muted small mb-1">TỔNG PHÒNG</p>
                            <h5 :class="tt_dat_phong.so_phong > info.so_phong ? 'text-danger' : 'text-success'">
                                {{ info.so_phong }} / {{ tt_dat_phong.so_phong }}
                            </h5>
                        </div>
                        <div class="col">
                            <p class="text-muted small mb-1">NGƯỜI LỚN</p>
                            <h5 :class="tt_dat_phong.nguoi_lon > info.so_lon ? 'text-danger' : 'text-success'">
                                {{ info.so_lon }} / {{ tt_dat_phong.nguoi_lon }}
                            </h5>
                        </div>
                        <div class="col">
                            <p class="text-muted small mb-1">TRẺ EM</p>
                            <h5 :class="tt_dat_phong.tre_em > info.so_tre ? 'text-danger' : 'text-success'">
                                {{ info.so_tre }} / {{ tt_dat_phong.tre_em }}
                            </h5>
                        </div>
                        <div class="col">
                            <p class="text-muted small mb-1">TỔNG TIỀN</p>
                            <h5 class="text-warning fw-bold">{{ formatVND(info.so_tien) }}</h5>
                        </div>
                        <div class="col d-flex align-items-center justify-content-center">
                            <button @click="datPhong()" class="btn btn-primary px-4 py-2 fw-bold">
                                ĐẶT PHÒNG
                            </button>
                        </div>
                    </div>

                    <!-- DỊCH VỤ BỔ SUNG -->
                    <div v-if="ds_dich_vu.length > 0" class="mt-4 pt-3 border-top">
                        <p class="text-muted small mb-2 text-center">Dịch vụ bổ sung</p>
                        <div class="row g-2">
                            <div class="col-md-6" v-for="dv in ds_dich_vu" :key="dv.id">
                                <div
                                    class="form-check d-flex align-items-center justify-content-between bg-light rounded-3 p-2">
                                    <div class="form-check-label d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" v-model="dv.chon"
                                            @change="inLog()">
                                        <span class="small fw-medium">{{ dv.ten_dich_vu }}</span>
                                    </div>
                                    <span class="text-success small fw-bold">{{ formatVND(dv.gia) }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="tongTienDichVu > 0" class="text-end mt-2">
                            <small class="text-muted">Tiền dịch vụ: </small>
                            <strong class="text-success">{{ formatVND(tongTienDichVu) }}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DANH SÁCH PHÒNG -->
            <template v-for="(value, index) in ds_loai_phong" :key="index">
                <div class="card room-item mb-4 shadow-sm border-0 rounded-4 overflow-hidden" data-aos="fade-up"
                    :data-aos-delay="index * 100">
                    <div class="row g-0">
                        <!-- Ảnh + Checkbox -->
                        <div class="col-lg-4 position-relative">
                            <img :src="value.hinh_anh" class="w-100 room-img-fixed object-fit-cover" alt="">
                            <div class="position-absolute top-0 end-0 p-3">
                                <div class="form-check form-switch">
                                    <input v-model="value.chon_phong" @change="inLog()" class="form-check-input"
                                        type="checkbox" style="transform: scale(1.3);">
                                </div>
                            </div>
                        </div>

                        <!-- Nội dung -->
                        <div class="col-lg-8 d-flex align-items-center">
                            <div class="card-body p-4 w-100 room-content-overlay">
                                <div class="d-flex justify-content-between align-items-start mb-3">
                                    <h4 class="fw-bold text-dark mb-0">{{ value.ten_loai_phong }}</h4>
                                    <span class="badge bg-success fs-6">Còn {{ value.so_phong_trong }} phòng</span>
                                </div>

                                <!-- Tiện ích -->
                                <div class="row g-3 mb-4">
                                    <div class="col-sm-4">
                                        <p class="mb-1 text-dark"><i
                                                class="bx bx-expand text-warning me-2"></i><strong>{{
                                                    value.dien_tich }} m²</strong></p>
                                    </div>
                                    <div class="col-sm-4">
                                        <p class="mb-1 text-dark"><i class="bx bx-bed text-warning me-2"></i><strong>{{
                                            value.so_giuong }} giường</strong></p>
                                    </div>
                                    <div class="col-sm-4">
                                        <p class="mb-1 text-dark"><i class="bx bx-user text-warning me-2"></i><strong>{{
                                            value.so_nguoi_lon }} NL + {{ value.so_tre_em }} TE</strong></p>
                                    </div>
                                </div>

                                <!-- Bảng giá & số lượng -->
                                <div class="row align-items-center">
                                    <div class="col-md-8">
                                        <div class="bg-white p-3 rounded-3 shadow-sm">
                                            <div class="row text-center">
                                                <div class="col">
                                                    <p class="text-decoration-line-through small"
                                                        style="color:red!important; font-style:italic!important;">
                                                        3.666.667đ
                                                    </p>
                                                    <p class="fw-bold text-success fs-4 mb-0">
                                                        {{ formatVND(value.gia_trung_binh) }}
                                                        <small class="text-muted">/đêm</small>
                                                    </p>
                                                </div>
                                                <div class="col">
                                                    <p class="text-muted small mb-1">Lợi ích</p>
                                                    <ul class="list-unstyled small mb-0 text-success">
                                                        <li>Miễn phí ăn sáng</li>
                                                        <li>Wifi tốc độ cao</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-4 text-center">
                                        <div class="d-inline-flex align-items-center border rounded-pill p-1 bg-white">
                                            <button @click="tru(value)"
                                                class="btn btn-outline-secondary rounded-pill px-3">-</button>
                                            <input v-model="value.so_phong_dat"
                                                class="form-control text-center border-0 mx-2" style="width: 50px;"
                                                readonly>
                                            <button @click="cong(value)"
                                                class="btn btn-outline-secondary rounded-pill px-3">+</button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tiện ích mở rộng -->
                                <div class="mt-3">
                                    <a data-bs-toggle="collapse" :href="'#collapse' + value.id"
                                        class="text-warning small fw-semibold">
                                        Xem thêm tiện ích
                                    </a>
                                    <div class="collapse mt-2" :id="'collapse' + value.id">
                                        <div v-html="value.tien_ich" class="small text-dark"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Không có phòng -->
            <div v-if="ds_loai_phong.length === 0" class="text-center py-5" data-aos="fade-up">
                <i class="bx bx-home fs-1 text-muted mb-3"></i>
                <p class="text-muted lead">Không tìm thấy phòng nào phù hợp với yêu cầu của bạn.</p>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
import baseRequest from '../../../core/baseRequest';
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            tt_dat_phong: {
                ngay_den: '',
                ngay_di: '',
                so_phong: 1,
                nguoi_lon: 1,
                tre_em: 0,
                min_ngay_den: '',
                min_ngay_di: ''
            },
            ds_loai_phong: [],
            ds_dich_vu: [],
            info: { so_phong: 0, so_tre: 0, so_lon: 0, so_tien: 0 },
            is_login: 0,
            toasterIds: {
                ngay_den: null,
                ngay_di: null
            }
        }
    },
    computed: {
        minNgayDi() {
            if (this.tt_dat_phong.ngay_den) {
                const date = new Date(this.tt_dat_phong.ngay_den);
                date.setDate(date.getDate() + 1);
                return date.toISOString().split('T')[0];
            }
            const today = new Date();
            today.setDate(today.getDate() + 1);
            return today.toISOString().split('T')[0];
        },
        tongTienDichVu() {
            return this.ds_dich_vu
                .filter(dv => dv.chon)
                .reduce((sum, dv) => sum + parseInt(dv.gia), 0);
        }
    },
    watch: {
        'tt_dat_phong.ngay_di'(newVal) {
            if (newVal && newVal < this.minNgayDi) {
                this.tt_dat_phong.ngay_di = this.minNgayDi;
            }
        },
        'tt_dat_phong.ngay_den'(newVal) {
            if (newVal && this.tt_dat_phong.ngay_di < this.minNgayDi) {
                this.tt_dat_phong.ngay_di = this.minNgayDi;
            }
        }
    },
    mounted() {
        this.tt_dat_phong.ngay_den = this.$route.params.ngay_den || '';
        this.tt_dat_phong.ngay_di = this.$route.params.ngay_di || '';
        this.tt_dat_phong.so_phong = Math.min(3, Math.max(1, parseInt(this.$route.params.so_phong) || 1));
        this.tt_dat_phong.nguoi_lon = Math.min(4, Math.max(1, parseInt(this.$route.params.nguoi_lon) || 1));
        this.tt_dat_phong.tre_em = Math.min(3, Math.max(0, parseInt(this.$route.params.tre_em) || 0));

        this.getToday();
        this.kiemTraDangNhap();
    },
    methods: {

        clearToaster(field) {
            if (this.toasterIds[field]) {
                toaster.clear(this.toasterIds[field]);
                this.toasterIds[field] = null;
            }
        },

        tangSoPhong() {
            if (this.tt_dat_phong.so_phong < 3) this.tt_dat_phong.so_phong++;
        },
        giamSoPhong() {
            if (this.tt_dat_phong.so_phong > 1) this.tt_dat_phong.so_phong--;
        },
        tangNguoiLon() {
            if (this.tt_dat_phong.nguoi_lon < 4) this.tt_dat_phong.nguoi_lon++;
        },
        giamNguoiLon() {
            if (this.tt_dat_phong.nguoi_lon > 1) this.tt_dat_phong.nguoi_lon--;
        },
        tangTreEm() {
            if (this.tt_dat_phong.tre_em < 3) this.tt_dat_phong.tre_em++;
        },
        giamTreEm() {
            if (this.tt_dat_phong.tre_em > 0) this.tt_dat_phong.tre_em--;
        },

        capNhatNgayDiTuDong() {
            if (this.tt_dat_phong.ngay_di < this.minNgayDi) {
                this.tt_dat_phong.ngay_di = this.minNgayDi;
            }
        },

        datPhong() {
            if (this.is_login) {
                if (this.info.so_phong > 0) {
                    var payload = {
                        'tt_dat_phong': this.tt_dat_phong,
                        'tt_loai_phong': this.ds_loai_phong,
                        'ds_dich_vu': this.ds_dich_vu.filter(dv => dv.chon)
                    };
                    axios
                        .post("http://127.0.0.1:8000/api/khach-hang-dat-phong", payload, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem("token_khachhang")
                            }
                        })
                        .then((res) => {
                            if (res.data.status) {
                                toaster.success(res.data.message);
                                setTimeout(() => {
                                    location.reload();
                                }, 1500);
                            }
                        });
                } else {
                    toaster.warning("Bạn chưa chọn bất kỳ phòng nào");
                }
            } else {
                toaster.error("Bạn cần đăng nhập trước khi đặt phòng");
                this.$router.push('/khach-hang/dang-nhap');
            }
        },

        kiemTraDangNhap() {
            axios
                .get("http://127.0.0.1:8000/api/kiem-tra-token-khach-hang", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khachhang")
                    }
                })
                .then((res) => {
                    this.is_login = res.data.status;
                });
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
        },
        getToday() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            this.tt_dat_phong.min_ngay_di = today;
            this.tt_dat_phong.min_ngay_den = today;
        },
        doiNgayDen() {
            this.tt_dat_phong.min_ngay_di = this.tt_dat_phong.ngay_den;
            if (this.tt_dat_phong.ngay_di < this.tt_dat_phong.ngay_den) {
                this.tt_dat_phong.ngay_di = this.tt_dat_phong.ngay_den;
            }
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

            this.ds_loai_phong.forEach((value) => {
                if (value.chon_phong) {
                    this.info.so_phong += value.so_phong_dat;
                    this.info.so_tien += value.so_phong_dat * parseInt(value.gia_trung_binh_ko_format) * Difference_In_Days;
                    this.info.so_lon += value.so_phong_dat * value.so_nguoi_lon;
                    this.info.so_tre += value.so_phong_dat * value.so_tre_em;
                }
            });

            this.info.so_tien += this.tongTienDichVu;
        },
        tru(value) {
            value.so_phong_dat = Math.max(value.so_phong_dat - 1, 0);
            this.inLog();
        },
        cong(value) {
            value.so_phong_dat = Math.min(value.so_phong_dat + 1, value.so_phong_trong);
            this.inLog();
        },
        layDanhSachPhong() {
            this.clearToaster('ngay_den');
            this.clearToaster('ngay_di');

            let hasError = false;

            if (!this.tt_dat_phong.ngay_den) {
                this.toasterIds.ngay_den = toaster.warning("Bạn vui lòng chọn ngày đến");
                hasError = true;
            }
            if (!this.tt_dat_phong.ngay_di) {
                this.toasterIds.ngay_di = toaster.warning("Bạn vui lòng chọn ngày đi");
                hasError = true;
            }

            if (hasError) {
                return;
            }

            baseRequest
                .post('danh-sach-phong-dat', this.tt_dat_phong)
                .then((res) => {
                    this.ds_loai_phong = res.data.data;
                    this.ds_loai_phong.forEach((v) => {
                        v.so_phong_dat = 0;
                        v.chon_phong = false;
                    });

                    this.layDanhSachDichVu(); // GỌI API DỊCH VỤ
                    this.inLog();
                });
        },

        // HÀM LẤY DỊCH VỤ - ĐÃ SỬA HOÀN CHỈNH
       layDanhSachDichVu() {
    axios
        .get('http://127.0.0.1:8000/api/dich-vu')
        .then((res) => {
            if (res.data.status) {
                // SỬA CHỈ DÒNG NÀY
                this.ds_dich_vu = res.data.dich_vu.map(dv => ({
                    ...dv,
                    don_gia: parseInt(dv.don_gia) || 0
                }));
            } else {
                toaster.error(res.data.message || "Lỗi tải dữ liệu");
            }
        })
        .catch((err) => {
            console.error(err);
            toaster.error("Không kết nối được server");
        });
},
    },
}
</script>

<style scoped>
/* === TRANG ĐẶT PHÒNG === */
.dat-phong-page {
    background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.45)),
        url('https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg') center/cover no-repeat fixed;
    min-height: 100vh;
    color: #fff;
}

/* === FORM TÌM KIẾM - ĐỒNG NHẤT CHIỀU CAO === */
.h-50px {
    height: 50px !important;
}

.search-card .d-inline-flex {
    min-width: 140px;
    max-width: 160px;
    justify-content: space-between;
}

.search-card .btn-outline-secondary {
    width: 38px;
    height: 38px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.search-card .d-inline-flex input[readonly] {
    min-width: 50px;
    font-weight: 600;
    color: #333;
}

.search-card .btn-warning {
    min-width: 120px;
}

.search-card .form-control,
.search-card .btn {
    height: 50px;
}

/* === PHẦN NỘI DUNG PHÒNG === */
.room-content-overlay {
    background: rgba(255, 255, 255, 0.95) !important;
    border-radius: 1rem;
    backdrop-filter: blur(4px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.room-content-overlay h4,
.room-content-overlay p,
.room-content-overlay li,
.room-content-overlay a {
    color: #212529 !important;
    font-weight: 600 !important;
}

.room-content-overlay .bx {
    font-size: 1.1rem;
}

.room-content-overlay .d-inline-flex {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.summary-card {
    background: white;
    border-radius: 1rem;
}

.room-item {
    transition: all 0.4s ease;
    overflow: hidden;
}

.room-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1) !important;
}

/* === FIX ẢNH KHÔNG BỊ KÉO === */
.room-img-fixed {
    height: 260px;
    object-fit: cover;
}

@media (min-width: 992px) {
    .room-img-fixed {
        height: 100%;
        max-height: 300px;
    }
}

/* Responsive */
@media (max-width: 992px) {
    .search-card .col-md-auto {
        min-width: 140px;
    }
}

@media (max-width: 768px) {
    .search-card .row>div {
        margin-bottom: 1rem;
    }

    .search-card .col-md-auto.d-flex {
        justify-content: start;
    }

    .search-card .d-inline-flex {
        width: 100%;
        max-width: none;
    }

    .room-content-overlay {
        border-radius: 0.75rem;
    }
}
</style>