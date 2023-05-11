import React, { useEffect, useContext } from "react"
import { Link, useLocation } from "react-router-dom";
import { GioHang } from "../Context";
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function ChiTietPhong() {

    let loaiThue = localStorage.getItem('loaiThue')
    const location = useLocation();
    let phong = location.state
    const { dsPhong, dispatch } = useContext(GioHang)

    const themVaoGioHang = (e, phong) => {
        e.target.disabled = 'true'
        dispatch({ type: 'THEM', phong: phong })
    }

    useEffect(() => {
        if(dsPhong.length > 0)
            localStorage.setItem('dsPhong', JSON.stringify(dsPhong))
    }, [dsPhong])

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div className="row" style={{ marginTop: '1%' }}>
                <div className="col-6">
                    <div className="row">
                        <img src={phong.duongDanHinh} alt="" style={{ borderRadius: 30 }} />
                    </div>
                </div>
                <div className="col">
                    <div className="row" style={{ fontSize: 22, fontWeight: 'normal', fontFamily: '"Times New Roman", Times, serif' }}>
                        <span>Loại phòng: {phong.loaiPhong.ten}</span>
                        <span>Diện tích: {phong.dienTich} m2</span>
                        <span>Số giường: {phong.soGiuong}</span>
                        <span>Tầng: {phong.tang.tenTang}</span>
                        <span>Mô tả: {phong.moTa}</span>
                        {loaiThue == 'Thuê theo giờ' && <span>Giá {phong.gioDau} giờ đầu: {phong.giaGioDau}đ</span>}
                        {loaiThue == 'Thuê theo giờ' && <span>Giá giờ tiếp theo: {phong.giaGioTiepTheo}đ</span>}
                        {loaiThue == 'Thuê theo ngày' && <span>Giá theo ngày: {phong.giaTheoNgay}đ</span>}
                    </div>
                    <div className="row">
                        <input type="button" className='btn btn-warning col' value='THÊM VÀO GIỎ HÀNG' onClick={e => themVaoGioHang(e, phong)} style={{ marginRight: '1%' }} />
                        <Link type="button" className='btn btn-success col' to='/kh/form_dat_phong' state={phong} style={{ marginRight: '1%' }}>ĐẶT PHÒNG</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}