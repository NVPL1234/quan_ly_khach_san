import React, { useEffect, useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { TiDeleteOutline } from 'react-icons/ti'
import axios from "axios";
import moment from 'moment'
import { GioHang } from "../Context";
import Nav from "../component/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function GioHangPage() {

    const { dispatch } = useContext(GioHang)
    const navigate = useNavigate();
    const [dsPhong, setDSPhong] = useState(JSON.parse(localStorage.getItem('dsPhong')))
    let loaiThue = localStorage.getItem('loaiThue')
    const [tongTien, setTongTien] = useState(0)

    const xoa = (phong) => {
        let dsPhongTam = dsPhong.filter((p) => phong.maPhong != p.maPhong)
        dispatch({ type: 'XOA', dsPhong: dsPhongTam })
        localStorage.setItem('dsPhong', JSON.stringify(dsPhongTam))
        setDSPhong(dsPhongTam)
        if (loaiThue == 'Thuê theo giờ') {
            let soGioThue = parseInt(localStorage.getItem('soGioThue'))
            if (soGioThue == 0)
                soGioThue = soGioThue + 1

            let gioDau = phong.gioDau
            let gioTiepTheo = soGioThue - gioDau
            if (soGioThue > gioDau) {
                let thanhTienGioDau = phong.giaGioDau
                let thanhTienGioTiepTheo = gioTiepTheo * phong.giaGioTiepTheo
                let thanhTien = thanhTienGioDau + thanhTienGioTiepTheo
                setTongTien(tongTien - (thanhTien * (50 / 100)))
            }
            else {
                let thanhTien = phong.giaGioDau
                setTongTien(tongTien - (thanhTien * (50 / 100)))
            }
        }
        else if (loaiThue == 'Thuê theo ngày') {
            let soNgayThue = parseInt(localStorage.getItem('soNgayThue'))
            let thanhTien = soNgayThue * phong.giaTheoNgay
            setTongTien(tongTien - (thanhTien * (50 / 100)))
        }
    }

    const datPhong = () => {
        navigate("/kh/form_dat_phong", {
            state: dsPhong
        });
    }

    useEffect(() => {
        let tongTienTam = 0
        if (dsPhong != null)
            for (let i = 0; i < dsPhong.length; i++) {
                if (loaiThue == 'Thuê theo giờ') {
                    let soGioThue = parseInt(localStorage.getItem('soGioThue'))
                    if (soGioThue == 0)
                        soGioThue = soGioThue + 1

                    let gioDau = dsPhong[i].gioDau
                    let gioTiepTheo = soGioThue - gioDau
                    if (soGioThue > gioDau) {
                        let thanhTienGioDau = dsPhong[i].giaGioDau
                        let thanhTienGioTiepTheo = gioTiepTheo * dsPhong[i].giaGioTiepTheo
                        let thanhTien = thanhTienGioDau + thanhTienGioTiepTheo
                        tongTienTam = tongTienTam + (thanhTien * (50 / 100))
                    }
                    else {
                        let thanhTien = dsPhong[i].giaGioDau
                        tongTienTam = tongTienTam + (thanhTien * (50 / 100))
                    }
                }
                else if (loaiThue == 'Thuê theo ngày') {
                    let soNgayThue = parseInt(localStorage.getItem('soNgayThue'))
                    let thanhTien = soNgayThue * dsPhong[i].giaTheoNgay
                    tongTienTam = tongTienTam + (thanhTien * (50 / 100))
                }
            }
        setTongTien(tongTienTam)
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div className="row" style={{ marginTop: '1%' }}>
                <table id="myTable" className="table table-hover">
                    <thead className="table-info">
                        <tr>
                            <th>Hình</th>
                            <th>Mã phòng</th>
                            <th>Loại phòng</th>
                            <th>Diện tích</th>
                            <th>Số giường</th>
                            {loaiThue == 'Thuê theo giờ' && <th>Giá giờ đầu</th>}
                            {loaiThue == 'Thuê theo giờ' && <th>Giá giờ tiếp theo</th>}
                            {loaiThue == 'Thuê theo ngày' && <th>Giá theo ngày</th>}
                            <th>Xoá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsPhong != null && dsPhong.map((phong) =>
                            <tr key={phong.maPhong}>
                                <td>{phong.duongDanHinh}</td>
                                <td>{phong.maPhong}</td>
                                <td>{phong.loaiPhong.ten}</td>
                                <td>{phong.dienTich}</td>
                                <td>{phong.soGiuong}</td>
                                {loaiThue == 'Thuê theo giờ' && <td>{phong.giaGioDau}</td>}
                                {loaiThue == 'Thuê theo giờ' && <td>{phong.giaGioTiepTheo}</td>}
                                {loaiThue == 'Thuê theo ngày' && <td>{phong.giaTheoNgay}</td>}
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={e => xoa(phong)}><TiDeleteOutline size={24} /></button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="row" style={{ marginTop: '1%' }}>
                <h5>Trả trước: {tongTien}đ</h5>
            </div>
            <div className="row" style={{ marginTop: '5%', marginLeft: '30%', marginRight: '30%' }}>
                {dsPhong != null && <input type="button" className="btn btn-primary" value="ĐẶT PHÒNG" onClick={datPhong} />}
            </div>
        </div>
    )
}