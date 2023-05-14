import React, { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function BieuDoDoanhThuTuyChinh() {

    const [ngayDau, setNgayDau] = useState('')
    const [ngayCuoi, setNgayCuoi] = useState('')
    const [doanhThu, setDoanhThu] = useState([])

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

    const layDoanhThuTuyChinh = async () => {
        try {
            let res = await axios.get('http://localhost:8080/orders/ngayDau/' + moment(ngayDau).format('YYYY-MM-DD HH:mm:ss') + '/ngayCuoi/' + moment(ngayCuoi).format('YYYY-MM-DD HH:mm:ss'))
            let dshd = res.data
            let ngayLapHD = ''
            let tongTienPhong = 0
            let tongTienDV = 0
            let tongTien = 0
            let doanhThuTam = []
            for (let i = 0; i < dshd.length; i++) {
                if (ngayLapHD == '')
                    ngayLapHD = moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')
                if (ngayLapHD != moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')) {
                    tongTien = tongTienPhong + tongTienDV
                    doanhThuTam.push({
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
                    tongTienPhong = tongTienPhong + tienPhong(dshd[i])
                    if (dshd[i][2] != null)
                        tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
                    tongTien = tongTienPhong + tongTienDV
                    doanhThuTam.push({
                        ngayLapHD: ngayLapHD,
                        tongTienPhong: tongTienPhong,
                        tongTienDV: tongTienDV,
                        tongTien: tongTien
                    })
                    setDoanhThu(doanhThuTam)
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

    const thongKe = () => {
        layDoanhThuTuyChinh()
    }

    return (
        <div className="row" style={{ marginTop: '2%' }}>
            <div className="row">
                <label htmlFor='ngay_dau' className="form-label col-2">Từ</label>
                <input type='datetime-local' className="form-control col" id='ngay_dau' value={ngayDau} onChange={e => setNgayDau(e.target.value)} />
                <label htmlFor='ngay_cuoi' className="form-label col-2">Đến</label>
                <input type='datetime-local' className="form-control col" id='ngay_cuoi' value={ngayCuoi} onChange={e => setNgayCuoi(e.target.value)} />
                <div className="row" style={{ marginTop: '2%' }}>
                    <input type="button" className="btn btn-primary col-2" value='THỐNG KÊ' onClick={thongKe} style={{ marginLeft: '41%' }} />
                </div>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <ResponsiveContainer width="100%" aspect={3}>
                    <BarChart
                        width={500}
                        height={300}
                        data={doanhThu}
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
    )
}