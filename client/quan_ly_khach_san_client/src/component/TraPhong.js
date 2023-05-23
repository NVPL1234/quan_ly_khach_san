import React, { useState, useRef, useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import { GoSearch } from 'react-icons/go'
import { FcPrint } from 'react-icons/fc'
import { FiRefreshCw } from 'react-icons/fi'
import { useReactToPrint } from 'react-to-print'
import axios from 'axios'
import moment from 'moment';
import { HoaDon } from "./HoaDon";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function TraPhong() {

    const componentRef = useRef()
    const [dsDonDat, setDSDonDat] = useState([])
    const [donDat, setDonDat] = useState(null)
    const [ngayLapHD, setNgayLapHD] = useState('')
    const [ngayTraPhong, setNgayTraPhong] = useState('')
    const [tienCoc, setTienCoc] = useState(0)
    const [nv, setNV] = useState(null)
    const [soCMND, setSoCMND] = useState('')
    const [sDT, setSDT] = useState('')
    const [hienModalCTHD, setHienModalCTHD] = useState(false)
    const [hienModalXacNhanIn, setHienModalXacNhanIn] = useState(false)
    const [tienThua, setTienThua] = useState(0)
    const [dscthdp, setDSCTHDP] = useState([])
    const [dscthddv, setDSCTHDDV] = useState([])
    const [taiLai, setTaiLai] = useState(true)

    const timKHTheoCCCD = async () => {
        setDSDonDat([])
        let res1 = await axios.get('http://localhost:8080/customers/cccd/' + soCMND)
        let maKH = res1.data.maKH

        var res2 = await axios.get('http://localhost:8080/orders/' + maKH + '/Đã nhận')
        setDSDonDat(res2.data)
    }

    const timKHTheoSDT = async () => {
        setDSDonDat([])
        let res1 = await axios.get('http://localhost:8080/customers/sdt/' + sDT)
        let maKH = res1.data.maKH

        var res2 = await axios.get('http://localhost:8080/orders/' + maKH + '/Đã nhận')
        setDSDonDat(res2.data)
    }

    const dongModalCTHD = () => setHienModalCTHD(false);

    const moModalCTHD = async (dd) => {

        try {
            const res1 = await axios.get('http://localhost:8080/room_order_details/' + dd.maHD)
            let dscthdp = res1.data

            var res2 = await axios.get('http://localhost:8080/service_order_details/' + dd.maHD)
            let dscthddv = res2.data

            setDSCTHDP(dscthdp)
            setDSCTHDDV(dscthddv)

            setHienModalCTHD(true)
        } catch (error) {
            console.log(error.message);
        }
    };

    const xemCT = (dd) => {
        setDonDat(dd)
        setTienCoc(dd.tienCoc)
        setNgayLapHD(moment())
        setNgayTraPhong(moment())
        moModalCTHD(dd)
    }

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

    const tinhThanhTien = (cthdp) => {
        if (donDat.loaiThue == 'Thuê theo giờ') {
            let soGioThue = tinhGioThue(donDat.ngayNhanPhong, ngayTraPhong, cthdp.gioDau)
            let gioDau = cthdp.gioDau
            let gioTiepTheo = soGioThue - gioDau
            if (soGioThue > gioDau) {
                let thanhTienGioDau = cthdp.giaGioDau
                let thanhTienGioTiepTheo = gioTiepTheo * cthdp.giaGioTiepTheo
                return thanhTienGioDau + thanhTienGioTiepTheo
            }
            else {
                return cthdp.giaGioDau
            }
        }
        else if (donDat.loaiThue == 'Thuê theo ngày') {
            let soNgayThue = tinhNgayThue(donDat.ngayNhanPhong, ngayTraPhong)
            return soNgayThue * cthdp.giaTheoNgay
        }
    }

    const tinhTongTien = () => {
        let tongTienTam = 0
        for (let i = 0; i < dscthdp.length; i++) {
            tongTienTam = tongTienTam + tinhThanhTien(dscthdp[i].phong)
        }
        for (let i = 0; i < dscthddv.length; i++) {
            tongTienTam = tongTienTam + (dscthddv[i].donGia * dscthddv[i].soLuong)
        }
        return tongTienTam - tienCoc
    }

    const dongModalXacNhanIn = () => setHienModalXacNhanIn(false)

    const moModalXacNhanIn = () => setHienModalXacNhanIn(true)

    const handlePrint = useReactToPrint({
        onBeforeGetContent: () => {
            document.getElementById('in_hoa_don').hidden = false
        },
        content: () => componentRef.current,
        documentTitle: 'hoa_don',
        onAfterPrint: () => {
            document.getElementById('in_hoa_don').hidden = true
            dongModalXacNhanIn()
            dongModalCTHD()
            setTaiLai(true)
            alert('Đã thanh toán');
        }
    })

    const tinhTienThua = (e) => {
        let tongTien = tinhTongTien()
        if (e.target.value != '') {
            let tienKhachDua = parseInt(e.target.value)
            setTienThua(tienKhachDua - tongTien)
        }
    }

    const thanhToan = async (e) => {
        try {
            await axios.put('http://localhost:8080/orders/maHD/' + donDat.maHD + '/trangThai/Đã thanh toán')
            for (let i = 0; i < dscthdp.length; i++) {
                await axios.put('http://localhost:8080/rooms/' + dscthdp[i].phong.maPhong + '/Trống')
            }
            if (e.target.value == 'In')
                handlePrint()
            else {
                dongModalXacNhanIn()
                dongModalCTHD()
                setTaiLai(true)
                alert('Đã thanh toán');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (taiLai) {
            let maNV = parseInt(localStorage.getItem('maTK'))
            axios.get('http://localhost:8080/orders/Đã nhận')
                .then((res) => {
                    setDSDonDat(res.data)
                })
            axios.get('http://localhost:8080/employees/' + maNV)
                .then((res) => {
                    setNV(res.data)
                })
            setTaiLai(false)
        }
    }, [taiLai])

    return (
        <div className="row" style={{ marginTop: '2%' }}>
            <div className="row">
                <div className="col input-group">
                    <input type="number" className="form-control" placeholder="Nhập số CMND/CCCD cần tìm..." value={soCMND} onChange={e => setSoCMND(e.target.value)} />
                    <button className="btn btn-success" type="button" onClick={timKHTheoCCCD}><GoSearch /></button>
                </div>
                <div className="col input-group">
                    <input type="text" className="form-control" placeholder="Nhập số điện thoại cần tìm..." value={sDT} onChange={e => setSDT(e.target.value)} />
                    <button className="btn btn-success" type="button" onClick={timKHTheoSDT}><GoSearch /></button>
                </div>
            </div>
            <div className="row" style={{ marginTop: '2%' }}><button className="btn btn-warning" style={{ width: '5%' }} onClick={e => setTaiLai(true)}><FiRefreshCw /></button></div>
            <div className="row" style={{ marginTop: '2%' }}>
                <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100 }}>
                    <table className="table table-hover">
                        <thead className="table-info">
                            <tr>
                                <th>Ngày nhận phòng</th>
                                <th>Ngày trả phòng</th>
                                <th>Tên khách hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dsDonDat.map((dd, i) =>
                                <tr key={i} onClick={e => xemCT(dd)}>
                                    <td>{moment(dd.ngayNhanPhong).format('DD-MM-YYYY HH:mm:ss')}</td>
                                    <td>{moment(dd.ngayTraPhong).format('DD-MM-YYYY HH:mm:ss')}</td>
                                    <td>{dd.khachHang.tenKH}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Modal show={hienModalCTHD} onHide={dongModalCTHD} fullscreen={true}>
                        <Modal.Header closeButton>
                            <Modal.Title>CHI TIẾT</Modal.Title>
                        </Modal.Header>
                        {donDat != null && <Modal.Body>
                            <div className="row">
                                <span className="col">Ngày lập hoá đơn: {ngayLapHD.format('DD-MM-YYYY HH:mm:ss')}</span>
                                <span className="col">Ngày nhận phòng: {moment(donDat.ngayNhanPhong).format('DD-MM-YYYY HH:mm:ss')}</span>
                                <span className="col">Ngày trả phòng: {ngayTraPhong.format('DD-MM-YYYY HH:mm:ss')}</span>
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <span className="col">Tên khách hàng: {donDat.khachHang.tenKH}</span>
                                <span className="col">Số CMND/CCCD: {donDat.khachHang.soCMND}</span>
                                <span className="col">Số điện thoại: {donDat.khachHang.sDT}</span>
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <div className="col-7">
                                    <div className="row">
                                        <h4>PHÒNG</h4>
                                    </div>
                                    <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100, marginTop: '1%' }}>
                                        <table className="table table-hover">
                                            <thead className="table-info">
                                                <tr>
                                                    <th>Mã phòng</th>
                                                    {donDat.loaiThue == 'Thuê theo giờ' && <th>Giờ đầu</th>}
                                                    {donDat.loaiThue == 'Thuê theo giờ' && <th>Giá giờ đầu</th>}
                                                    {donDat.loaiThue == 'Thuê theo giờ' && <th>Giá giờ tiếp theo</th>}
                                                    {donDat.loaiThue == 'Thuê theo giờ' && <th>Tổng giờ thuê</th>}
                                                    {donDat.loaiThue == 'Thuê theo ngày' && <th>Giá theo ngày</th>}
                                                    {donDat.loaiThue == 'Thuê theo ngày' && <th>Tổng ngày thuê</th>}
                                                    <th>Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dscthdp.map((cthdp, i) =>
                                                    <tr key={i}>
                                                        <td>{cthdp.phong.maPhong}</td>
                                                        {donDat.loaiThue == 'Thuê theo giờ' && <td>{cthdp.gioDau}</td>}
                                                        {donDat.loaiThue == 'Thuê theo giờ' && <td>{cthdp.giaGioDau}</td>}
                                                        {donDat.loaiThue == 'Thuê theo giờ' && <td>{cthdp.giaGioTiepTheo}</td>}
                                                        {donDat.loaiThue == 'Thuê theo giờ' && <td>{tinhGioThue(donDat.ngayNhanPhong, ngayTraPhong, cthdp.gioDau)}</td>}
                                                        {donDat.loaiThue == 'Thuê theo ngày' && <td>{cthdp.giaTheoNgay}</td>}
                                                        {donDat.loaiThue == 'Thuê theo ngày' && <td>{tinhNgayThue(donDat.ngayNhanPhong, ngayTraPhong)}</td>}
                                                        <td>{tinhThanhTien(cthdp)}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row" style={{ marginTop: '1%' }}>
                                        <h4>DỊCH VỤ</h4>
                                    </div>
                                    <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100 }}>
                                        <table className="table table-hover">
                                            <thead className="table-info">
                                                <tr>
                                                    <th>Mã phòng</th>
                                                    <th>Tên dịch vụ</th>
                                                    <th>Giá dịch vụ</th>
                                                    <th>Đơn vị</th>
                                                    <th>Số lượng</th>
                                                    <th>Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dscthddv.map((cthddv, i) =>
                                                    <tr key={i}>
                                                        <td>{cthddv.phong.maPhong}</td>
                                                        <td>{cthddv.dichVu.tenDV}</td>
                                                        <td>{cthddv.donGia}</td>
                                                        <td>{cthddv.dichVu.donVi}</td>
                                                        <td>{cthddv.soLuong}</td>
                                                        <td>{cthddv.soLuong * cthddv.donGia}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row" style={{ marginLeft: '1%' }}>
                                        <label htmlFor="tien_cua_khach" className="col-4">Số tiền khách đưa</label>
                                        <input id="tien_cua_khach" type="number" className="form-control col" placeholder="Số tiền khách đưa" onChange={e => tinhTienThua(e)} />
                                    </div>
                                    <div className="row" style={{ marginLeft: '1%', marginTop: '1%' }}>
                                        <label htmlFor="tien_tra_lai" className="col-4">Số tiền thừa</label>
                                        <input id="tien_tra_lai" type="number" className="form-control col" value={tienThua} disabled />
                                    </div>
                                    <div className='row' style={{ marginLeft: '1%', marginTop: '2%' }}>
                                        <span style={{ fontSize: 20 }}>TIỀN CỌC: {tienCoc}</span>
                                    </div>
                                    <div className='row' style={{ marginLeft: '1%', marginTop: '2%' }}>
                                        <h5>TỔNG TIỀN THANH TOÁN: <h5 style={{ color: 'red' }}>{tinhTongTien()} đ</h5></h5>
                                    </div>
                                    <div className="row" style={{ marginTop: '2%', marginLeft: '1%' }}>
                                        <input type='button' value='THANH TOÁN' className='btn btn-primary col' style={{ marginLeft: '10%', marginRight: '10%' }} onClick={moModalXacNhanIn} />
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>}
                    </Modal>
                    <Modal show={hienModalXacNhanIn} onHide={dongModalXacNhanIn}>
                        <Modal.Header closeButton>

                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <p><FcPrint size={100} style={{ marginLeft: '40%' }} /></p>
                                <h5>Bạn có muốn in hoá đơn?</h5>
                                <input type="button" className='btn btn-warning col' value="In" onClick={e => thanhToan(e)} style={{ marginRight: '2%' }} />
                                <input type="button" className='btn btn-danger col' value="Không" onClick={e => thanhToan(e)} />
                            </div>
                        </Modal.Body>
                    </Modal>
                    {(dscthdp.length > 0 || dscthddv.length > 0) && <HoaDon ref={componentRef} donDat={donDat} ngayLapHD={ngayLapHD} ngayTraPhong={ngayTraPhong} dscthdp={dscthdp} dscthddv={dscthddv} nv={nv} />}
                </div>
            </div>
        </div>
    )
}