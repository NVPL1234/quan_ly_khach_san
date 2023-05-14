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
                    ngayLapHD = moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')
                tongTienPhong = tongTienPhong + tienPhong(dshd[i])
                if (dshd[i][2] != null)
                    tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
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
                    ngayLapHD = moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')
                if (ngayLapHD != moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')) {
                    tongTien = tongTienPhong + tongTienDV
                    doanhThu7NgayTam.push({
                        ngayLapHD: ngayLapHD,
                        tongTienPhong: tongTienPhong,
                        tongTienDV: tongTienDV,
                        tongTien: tongTien
                    })
                    ngayLapHD = moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')
                    tongTienPhong = 0
                    tongTienDV = 0
                    tongTien = 0
                }
                if (dshd.length - i == 1) {
                    console.log(tienPhong(dshd[i]));
                    tongTienPhong = tongTienPhong + tienPhong(dshd[i])
                    if (dshd[i][2] != null)
                        tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
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
                    console.log(tienPhong(dshd[i]));
                    tongTienPhong = tongTienPhong + tienPhong(dshd[i])
                    if (dshd[i][2] != null)
                        tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
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
                    ngayLapHD = moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')
                if (ngayLapHD != moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')) {
                    tongTien = tongTienPhong + tongTienDV
                    doanhThu30NgayTam.push({
                        ngayLapHD: ngayLapHD,
                        tongTienPhong: tongTienPhong,
                        tongTienDV: tongTienDV,
                        tongTien: tongTien
                    })
                    ngayLapHD = moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')
                    tongTienPhong = 0
                    tongTienDV = 0
                    tongTien = 0
                }
                if (dshd.length - i == 1) {
                    console.log(tienPhong(dshd[i]));
                    tongTienPhong = tongTienPhong + tienPhong(dshd[i])
                    if (dshd[i][2] != null)
                        tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
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
                    console.log(tienPhong(dshd[i]));
                    tongTienPhong = tongTienPhong + tienPhong(dshd[i])
                    if (dshd[i][2] != null)
                        tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
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