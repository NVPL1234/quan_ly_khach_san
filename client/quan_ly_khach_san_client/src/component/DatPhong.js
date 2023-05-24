import React, { useState, useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import { GoSearch } from 'react-icons/go'
import { AiOutlineUserAdd } from 'react-icons/ai'
import axios from 'axios'
import moment from 'moment';
import ThemKH from "./ThemKH";
import PhongDaDat from "./PhongDaDat";
import PhongTrong from "./PhongTrong";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function DatPhong() {

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    const [dsDD, setDSDD] = useState([])
    const [donDat, setDD] = useState(null)
    const [ngayLapHD, setNgayLapHD] = useState(new Date())
    const [ngayNhan, setNgayNhan] = useState('')
    const [ngayTra, setNgayTra] = useState('')
    const [tongGioThue, setTongGioThue] = useState(0)
    const [tongNgayThue, setTongNgayThue] = useState(0)
    const [tienCoc, setTienCoc] = useState(0)
    const [trangThai, setTrangThai] = useState('Đã đặt')
    const [loaiThue, setLoaiThue] = useState('Thuê theo giờ')
    const [dskh, setDSKH] = useState([])
    const [maKH, setMaKH] = useState(0)
    const [soCMND, setSoCMND] = useState('')
    const [sDT, setSDT] = useState('')
    const [maNV, setMaNV] = useState(parseInt(localStorage.getItem('maTK')))
    const [dsPhong, setDSPhong] = useState([])
    const [dsPhongDat, setDSPhongDat] = useState([])
    const [hienModalCTHD, setHienModalCTHD] = useState(false)
    const [hienModalDatPhong, setHienModalDatPhong] = useState(false)
    const [hienModalThemKH, setHienModalThemKH] = useState(false)
    const [hienModalThemPhong, setHienModalThemPhong] = useState(false)
    const [tongTien, setTongTien] = useState(0)
    const [taiLai, setTaiLai] = useState(true)

    const timKHTheoCCCD = async () => {
        if (soCMND != '') {
            let res1 = await axios.get('http://localhost:8080/customers/cccd/' + soCMND)
            let maKH = res1.data.maKH

            var res2 = await axios.get('http://localhost:8080/orders/' + maKH + '/Đã đặt')
            let dshd = res2.data
            setDSDD(dshd)
        }
        else {

        }
    }

    const timKHTheoSDT = async () => {
        if (sDT != '') {
            let res1 = await axios.get('http://localhost:8080/customers/sdt/' + sDT)
            let maKH = res1.data.maKH

            var res2 = await axios.get('http://localhost:8080/orders/' + maKH + '/Đã đặt')
            let dshd = res2.data
            setDSDD(dshd)
        }
        else {

        }
    }

    const xoaDonDat = async (dd) => {
        if (!(window.confirm('Bạn có chắc muốn xoá?')))
            return false
        else {
            const res1 = await axios.get('http://localhost:8080/room_order_details/' + dd.maHD)
            let dsPhongDaDat = res1.data
            for (let i = 0; i < dsPhongDaDat.length; i++)
                await axios.put('http://localhost:8080/rooms/' + dsPhongDaDat[i].phong.maPhong + '/Trống')
            await axios.delete('http://localhost:8080/orders/' + dd.maHD)
            alert('Đã xoá!')
            setTaiLai(true)
        }
    }

    const dongModalCTHD = () => {
        setHienModalCTHD(false);
        setTaiLai(true)
    }

    const moModalCTHD = () => setHienModalCTHD(true)

    const xemCT = (dd) => {
        setDD(dd)
        moModalCTHD()
    }

    const dongModalThemPhong = () => {
        setHienModalThemPhong(false);
        moModalCTHD()
    }
    const moModalThemPhong = () => {
        dongModalCTHD()
        setHienModalThemPhong(true)
    }

    const dongModalDatPhong = () => {
        setNgayNhan('')
        setNgayTra('')
        setDSPhongDat([])
        setDSPhong([])
        setTongTien(0)
        setTienCoc(0)
        setMaKH('')
        setHienModalDatPhong(false);
        setTaiLai(true)
    }
    const moModalDatPhong = () => {
        setHienModalDatPhong(true)
        axios.get('http://localhost:8080/customers')
            .then((res) => setDSKH(res.data))
            .catch((e) => e.message)
    }

    const dongModalThemKH = () => {
        axios.get('http://localhost:8080/customers')
            .then((res) => setDSKH(res.data))
            .catch((e) => e.message)
        setHienModalThemKH(false);
    }

    const moModalThemKH = () => setHienModalThemKH(true)

    const timPhong = () => {
        let ngayNhanf = moment(ngayNhan).format('YYYY-MM-DD HH:mm:ss');
        let ngayTraf = moment(ngayTra).format('YYYY-MM-DD HH:mm:ss');
        let tongGioThue = moment(ngayTra).diff(moment(ngayNhan), 'hours')
        let tongNgayThue = moment(ngayTra).diff(moment(ngayNhan), 'days')
        if (tongGioThue < 24) {
            setLoaiThue('Thuê theo giờ')
            setTongGioThue(tongGioThue)
        }
        else if (tongNgayThue >= 1) {
            setLoaiThue('Thuê theo ngày')
            setTongNgayThue(tongNgayThue)
        }
        setTongTien(0)
        setDSPhongDat([])
        setDSPhong([])
        axios.get('http://localhost:8080/rooms/ngayNhanPhong/' + ngayNhanf + '/ngayTraPhong/' + ngayTraf)
            .then((res) => setDSPhong(res.data))
            .catch((e) => console.log(e.message))
    }

    const tinhTongTien = (e, p) => {
        if (e.target.checked) {
            setDSPhongDat(phongDat => [...phongDat, p])
            if (loaiThue == 'Thuê theo giờ') {
                let soGioThue = moment(ngayTra).diff(moment(ngayNhan), 'hours')
                let gioDau = p.gioDau
                let gioTiepTheo = soGioThue - gioDau
                if (soGioThue > gioDau) {
                    let thanhTienGioDau = p.giaGioDau
                    let thanhTienGioTiepTheo = gioTiepTheo * p.giaGioTiepTheo
                    let thanhTien = thanhTienGioDau + thanhTienGioTiepTheo
                    setTongTien(tongTien + thanhTien)
                    setTienCoc((tongTien + thanhTien) * (50/100))
                }
                else {
                    let thanhTien = p.giaGioDau
                    setTongTien(tongTien + thanhTien)
                    setTienCoc((tongTien + thanhTien) * (50/100))
                }
            }
            else if (loaiThue == 'Thuê theo ngày') {
                let soNgayThue = moment(ngayTra).diff(moment(ngayNhan), 'days')
                let thanhTien = soNgayThue * p.giaTheoNgay
                setTongTien(tongTien + thanhTien)
                setTienCoc((tongTien + thanhTien) * (50/100))
            }
        }
        else {
            let dsPhongDatTam = dsPhongDat.filter(phongDat => phongDat.maPhong != p.maPhong)
            setDSPhongDat(dsPhongDatTam)
            if (loaiThue == 'Thuê theo giờ') {
                let soGioThue = moment(ngayTra).diff(moment(ngayNhan), 'hours')
                let gioDau = p.gioDau
                let gioTiepTheo = soGioThue - gioDau
                if (soGioThue > gioDau) {
                    let thanhTienGioDau = p.giaGioDau
                    let thanhTienGioTiepTheo = gioTiepTheo * p.giaGioTiepTheo
                    let thanhTien = thanhTienGioDau + thanhTienGioTiepTheo
                    setTongTien(tongTien - thanhTien)
                    setTienCoc((tongTien - thanhTien) * (50/100))
                }
                else {
                    let thanhTien = p.giaGioDau
                    setTongTien(tongTien - thanhTien)
                    setTienCoc((tongTien - thanhTien) * (50/100))
                }
            }
            else if (loaiThue == 'Thuê theo ngày') {
                let soNgayThue = moment(ngayTra).diff(moment(ngayNhan), 'days')
                let thanhTien = soNgayThue * p.giaTheoNgay
                setTongTien(tongTien - thanhTien)
                setTienCoc((tongTien - thanhTien) * (50/100))
            }
        }
    }

    const datPhong = async () => {
        let maHD
        try {
            let maKHf = parseInt(maKH)
            const res = await axios.post('http://localhost:8080/orders', {
                ngayLapHD: moment().format(),
                ngayTraPhong: moment(ngayTra).format(),
                ngayNhanPhong: moment(ngayNhan).format(),
                loaiThue: loaiThue,
                trangThaiHD: trangThai,
                tienCoc: tienCoc,
                khachHang: { 'maKH': maKHf },
                nhanVien: { 'maNV': maNV }
            })
            maHD = res.data.maHD
        } catch (error) {
            console.log(error.message);
        }
        for (let i = 0; i < dsPhongDat.length; i++) {
            try {
                await axios.put('http://localhost:8080/rooms/' + dsPhongDat[i].maPhong + '/' + 'Đã đặt')
                await axios.post('http://localhost:8080/room_order_details', {
                    hoaDon: { 'maHD': maHD },
                    phong: { 'maPhong': dsPhongDat[i].maPhong },
                    gioDau: dsPhongDat[i].gioDau,
                    giaGioDau: dsPhongDat[i].giaGioDau,
                    giaGioTiepTheo: dsPhongDat[i].giaGioTiepTheo,
                    giaTheoNgay: dsPhongDat[i].giaTheoNgay,
                })
            } catch (error) {
                console.log(error.message);
            }
        }
        dongModalDatPhong()
        alert("Đặt phòng thành công!")
    }

    const nhanPhong = async () => {
        let maHD
        try {
            let maKHf = parseInt(maKH)
            const res = await axios.post('http://localhost:8080/orders', {
                ngayLapHD: moment().format(),
                ngayTraPhong: moment(ngayTra).format(),
                ngayNhanPhong: moment(ngayNhan).format(),
                loaiThue: loaiThue,
                trangThaiHD: 'Đã nhận',
                khachHang: { 'maKH': maKHf },
                nhanVien: { 'maNV': maNV }
            })
            maHD = res.data.maHD
        } catch (error) {
            console.log(error.message);
        }
        for (var i = 0; i < dsPhongDat.length; i++) {
            try {
                await axios.put('http://localhost:8080/rooms/' + dsPhongDat[i].maPhong + '/' + 'Đã nhận')
                await axios.post('http://localhost:8080/room_order_details', {
                    hoaDon: { 'maHD': maHD },
                    phong: { 'maPhong': dsPhongDat[i].maPhong },
                    gioDau: dsPhongDat[i].gioDau,
                    giaGioDau: dsPhongDat[i].giaGioDau,
                    giaGioTiepTheo: dsPhongDat[i].giaGioTiepTheo,
                    giaTheoNgay: dsPhongDat[i].giaTheoNgay,
                })
            } catch (error) {
                console.log(error.message);
            }
        }
        dongModalDatPhong()
        alert('Nhận phòng thành công!')
    }

    useEffect(() => {
        if (taiLai == true) {
            axios.get('http://localhost:8080/orders/Đã đặt')
                .then((res) => {
                    setDSDD(res.data)
                    setTaiLai(false)
                })
                .catch((e) => console.log(e.message))
        }
    }, [taiLai])

    return (
        <div className="row" style={{ marginTop: '2%' }}>
            <div className="row">
                <div className="col">
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
                    <div className="row" style={{ marginTop: '2%' }}>
                        <button type="button" className="col-3 btn btn-primary" onClick={moModalDatPhong}>ĐẶT PHÒNG</button>
                        <Modal show={hienModalDatPhong} onHide={dongModalDatPhong} fullscreen={true}>
                            <Modal.Header closeButton>
                                <Modal.Title>ĐẶT PHÒNG</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-9">
                                        <div className="row" style={{ marginRight: '1%' }}>
                                            <div className="col input-group">
                                                <span className="input-group-text">Ngày nhận phòng</span>
                                                <input type='datetime-local' className="form-control" id='ngayNhan' value={ngayNhan} onChange={e => setNgayNhan(e.target.value)} />
                                                <span className="input-group-text">Ngày trả phòng</span>
                                                <input type='datetime-local' className="form-control" id='ngay_tra' value={ngayTra} onChange={e => setNgayTra(e.target.value)} />
                                                <button className="btn btn-success" type="button" onClick={timPhong}><GoSearch /></button>
                                            </div>
                                        </div>
                                        <div className="row table-responsive" style={{ marginTop: '2%', borderRadius: 30, borderWidth: 100, marginRight: '1%' }}>
                                            <table className="table table-hover">
                                                <thead className="table-info">
                                                    <tr>
                                                        <th>Mã phòng</th>
                                                        <th>Tầng</th>
                                                        <th>Loại phòng</th>
                                                        <th>Số giường</th>
                                                        <th>Sức chứa</th>
                                                        <th>Diện tích</th>
                                                        {loaiThue == 'Thuê theo giờ' && <th>Giờ đầu</th>}
                                                        {loaiThue == 'Thuê theo giờ' && <th>Giá giờ đầu</th>}
                                                        {loaiThue == 'Thuê theo giờ' && <th>Giá giờ tiếp theo</th>}
                                                        {loaiThue == 'Thuê theo ngày' && <th>Giá theo ngày</th>}
                                                        {loaiThue == 'Thuê theo giờ' && <th>Tổng giờ thuê</th>}
                                                        {loaiThue == 'Thuê theo ngày' && <th>Tổng ngày thuê</th>}
                                                        <th>Chọn</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dsPhong.map((p) =>
                                                        <tr key={p.maPhong}>
                                                            <td>{p.maPhong}</td>
                                                            <td>{p.tang.tenTang}</td>
                                                            <td>{p.loaiPhong.ten}</td>
                                                            <td>{p.soGiuong}</td>
                                                            <td>{p.sucChua}</td>
                                                            <td>{p.dienTich}</td>
                                                            {loaiThue == 'Thuê theo giờ' && <td>{p.gioDau}</td>}
                                                            {loaiThue == 'Thuê theo giờ' && <td>{p.giaGioDau}</td>}
                                                            {loaiThue == 'Thuê theo giờ' && <td>{p.giaGioTiepTheo}</td>}
                                                            {loaiThue == 'Thuê theo ngày' && <td>{p.giaTheoNgay}</td>}
                                                            {loaiThue == 'Thuê theo giờ' && <td>{tongGioThue}</td>}
                                                            {loaiThue == 'Thuê theo ngày' && <td>{tongNgayThue}</td>}
                                                            <td>
                                                                <input type="checkbox" className='form-check-input' onChange={e => tinhTongTien(e, p)} />
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="row" style={{ marginTop: '2%' }}>
                                            <label htmlFor="kh" className="form-label">Mã - Tên - Số điện thoại - CCCD khách hàng</label>
                                            <input className="form-control col" list="dskh" name="kh" id="kh" placeholder="Mã - Tên - Số điện thoại - CCCD khách hàng..." onChange={e => setMaKH(e.target.value.split('-')[0])} />
                                            <datalist id="dskh">
                                                {dskh.map((kh) =>
                                                    <option key={kh.maKH} value={kh.maKH + ' - ' + kh.tenKH + ' - ' + kh.sDT + ' - ' + kh.soCMND}></option>
                                                )}
                                            </datalist>

                                            <button type='button' className='btn btn-primary col-2' style={{ marginLeft: '1%' }} onClick={moModalThemKH}><AiOutlineUserAdd /></button>
                                            <Modal show={hienModalThemKH} onHide={dongModalThemKH} fullscreen={true}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>KHÁCH HÀNG</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <ThemKH />
                                                </Modal.Body>
                                            </Modal>
                                        </div>
                                        <div className="row" style={{ marginTop: '1%' }}>
                                            <label htmlFor='tien-coc' className="form-label">Nhập tiền cọc</label>
                                            <input type='number' className="form-control" placeholder='Nhập tiền cọc' id='tien-coc' value={tienCoc} onChange={event => setTienCoc(event.target.value)} />
                                        </div>
                                        <div style={{ marginTop: '5%' }} className='row'>
                                            <h5>TỔNG TIỀN: <h5 style={{ color: 'red' }}>{tongTien} đ</h5></h5>
                                        </div>
                                        <div className="row" style={{ marginTop: '5%' }}>
                                            <input type='button' value='ĐẶT PHÒNG' className='btn btn-primary col' style={{ marginRight: '2%' }} onClick={datPhong} />
                                            <input type='button' value='NHẬN PHÒNG' className='btn btn-primary col' onClick={nhanPhong} />
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                    <h5 className="row" style={{ marginBottom: '2%', marginTop: '2%' }}>PHÒNG ĐÃ ĐẶT</h5>
                    <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100 }}>
                        <table className="table table-hover">
                            <thead className="table-info">
                                <tr>
                                    <th>Ngày nhận phòng</th>
                                    <th>Ngày trả phòng</th>
                                    <th>Tiền cọc</th>
                                    <th>Tên khách hàng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dsDD.map((dd, i) =>
                                    <tr key={i}>
                                        <td>{moment(dd.ngayNhanPhong).format('DD-MM-YYYY HH:mm:ss')}</td>
                                        <td>{moment(dd.ngayTraPhong).format('DD-MM-YYYY HH:mm:ss')}</td>
                                        <td>{dd.tienCoc}</td>
                                        <td>{dd.khachHang.tenKH}</td>
                                        <td>
                                            <input type="button" className="btn btn-primary" value="XEM CHI TIẾT" onClick={e => xemCT(dd)} /> | &nbsp;                                            
                                            <input type="button" className="btn btn-danger" value="HUỶ ĐẶT PHÒNG" onClick={e => xoaDonDat(dd)} />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>    
                    <Modal show={hienModalCTHD} onHide={dongModalCTHD} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>PHÒNG</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <button type="button" className="btn btn-primary" onClick={moModalThemPhong}>THÊM PHÒNG</button>
                            </div>
                            <PhongDaDat dd={donDat} />
                        </Modal.Body>
                        <Modal.Footer>
                            <button type='button' className="btn btn-danger" onClick={dongModalCTHD}>
                                Đóng
                            </button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={hienModalThemPhong} onHide={dongModalThemPhong} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>PHÒNG</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <PhongTrong donDat={donDat} />
                        </Modal.Body>
                        <Modal.Footer>
                            <button type='button' className="btn btn-danger" onClick={dongModalThemPhong}>
                                Đóng
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}