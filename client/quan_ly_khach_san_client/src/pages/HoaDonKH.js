import React, { useState, useRef, useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import axios from 'axios'
import Nav from '../component/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function HoaDonKH() {

    let maKH = localStorage.getItem('maTK')
    const [dsHD, setDSHD] = useState([])
    const [loaiThue, setLoaiThue] = useState(localStorage.getItem('loaiThue'))
    const [dsCTHDP, setDSCTHDP] = useState([])
    const [dsCTHDDV, setDSCTHDDV] = useState([])
    const [tongTien, setTongTien] = useState(0)
    const [hienModalCTHD, setHienModalCTHD] = useState(false)

    const dongModalCTHD = () => {
        localStorage.removeItem('tongTienTam')
        setDSCTHDP([])
        setDSCTHDDV([])
        setHienModalCTHD(false);
    }

    const moModalCTHD = () => setHienModalCTHD(true);

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

    const tinhTTTheoGio = (gioDau, giaGioDau, giaGioTiepTheo, ngayNhanPhong, ngayTraPhong) => {
        let soGioThue = tinhGioThue(ngayNhanPhong, ngayTraPhong, gioDau)
        let gioTiepTheo = soGioThue - gioDau
        if (soGioThue > gioDau) {
            let thanhTienGioDau = giaGioDau
            let thanhTienGioTiepTheo = gioTiepTheo * giaGioTiepTheo
            let thanhTien = thanhTienGioDau + thanhTienGioTiepTheo
            return thanhTien
        }
        else {
            let thanhTien = giaGioDau
            return thanhTien
        }
    }

    const tinhTTTheoNgay = (giaTheoNgay, ngayNhanPhong, ngayTraPhong) => {
        let soNgayThue = tinhNgayThue(ngayNhanPhong, ngayTraPhong)
        let thanhTien = soNgayThue * giaTheoNgay
        return thanhTien
    }

    const xemCTHD = async (maHD, loaiThue) => {

        setLoaiThue(loaiThue)
        let tongTienTam = 0

        try {
            let res1 = await axios.get('http://localhost:8080/room_order_details/' + maHD)
            let dscthdp = res1.data
            setDSCTHDP(dscthdp)
            for (let i = 0; i < dscthdp.length; i++) {
                if (loaiThue == 'Thuê theo giờ') {
                    let soGioThue = tinhGioThue(dscthdp[i].hoaDon.ngayNhanPhong, dscthdp[i].hoaDon.ngayTraPhong, dscthdp[i].gioDau)
                    let gioDau = dscthdp[i].gioDau
                    let gioTiepTheo = soGioThue - gioDau
                    if (soGioThue > gioDau) {
                        let thanhTienGioDau = dscthdp[i].giaGioDau
                        let thanhTienGioTiepTheo = gioTiepTheo * dscthdp[i].giaGioTiepTheo
                        let thanhTien = thanhTienGioDau + thanhTienGioTiepTheo
                        tongTienTam = tongTienTam + thanhTien
                    }
                    else {
                        let thanhTien = dscthdp[i].giaGioDau
                        tongTienTam = tongTienTam + thanhTien
                    }
                }
                else if (loaiThue == 'Thuê theo ngày') {
                    let soNgayThue = tinhNgayThue(dscthdp[i].hoaDon.ngayNhanPhong, dscthdp[i].hoaDon.ngayTraPhong)
                    let thanhTien = soNgayThue * dscthdp[i].giaTheoNgay
                    tongTienTam = tongTienTam + thanhTien
                }
            }
            let res2 = await axios.get('http://localhost:8080/service_order_details/' + maHD)
            let dsCTHDDV = res2.data
            setDSCTHDDV(dsCTHDDV)
            for (let i = 0; i < dsCTHDDV.length; i++) {
                tongTienTam = tongTienTam + (dsCTHDDV[i].soLuong * dsCTHDDV[i].donGia)
            }
            setTongTien(tongTienTam)
        } catch (error) {
            console.log(error.message)
        }

        moModalCTHD()
    }

    useEffect(() => {
        axios.get('http://localhost:8080/orders/' + maKH + '/Đã thanh toán')
            .then((res) => setDSHD(res.data))
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100, marginTop: '1%' }}>
                <table className="table table-hover">
                    <thead className="table-info">
                        <tr>
                            <th>Mã hoá đơn</th>
                            <th>Ngày lập hoá đơn</th>
                            <th>Ngày nhận phòng</th>
                            <th>Ngày trả phòng</th>
                            <th>Loại thuê</th>
                            <th>Nhân viên lập hoá đơn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsHD.map((hd) =>
                            <tr key={hd.maHD} onClick={e => xemCTHD(hd.maHD, hd.loaiThue)}>
                                <td>{hd.maHD}</td>
                                <td>{moment(hd.ngayLapHD).format('DD-MM-YYYY')}</td>
                                <td>{moment(hd.ngayNhanPhong).format('DD-MM-YYYY HH:mm')}</td>
                                <td>{moment(hd.ngayTraPhong).format('DD-MM-YYYY HH:mm')}</td>
                                <td>{hd.loaiThue}</td>
                                {hd.nhanVien != null ? <td>{hd.nhanVien.tenNV}</td> : <td></td>}
                            </tr>
                        )}
                    </tbody>
                </table>

                <Modal show={hienModalCTHD} onHide={dongModalCTHD} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>CHI TIẾT</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row" style={{ marginTop: '1%' }}>
                            <div className="row">
                                <h4>PHÒNG</h4>
                            </div>
                            <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100, marginTop: '1%' }}>
                                <table className="table table-hover">
                                    <thead className="table-info">
                                        <tr>
                                            <th>Mã phòng</th>
                                            {loaiThue == 'Thuê theo giờ' && <th>Giờ đầu</th>}
                                            {loaiThue == 'Thuê theo giờ' && <th>Giá giờ đầu</th>}
                                            {loaiThue == 'Thuê theo giờ' && <th>Giá giờ tiếp theo</th>}
                                            {loaiThue == 'Thuê theo giờ' && <th>Tổng giờ thuê</th>}
                                            {loaiThue == 'Thuê theo ngày' && <th>Giá theo ngày</th>}
                                            {loaiThue == 'Thuê theo ngày' && <th>Tổng ngày thuê</th>}
                                            {loaiThue == 'Thuê qua đêm' && <th>Giá qua đêm</th>}
                                            {loaiThue == 'Thuê qua đêm' && <th>Tổng đêm thuê</th>}
                                            <th>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dsCTHDP.map((cthdp, index) =>
                                            <tr key={index}>
                                                <td>{cthdp.phong.maPhong}</td>
                                                {loaiThue == 'Thuê theo giờ' && <td>{cthdp.gioDau}</td>}
                                                {loaiThue == 'Thuê theo giờ' && <td>{cthdp.giaGioDau.toLocaleString({ style: "currency", currency: "vnd" })}</td>}
                                                {loaiThue == 'Thuê theo giờ' && <td>{cthdp.giaGioTiepTheo.toLocaleString({ style: "currency", currency: "vnd" })}</td>}
                                                {loaiThue == 'Thuê theo giờ' && <td>{tinhGioThue(cthdp.hoaDon.ngayNhanPhong, cthdp.hoaDon.ngayTraPhong, cthdp.gioDau)}</td>}
                                                {loaiThue == 'Thuê theo ngày' && <td>{cthdp.giaTheoNgay.toLocaleString({ style: "currency", currency: "vnd" })}</td>}
                                                {loaiThue == 'Thuê theo ngày' && <td>{tinhNgayThue(cthdp.hoaDon.ngayNhanPhong, cthdp.hoaDon.ngayTraPhong)}</td>}
                                                {loaiThue == 'Thuê theo giờ' && <td className="thanh_tien">{tinhTTTheoGio(cthdp.gioDau, cthdp.giaGioDau, cthdp.giaGioTiepTheo, cthdp.hoaDon.ngayNhanPhong, cthdp.hoaDon.ngayTraPhong).toLocaleString({ style: "currency", currency: "vnd" })}</td>}
                                                {loaiThue == 'Thuê theo ngày' && <td className="thanh_tien">{tinhTTTheoNgay(cthdp.giaTheoNgay, cthdp.hoaDon.ngayNhanPhong, cthdp.hoaDon.ngayTraPhong).toLocaleString({ style: "currency", currency: "vnd" })}</td>}
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <h4>DỊCH VỤ</h4>
                            </div>
                            <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100, marginTop: '1%' }}>
                                <table className="table table-hover">
                                    <thead className="table-info">
                                        <tr>
                                            <th>Tên dịch vụ</th>
                                            <th>Giá dịch vụ</th>
                                            <th>Đơn vị</th>
                                            <th>Số lượng</th>
                                            <th>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dsCTHDDV.map((cthddv, index) =>
                                            <tr key={index}>
                                                <td>{cthddv.dichVu.tenDV}</td>
                                                <td>{cthddv.donGia.toLocaleString({ style: "currency", currency: "vnd" })}</td>
                                                <td>{cthddv.dichVu.donVi}</td>
                                                <td>{cthddv.soLuong}</td>
                                                <td>{(cthddv.soLuong * cthddv.donGia).toLocaleString({ style: "currency", currency: "vnd" })}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row" style={{ marginTop: '2%', textAlign: 'center' }}>
                                <h5>TỔNG TIỀN: {tongTien.toLocaleString({ style: "currency", currency: "vnd" })}</h5>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}