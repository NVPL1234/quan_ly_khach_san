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
    const [soGioThue, setSoGioThue] = useState(0)
    const [soNgayThue, setSoNgayThue] = useState(0)
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

    const tinhTTTheoGio = (soGioThue, gioDau, giaGioDau, giaGioTiepTheo) => {
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

    const tinhTTTheoNgay = (soNgayThue, giaTheoNgay) => {
        let thanhTien = soNgayThue * giaTheoNgay
        return thanhTien
    }   

    const xemCTHD = async (maHD, ngayNhanPhong, ngayTraPhong, loaiThue) => {

        setLoaiThue(loaiThue)
        let soGioThue = moment(ngayTraPhong).diff(ngayNhanPhong, 'hours')
        let soNgayThue = moment(ngayTraPhong).diff(ngayNhanPhong, 'days')
        let tongTienTam = 0

        if (loaiThue == 'Thuê theo giờ') {
            setSoGioThue(soGioThue)
        }
        else if (loaiThue == 'Thuê theo ngày') {
            setSoNgayThue(soNgayThue)
        }

        try {
            let res1 = await axios.get('http://localhost:8080/room_order_details/' + maHD)
            let dscthdp = res1.data
            setDSCTHDP(dscthdp)
            for (let i = 0; i < dscthdp.length; i++) {
                if (loaiThue == 'Thuê theo giờ') {
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
                            <tr key={hd.maHD} onClick={e => xemCTHD(hd.maHD, hd.ngayNhanPhong, hd.ngayTraPhong, hd.loaiThue)}>
                                <td>{hd.maHD}</td>
                                <td>{moment(hd.ngayLapHD).format('YYYY-MM-DD HH:mm')}</td>
                                <td>{moment(hd.ngayNhanPhong).format('YYYY-MM-DD HH:mm')}</td>
                                <td>{moment(hd.ngayTraPhong).format('YYYY-MM-DD HH:mm')}</td>
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
                                                {loaiThue == 'Thuê theo giờ' && <td>{cthdp.giaGioDau}</td>}
                                                {loaiThue == 'Thuê theo giờ' && <td>{cthdp.giaGioTiepTheo}</td>}
                                                {loaiThue == 'Thuê theo giờ' && <td>{soGioThue}</td>}
                                                {loaiThue == 'Thuê theo ngày' && <td>{cthdp.giaTheoNgay}</td>}
                                                {loaiThue == 'Thuê theo ngày' && <td>{soNgayThue}</td>}
                                                {loaiThue == 'Thuê qua đêm' && <td></td>}
                                                {loaiThue == 'Thuê qua đêm' && <td></td>}
                                                {loaiThue == 'Thuê theo giờ' && <td className="thanh_tien">{tinhTTTheoGio(soGioThue, cthdp.gioDau, cthdp.giaGioDau, cthdp.giaGioTiepTheo)}</td>}
                                                {loaiThue == 'Thuê theo ngày' && <td className="thanh_tien">{tinhTTTheoNgay(soNgayThue, cthdp.giaTheoNgay)}</td>}
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
                                                <td>{cthddv.donGia}</td>
                                                <td>{cthddv.dichVu.donVi}</td>
                                                <td>{cthddv.soLuong}</td>
                                                <td className="thanh_tien">{cthddv.soLuong * cthddv.donGia}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row" style={{ marginTop: '2%', textAlign: 'center' }}>
                                <h5>TỔNG TIỀN: {tongTien}</h5>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}