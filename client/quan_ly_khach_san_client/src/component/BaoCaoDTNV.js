import React, { useState, useRef, useEffect } from "react"
import moment from "moment";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export const BaoCaoDTNV = React.forwardRef((props, ref) => {

    let nv = props.nv
    let dshd = props.dshd
    const [doanhThu, setDoanhThu] = useState([])
    const [tongDoanhThu, setTongDoanhThu] = useState(0)
    let ngayDau = props.ngayDau
    let ngayCuoi = props.ngayCuoi

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

    const tinhTongDoanhThu = (doanhThu) => {
        let tongDoanhThu = 0
        for (let i = 0; i < doanhThu.length; i++) {
            tongDoanhThu = tongDoanhThu + doanhThu[i].tongTien
        }
        setTongDoanhThu(tongDoanhThu)
    }

    useEffect(() => {
        async function layDuLieu() {
            let maNV = 0
            let tenNV = ''
            let ngayLapHD = ''
            let tongTien = 0
            let doanhThuTam = []
            for (let i = 0; i < dshd.length; i++) {
                if (ngayLapHD == '') {
                    ngayLapHD = moment(dshd[i].ngayLapHD).format('DD-MM-YYYY')
                    maNV = dshd[i].nhanVien.maNV
                    tenNV = dshd[i].nhanVien.tenNV
                }
                if (ngayLapHD != moment(dshd[i].ngayLapHD).format('DD-MM-YYYY')) {
                    doanhThuTam.push({
                        maNV: maNV,
                        tenNV: tenNV,
                        ngayLapHD: ngayLapHD,
                        tongTien: tongTien
                    })
                    ngayLapHD = moment(dshd[i].ngayLapHD).format('DD-MM-YYYY')
                    maNV = dshd[i].nhanVien.maNV
                    tenNV = dshd[i].nhanVien.tenNV
                    tongTien = 0
                }
                if (dshd.length - i == 1) {
                    if (dshd[i].nhanVien.maNV == maNV) {
                        let res1 = await axios.get('http://localhost:8080/room_order_details/' + dshd[i].maHD)
                        let dscthdp = res1.data
                        for (let j = 0; j < dscthdp.length; j++)
                            tongTien = tongTien + tienPhong(dscthdp[j])
                        let res2 = await axios.get('http://localhost:8080/service_order_details/' + dshd[i].maHD)
                        let dscthddv = res2.data
                        for (let k = 0; k < dscthddv.length; k++)
                            tongTien = tongTien + (dscthddv[k].soLuong * dscthddv[k].donGia)
                    }
                    else {
                        doanhThuTam.push({
                            maNV: maNV,
                            tenNV: tenNV,
                            ngayLapHD: ngayLapHD,
                            tongTien: tongTien
                        })
                        maNV = dshd[i].nhanVien.maNV
                        tenNV = dshd[i].nhanVien.tenNV
                        tongTien = 0
                        let res1 = await axios.get('http://localhost:8080/room_order_details/' + dshd[i].maHD)
                        let dscthdp = res1.data
                        for (let j = 0; j < dscthdp.length; j++)
                            tongTien = tongTien + tienPhong(dscthdp[j])
                        let res2 = await axios.get('http://localhost:8080/service_order_details/' + dshd[i].maHD)
                        let dscthddv = res2.data
                        for (let k = 0; k < dscthddv.length; k++)
                            tongTien = tongTien + (dscthddv[k].soLuong * dscthddv[k].donGia)
                    }
                    doanhThuTam.push({
                        maNV: maNV,
                        tenNV: tenNV,
                        ngayLapHD: ngayLapHD,
                        tongTien: tongTien
                    })
                    tinhTongDoanhThu(doanhThuTam)
                    setDoanhThu(doanhThuTam)
                }
                else {
                    if (dshd[i].nhanVien.maNV == maNV) {
                        let res1 = await axios.get('http://localhost:8080/room_order_details/' + dshd[i].maHD)
                        let dscthdp = res1.data
                        for (let j = 0; j < dscthdp.length; j++)
                            tongTien = tongTien + tienPhong(dscthdp[j])
                        let res2 = await axios.get('http://localhost:8080/service_order_details/' + dshd[i].maHD)
                        let dscthddv = res2.data
                        for (let k = 0; k < dscthddv.length; k++)
                            tongTien = tongTien + (dscthddv[k].soLuong * dscthddv[k].donGia)
                    }
                    else {
                        doanhThuTam.push({
                            maNV: maNV,
                            tenNV: tenNV,
                            ngayLapHD: ngayLapHD,
                            tongTien: tongTien
                        })
                        maNV = dshd[i].nhanVien.maNV
                        tenNV = dshd[i].nhanVien.tenNV
                        tongTien = 0
                        let res1 = await axios.get('http://localhost:8080/room_order_details/' + dshd[i].maHD)
                        let dscthdp = res1.data
                        for (let j = 0; j < dscthdp.length; j++)
                            tongTien = tongTien + tienPhong(dscthdp[j])
                        let res2 = await axios.get('http://localhost:8080/service_order_details/' + dshd[i].maHD)
                        let dscthddv = res2.data
                        for (let k = 0; k < dscthddv.length; k++)
                            tongTien = tongTien + (dscthddv[k].soLuong * dscthddv[k].donGia)
                    }
                }
            }
        }
        layDuLieu()
    }, [dshd])

    return (
        <div ref={ref} className="container" id="xuat-bao-cao" hidden>
            <div className="row" style={{ textAlign: 'center', marginTop: '5%' }}>
                <h5>BÁO CÁO DOANH THU</h5>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <span>Ngày lập báo cáo: {moment().format('DD-MM-YYYY HH:mm:ss')}</span>
                <span>Người lập báo cáo: {nv.tenNV}</span>
                <span>Từ ngày: {moment(ngayDau).format('DD-MM-YYYY')} đến ngày: {moment(ngayCuoi).format('DD-MM-YYYY')}</span>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã nhân viên</th>
                            <th>Tên nhân viên</th>
                            <th>Ngày lập hoá đơn</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doanhThu.length > 0 && doanhThu.map((dt, i) =>
                            <tr key={i}>
                                <td>{dt.maNV}</td>
                                <td>{dt.tenNV}</td>
                                <td>{dt.ngayLapHD}</td>
                                <td>{dt.tongTien.toLocaleString({ style: "currency", currency: "vnd" })}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                {doanhThu.length > 0 && <h5>Tổng doanh thu: {tongDoanhThu.toLocaleString({ style: "currency", currency: "vnd" })}</h5>}
            </div>
        </div>
    )
});