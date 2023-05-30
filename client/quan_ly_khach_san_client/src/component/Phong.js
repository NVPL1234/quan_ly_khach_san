import React, { useState, useEffect } from "react"
import { createSearchParams, useNavigate, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function Phong(props) {

    let loaiThue = localStorage.getItem('loaiThue')
    let dsPhong2 = props.dsPhong
    const [tongTien, setTongTien] = useState(0)
    const [dsPhongDat, setDSPhongDat] = useState([])

    const tinhTongTien = (e, phong) => {
        if (e.target.checked) {
            setDSPhongDat(phongDat => [...phongDat, phong])
            if (loaiThue == 'Thuê theo giờ') {
                let soGioThue = localStorage.getItem('soGioThue')
                let gioDau = phong.gioDau
                let gioTiepTheo = soGioThue - gioDau
                if (soGioThue > gioDau) {
                    let thanhTienGioDau = phong.giaGioDau
                    let thanhTienGioTiepTheo = gioTiepTheo * phong.giaGioTiepTheo
                    let thanhTien = thanhTienGioDau + thanhTienGioTiepTheo
                    setTongTien(tongTien + thanhTien)
                }
                else {
                    let thanhTien = phong.giaGioDau
                    setTongTien(tongTien + thanhTien)
                }
            }
            else if (loaiThue == 'Thuê theo ngày') {
                let soNgayThue = localStorage.getItem('soNgayThue')
                let thanhTien = soNgayThue * phong.giaTheoNgay
                setTongTien(tongTien + thanhTien)
            }
        }
        else {
            let dsPhongDatTam = dsPhongDat.filter(phongDat => phongDat.maPhong != phong.maPhong)
            setDSPhongDat(dsPhongDatTam)
            if (loaiThue == 'Thuê theo giờ') {
                let soGioThue = localStorage.getItem('soGioThue')
                let gioDau = phong.gioDau
                let gioTiepTheo = soGioThue - gioDau
                if (soGioThue > gioDau) {
                    let thanhTienGioDau = phong.giaGioDau
                    let thanhTienGioTiepTheo = gioTiepTheo * phong.giaGioTiepTheo
                    let thanhTien = thanhTienGioDau + thanhTienGioTiepTheo
                    setTongTien(tongTien - thanhTien)
                }
                else {
                    let thanhTien = phong.giaGioDau
                    setTongTien(tongTien - thanhTien)
                }
            }
            else if (loaiThue == 'Thuê theo ngày') {
                let soNgayThue = localStorage.getItem('soNgayThue')
                let thanhTien = soNgayThue * phong.giaTheoNgay
                setTongTien(tongTien - thanhTien)
            }
        }
    }

    return (
        <div>
            {dsPhong2.map((phong) =>
                <div className="col-12" key={phong.maPhong} style={{ marginTop: '1%', padding: '1%' }}>
                    <div className="row" style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#f5f0f5', borderRadius: 20, padding: '1%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <div className="col" style={{ marginLeft: '1%' }}>
                            <img src={phong.duongDanHinh} alt="" style={{ borderRadius: 30 }} width='100%'/>
                        </div>
                        <div className="col" style={{ marginLeft: '1%', fontSize: 22, fontWeight: 'normal', fontFamily: '"Times New Roman", Times, serif' }}>
                            <span className="row">Loại phòng: {phong.loaiPhong.ten}</span>
                            <span className="row">Diện tích: {phong.dienTich} m2</span>
                            <span className="row">Số giường: {phong.soGiuong} giường</span>
                            {loaiThue == 'Thuê theo giờ' && <span className="row">Giá {phong.gioDau} giờ đầu: {phong.giaGioDau.toLocaleString({ style: "currency", currency: "vnd" })}đ/{phong.gioDau}giờ</span>}
                            {loaiThue == 'Thuê theo giờ' && <span className="row">Giá giờ tiếp theo: {phong.giaGioTiepTheo.toLocaleString({ style: "currency", currency: "vnd" })}đ/giờ</span>}
                            {loaiThue == 'Thuê theo ngày' && <span className="row">Giá theo ngày: {phong.giaTheoNgay.toLocaleString({ style: "currency", currency: "vnd" })}đ/ngày</span>}
                        </div>

                        <div className="col-2">
                            <div style={{ marginLeft: '90%' }}>
                                <input type="checkbox" className='form-check-input' value={phong.maPhong} onChange={e => tinhTongTien(e, phong)} />
                            </div>
                            <div className="row" style={{ marginTop: '20%' }}>
                                <Link type="button" className='btn btn-success' to='/kh/form_dat_phong' state={phong}>ĐẶT PHÒNG</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="row fixed-bottom" style={{ backgroundColor: '#E4E8E8', padding: '0.5%' }}>
                <div className="col" style={{ marginLeft: '30%' }}>
                    <h5>TỔNG TIỀN: {tongTien.toLocaleString({ style: "currency", currency: "vnd" })}đ</h5>
                </div>
                <div className="col">
                    <Link type="button" to='/kh/form_dat_phong' state={dsPhongDat} className="btn btn-success">ĐẶT PHÒNG</Link>
                </div>
            </div>
        </div>
    )
}