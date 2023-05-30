import React, { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function BieuDoDoanhThuNgay() {

    const [doanhThuHomNay, setDoanhThuHomNay] = useState([])
    const [doanhThu7Ngay, setDoanhThu7Ngay] = useState([])
    const [doanhThu30Ngay, setDoanhThu30Ngay] = useState([])
    const [loaiTK, setLoaiTK] = useState('hom nay')

    const tinhGioThue = (ngayNhanPhong, ngayTraPhong, gioDau) => {
        let tongGioThue = moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'hours')
        if (tongGioThue == 0 || tongGioThue < gioDau)
            return gioDau
        else {
            let tongPhutThue = moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'minutes')
            let phutThue = tongGioThue * 60
            let phutLe = tongPhutThue - phutThue
            if (phutLe >= 30) {
                return tongGioThue + 1
            }
            else {
                return tongGioThue
            }
        }
    }

    const tinhNgayThue = (ngayNhanPhong, ngayTraPhong) => {
        let tongNgayThue = moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'days')
        if (tongNgayThue == 0)
            return 1
        else {
            let tongGioThue = moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'hours')
            let gioThue = tongNgayThue * 24
            let gioLe = tongGioThue - gioThue
            if (gioLe >= 12) {
                return tongNgayThue + 1
            }
            else {
                return tongNgayThue
            }
        }
    }

    const tienPhong = (cthdp) => {
        if (cthdp.hoaDon.loaiThue == 'Thuê theo giờ') {
            let gioDau = cthdp.gioDau
            let soGioThue = tinhGioThue(cthdp.hoaDon.ngayNhanPhong, cthdp.hoaDon.ngayTraPhong, cthdp.gioDau)
            let soGioTiepTheo = soGioThue - gioDau
            let tienGioDau = cthdp.giaGioDau
            if (soGioThue > gioDau) {
                let tienGioTiepTheo = soGioTiepTheo * cthdp.giaGioTiepTheo
                return tienGioDau + tienGioTiepTheo
            }
            else if (soGioThue = gioDau) {
                return tienGioDau
            }
        }
        else if (cthdp.hoaDon.loaiThue == 'Thuê theo ngày') {
            let soNgayThue = tinhNgayThue(cthdp.hoaDon.ngayNhanPhong, cthdp.hoaDon.ngayTraPhong)
            return soNgayThue * cthdp.giaTheoNgay
        }
    }

    const layDoanhThuHomNay = async () => {
        try {
            let res = await axios.get('http://localhost:8080/orders/soNgay/0')
            let dshd = res.data
            let ngayLapHD = ''
            let tongTienPhong = 0
            let tongTienDV = 0
            let tongTien = 0
            for (let i = 0; i < dshd.length; i++) {
                if (ngayLapHD == '')
                    ngayLapHD = moment(dshd[i].ngayLapHD).format('DD-MM-YYYY')
                if (dshd[i].trangThaiHD == 'Đã đặt' || dshd[i].trangThaiHD == 'Đã nhận')
                    tongTienPhong = tongTienPhong + dshd[i].tienCoc
                else {
                    let res1 = await axios.get('http://localhost:8080/room_order_details/' + dshd[i].maHD)
                    let dscthdp = res1.data
                    for (let j = 0; j < dscthdp.length; j++)
                        tongTienPhong = tongTienPhong + tienPhong(dscthdp[j])
                    let res2 = await axios.get('http://localhost:8080/service_order_details/' + dshd[i].maHD)
                    let dscthddv = res2.data
                    for (let k = 0; k < dscthddv.length; k++)
                        tongTienDV = tongTienDV + (dscthddv[k].soLuong * dscthddv[k].donGia)
                }
            }
            tongTien = tongTienPhong + tongTienDV
            setDoanhThuHomNay(doanhThuHomNay => [...doanhThuHomNay, {
                ngayLapHD: ngayLapHD,
                tongTienPhong: tongTienPhong,
                tongTienDV: tongTienDV,
                tongTien: tongTien
            }])
        } catch (error) {
            console.log(error.message);
        }
    }

    const layDoanhThu7Ngay = async () => {
        try {
            let res = await axios.get('http://localhost:8080/orders/soNgay/7')
            let dshd = res.data
            let ngayLapHD = ''
            let tongTienPhong = 0
            let tongTienDV = 0
            let tongTien = 0
            let doanhThu7NgayTam = []
            for (let i = 0; i < dshd.length; i++) {
                if (ngayLapHD == '')
                    ngayLapHD = moment(dshd[i].ngayLapHD).format('DD-MM-YYYY')
                if (ngayLapHD != moment(dshd[i].ngayLapHD).format('DD-MM-YYYY')) {
                    tongTien = tongTienPhong + tongTienDV
                    doanhThu7NgayTam.push({
                        ngayLapHD: ngayLapHD,
                        tongTienPhong: tongTienPhong,
                        tongTienDV: tongTienDV,
                        tongTien: tongTien
                    })
                    ngayLapHD = moment(dshd[i].ngayLapHD).format('DD-MM-YYYY')
                    tongTienPhong = 0
                    tongTienDV = 0
                    tongTien = 0
                }
                if (dshd.length - i == 1) {
                    let res1 = await axios.get('http://localhost:8080/room_order_details/' + dshd[i].maHD)
                    let dscthdp = res1.data
                    for (let j = 0; j < dscthdp.length; j++)
                        tongTienPhong = tongTienPhong + tienPhong(dscthdp[j])
                    let res2 = await axios.get('http://localhost:8080/service_order_details/' + dshd[i].maHD)
                    let dscthddv = res2.data
                    for (let k = 0; k < dscthddv.length; k++)
                        tongTienDV = tongTienDV + (dscthddv[k].soLuong * dscthddv[k].donGia)
                    tongTien = tongTienPhong + tongTienDV
                    doanhThu7NgayTam.push({
                        ngayLapHD: ngayLapHD,
                        tongTienPhong: tongTienPhong,
                        tongTienDV: tongTienDV,
                        tongTien: tongTien
                    })
                    setDoanhThu7Ngay(doanhThu7NgayTam)
                }
                else {
                    let res1 = await axios.get('http://localhost:8080/room_order_details/' + dshd[i].maHD)
                    let dscthdp = res1.data
                    for (let j = 0; j < dscthdp.length; j++)
                        tongTienPhong = tongTienPhong + tienPhong(dscthdp[j])
                    let res2 = await axios.get('http://localhost:8080/service_order_details/' + dshd[i].maHD)
                    let dscthddv = res2.data
                    for (let k = 0; k < dscthddv.length; k++)
                        tongTienDV = tongTienDV + (dscthddv[k].soLuong * dscthddv[k].donGia)
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const layDoanhThu30Ngay = async () => {
        try {
            let res = await axios.get('http://localhost:8080/orders/soNgay/30')
            let dshd = res.data
            let ngayLapHD = ''
            let tongTienPhong = 0
            let tongTienDV = 0
            let tongTien = 0
            let doanhThu30NgayTam = []
            for (let i = 0; i < dshd.length; i++) {
                if (ngayLapHD == '')
                    ngayLapHD = moment(dshd[i].ngayLapHD).format('DD-MM-YYYY')
                if (ngayLapHD != moment(dshd[i].ngayLapHD).format('DD-MM-YYYY')) {
                    tongTien = tongTienPhong + tongTienDV
                    doanhThu30NgayTam.push({
                        ngayLapHD: ngayLapHD,
                        tongTienPhong: tongTienPhong,
                        tongTienDV: tongTienDV,
                        tongTien: tongTien
                    })
                    ngayLapHD = moment(dshd[i].ngayLapHD).format('DD-MM-YYYY')
                    tongTienPhong = 0
                    tongTienDV = 0
                    tongTien = 0
                }
                if (dshd.length - i == 1) {
                    let res1 = await axios.get('http://localhost:8080/room_order_details/' + dshd[i].maHD)
                    let dscthdp = res1.data
                    for (let j = 0; j < dscthdp.length; j++)
                        tongTienPhong = tongTienPhong + tienPhong(dscthdp[j])
                    let res2 = await axios.get('http://localhost:8080/service_order_details/' + dshd[i].maHD)
                    let dscthddv = res2.data
                    for (let k = 0; k < dscthddv.length; k++)
                        tongTienDV = tongTienDV + (dscthddv[k].soLuong * dscthddv[k].donGia)
                    tongTien = tongTienPhong + tongTienDV
                    doanhThu30NgayTam.push({
                        ngayLapHD: ngayLapHD,
                        tongTienPhong: tongTienPhong,
                        tongTienDV: tongTienDV,
                        tongTien: tongTien
                    })
                    setDoanhThu30Ngay(doanhThu30NgayTam)
                }
                else {
                    let res1 = await axios.get('http://localhost:8080/room_order_details/' + dshd[i].maHD)
                    let dscthdp = res1.data
                    for (let j = 0; j < dscthdp.length; j++)
                        tongTienPhong = tongTienPhong + tienPhong(dscthdp[j])
                    let res2 = await axios.get('http://localhost:8080/service_order_details/' + dshd[i].maHD)
                    let dscthddv = res2.data
                    for (let k = 0; k < dscthddv.length; k++)
                        tongTienDV = tongTienDV + (dscthddv[k].soLuong * dscthddv[k].donGia)
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const thongKeHomNay = () => {
        setDoanhThuHomNay([])
        setLoaiTK('hom nay')
    }

    const thongKe7Ngay = () => {
        setLoaiTK('7 ngay')
    }

    const thongKe30Ngay = () => {
        setLoaiTK('30 ngay')
    }

    useEffect(() => {
        if (loaiTK == 'hom nay')
            layDoanhThuHomNay()
        else if (loaiTK == '7 ngay')
            layDoanhThu7Ngay()
        else if (loaiTK == '30 ngay')
            layDoanhThu30Ngay()
    }, [loaiTK])

    return (
        <div className="row" style={{ marginTop: '2%' }}>

            <ul class="nav nav-pills">
                <li class="nav-item">
                    <a class="nav-link active" data-bs-toggle="pill" href="#bd_dt_hom_nay" onClick={e => thongKeHomNay()}>Hôm nay</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="pill" href="#bd_dt_7_ngay" onClick={e => thongKe7Ngay()}>7 ngày</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="pill" href="#bd_dt_30_ngay" onClick={e => thongKe30Ngay()}>30 ngày</a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane container active" id="bd_dt_hom_nay">
                    <div className="container-fluid">
                        <div className="row" style={{ marginTop: '2%' }}>
                            <ResponsiveContainer width="100%" aspect={3}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={doanhThuHomNay}
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
                <div class="tab-pane container fade" id="bd_dt_7_ngay">
                    <div className="container-fluid">
                        <div className="row" style={{ marginTop: '2%' }}>
                            <ResponsiveContainer width="100%" aspect={3}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={doanhThu7Ngay}
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
                <div class="tab-pane container fade" id="bd_dt_30_ngay">
                    <div className="container-fluid">
                        <div className="row" style={{ marginTop: '2%' }}>
                            <ResponsiveContainer width="100%" aspect={3}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={doanhThu30Ngay}
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