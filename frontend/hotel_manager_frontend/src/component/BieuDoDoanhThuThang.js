import React, { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function BieuDoDoanhThuThang() {

    const [doanhThu3Thang, setDoanhThu3Thang] = useState([])
    const [doanhThu6Thang, setDoanhThu6Thang] = useState([])
    const [doanhThu12Thang, setDoanhThu12Thang] = useState([])
    const [loaiTK, setLoaiTK] = useState('3 thang')

    const tienPhong = (hd) => {
        if (hd[0].loaiThue == 'Thuê theo giờ') {
            let gioDau = hd[1].gioDau
            let soGioThue = moment(hd[0].ngayTraPhong).diff(moment(hd[0].ngayNhanPhong), 'hours')
            let soGioTiepTheo = soGioThue - gioDau
            let tienGioDau = hd[1].giaGioDau
            if (soGioThue > gioDau) {
                let tienGioTiepTheo = soGioTiepTheo * hd[1].giaGioTiepTheo
                return tienGioDau + tienGioTiepTheo
            }
            else if (soGioThue = gioDau) {
                return tienGioDau
            }
        }
        else if (hd[0].loaiThue == 'Thuê theo ngày') {
            let soNgayThue = moment(hd[0].ngayTraPhong).diff(moment(hd[0].ngayNhanPhong), 'days')
            return soNgayThue * hd[1].giaTheoNgay
        }
        else if (hd[0].loaiThue == 'Thuê qua đêm') {
            return hd[1].giaQuaDem
        }
    }

    const layDoanhThu3Thang = async () => {
        try {
            let res = await axios.get('http://localhost:8080/orders/soNgay/90')
            let dshd = res.data
            let ngayLapHD = ''
            let tongTienPhong = 0
            let tongTienDV = 0
            let tongTien = 0
            let doanhThu3ThangTam = []
            for (let i = 0; i < dshd.length; i++) {
                if (ngayLapHD == '')
                    ngayLapHD = moment(dshd[i][0].ngayLapHD).format('YYYY-MM')
                if (moment(ngayLapHD).format('MM') != moment(dshd[i][0].ngayLapHD).format('MM')) {
                    tongTien = tongTienPhong + tongTienDV
                    doanhThu3ThangTam.push({
                        ngayLapHD: ngayLapHD,
                        tongTienPhong: tongTienPhong,
                        tongTienDV: tongTienDV,
                        tongTien: tongTien
                    })
                    ngayLapHD = moment(dshd[i][0].ngayLapHD).format('YYYY-MM')
                    tongTienPhong = 0
                    tongTienDV = 0
                    tongTien = 0
                }
                if (dshd.length - i == 1) {
                    tongTienPhong = tongTienPhong + tienPhong(dshd[i])
                    if (dshd[i][2] != null)
                        tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
                    tongTien = tongTienPhong + tongTienDV
                    doanhThu3ThangTam.push({
                        ngayLapHD: ngayLapHD,
                        tongTienPhong: tongTienPhong,
                        tongTienDV: tongTienDV,
                        tongTien: tongTien
                    })
                    setDoanhThu3Thang(doanhThu3ThangTam)
                }
                else {
                    tongTienPhong = tongTienPhong + tienPhong(dshd[i])
                    if (dshd[i][2] != null)
                        tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const layDoanhThu6Thang = async () => {
        try {
            let res = await axios.get('http://localhost:8080/orders/soNgay/180')
            let dshd = res.data
            let ngayLapHD = ''
            let tongTienPhong = 0
            let tongTienDV = 0
            let tongTien = 0
            let doanhThu6ThangTam = []
            for (let i = 0; i < dshd.length; i++) {
                if (ngayLapHD == '')
                    ngayLapHD = moment(dshd[i][0].ngayLapHD).format('YYYY-MM')
                if (moment(ngayLapHD).format('MM') != moment(dshd[i][0].ngayLapHD).format('MM')) {
                    tongTien = tongTienPhong + tongTienDV
                    doanhThu6ThangTam.push({
                        ngayLapHD: ngayLapHD,
                        tongTienPhong: tongTienPhong,
                        tongTienDV: tongTienDV,
                        tongTien: tongTien
                    })
                    ngayLapHD = moment(dshd[i][0].ngayLapHD).format('YYYY-MM')
                    tongTienPhong = 0
                    tongTienDV = 0
                    tongTien = 0
                }
                if (dshd.length - i == 1) {
                    tongTienPhong = tongTienPhong + tienPhong(dshd[i])
                    if (dshd[i][2] != null)
                        tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
                    tongTien = tongTienPhong + tongTienDV
                    doanhThu6ThangTam.push({
                        ngayLapHD: ngayLapHD,
                        tongTienPhong: tongTienPhong,
                        tongTienDV: tongTienDV,
                        tongTien: tongTien
                    })
                    setDoanhThu6Thang(doanhThu6ThangTam)
                }
                else {
                    tongTienPhong = tongTienPhong + tienPhong(dshd[i])
                    if (dshd[i][2] != null)
                        tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const layDoanhThu12Thang = async () => {
        try {
            let res = await axios.get('http://localhost:8080/orders/soNgay/365')
            let dshd = res.data
            let ngayLapHD = ''
            let tongTienPhong = 0
            let tongTienDV = 0
            let tongTien = 0
            let doanhThu12ThangTam = []
            for (let i = 0; i < dshd.length; i++) {
                if (ngayLapHD == '')
                    ngayLapHD = moment(dshd[i][0].ngayLapHD).format('YYYY-MM')
                if (moment(ngayLapHD).format('MM') != moment(dshd[i][0].ngayLapHD).format('MM')) {
                    tongTien = tongTienPhong + tongTienDV
                    doanhThu12ThangTam.push({
                        ngayLapHD: ngayLapHD,
                        tongTienPhong: tongTienPhong,
                        tongTienDV: tongTienDV,
                        tongTien: tongTien
                    })
                    ngayLapHD = moment(dshd[i][0].ngayLapHD).format('YYYY-MM')
                    tongTienPhong = 0
                    tongTienDV = 0
                    tongTien = 0
                }
                if (dshd.length - i == 1) {
                    tongTienPhong = tongTienPhong + tienPhong(dshd[i])
                    if (dshd[i][2] != null)
                        tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
                    tongTien = tongTienPhong + tongTienDV
                    doanhThu12ThangTam.push({
                        ngayLapHD: ngayLapHD,
                        tongTienPhong: tongTienPhong,
                        tongTienDV: tongTienDV,
                        tongTien: tongTien
                    })
                    setDoanhThu12Thang(doanhThu12ThangTam)
                }
                else {
                    tongTienPhong = tongTienPhong + tienPhong(dshd[i])
                    if (dshd[i][2] != null)
                        tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const thongKe3Thang = () => {
        setLoaiTK('3 thang')
    }

    const thongKe6Thang = () => {
        setLoaiTK('6 thang')
    }

    const thongKe12Thang = () => {
        setLoaiTK('12 thang')
    }

    useEffect(() => {
        if (loaiTK == '3 thang')
            layDoanhThu3Thang()
        else if (loaiTK == '6 thang')
            layDoanhThu6Thang()
        else if (loaiTK == '12 thang')
            layDoanhThu12Thang()
    }, [loaiTK])

    return (
        <div className="row" style={{ marginTop: '2%' }}>
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <a class="nav-link active" data-bs-toggle="pill" href="#bd_dt_3_thang" onClick={e => thongKe3Thang()}>3 tháng</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="pill" href="#bd_dt_6_thang" onClick={e => thongKe6Thang()}>6 tháng</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="pill" href="#bd_dt_12_thang" onClick={e => thongKe12Thang()}>12 tháng</a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane container active" id="bd_dt_3_thang">
                    <div className="container-fluid">
                        <div className="row" style={{ marginTop: '2%' }}>
                            <ResponsiveContainer width="100%" aspect={3}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={doanhThu3Thang}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="ngayLapHD" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="tongTienPhong" fill="#7aa3e5" name="Tổng tiền phòng" />
                                    <Bar dataKey="tongTienDV" fill="#a27ea8" name="Tổng tiền dịch vụ" />
                                    <Bar dataKey="tongTien" fill="#a8385d" name="Tổng tiền" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div class="tab-pane container" id="bd_dt_6_thang">
                    <div className="container-fluid">
                        <div className="row" style={{ marginTop: '2%' }}>
                            <ResponsiveContainer width="100%" aspect={3}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={doanhThu6Thang}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="ngayLapHD" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="tongTienPhong" fill="#7aa3e5" name="Tổng tiền phòng" />
                                    <Bar dataKey="tongTienDV" fill="#a27ea8" name="Tổng tiền dịch vụ" />
                                    <Bar dataKey="tongTien" fill="#a8385d" name="Tổng tiền" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div class="tab-pane container fade" id="bd_dt_12_thang">
                    <div className="container-fluid">
                        <div className="row" style={{ marginTop: '2%' }}>
                            <ResponsiveContainer width="100%" aspect={3}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={doanhThu12Thang}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="ngayLapHD" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="tongTienPhong" fill="#7aa3e5" name="Tổng tiền phòng" />
                                    <Bar dataKey="tongTienDV" fill="#a27ea8" name="Tổng tiền dịch vụ" />
                                    <Bar dataKey="tongTien" fill="#a8385d" name="Tổng tiền" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}