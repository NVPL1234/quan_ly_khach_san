import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom";
import axios from 'axios'
import Nav from "../component/Nav"
import Paypal from "../component/PayPal";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function FormDatPhongKH() {

    const [tenKH, setTenKH] = useState('')
    const [soCMND, setSoCMND] = useState('')
    const [sdt, setSDT] = useState('')
    const location = useLocation();
    let phong = location.state
    let loaiThue = localStorage.getItem('loaiThue')
    const [tongTien, setTongTien] = useState(0)
    const [hienPayPal, setHienPayPal] = useState(false)

    useEffect(() => {
        async function layDuLieu() {
            let maTK = parseInt(localStorage.getItem('maTK'))
            try {
                let res = await axios.get('http://localhost:8080/customers/' + maTK)
                let kh = res.data
                setTenKH(kh.tenKH)
                setSoCMND(kh.soCMND)
                setSDT(kh.sDT)
            } catch (error) {
                console.log(error.message);
            }
        }
        layDuLieu()
        if (phong.length == null) {
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
                    setTongTien(thanhTien * (50 / 100))
                }
                else {
                    let thanhTien = phong.giaGioDau
                    setTongTien(thanhTien * (50 / 100))
                }
            }
            else if (loaiThue == 'Thuê theo ngày') {
                let soNgayThue = parseInt(localStorage.getItem('soNgayThue'))
                let thanhTien = soNgayThue * phong.giaTheoNgay
                setTongTien(thanhTien * (50 / 100))
            }
        }
        else {
            let tongTienTam = 0
            for (let i = 0; i < phong.length; i++) {
                if (loaiThue == 'Thuê theo giờ') {
                    let soGioThue = parseInt(localStorage.getItem('soGioThue'))
                    if (soGioThue == 0)
                        soGioThue = soGioThue + 1

                    let gioDau = phong[i].gioDau
                    let gioTiepTheo = soGioThue - gioDau
                    if (soGioThue > gioDau) {
                        let thanhTienGioDau = phong[i].giaGioDau
                        let thanhTienGioTiepTheo = gioTiepTheo * phong[i].giaGioTiepTheo
                        let thanhTien = thanhTienGioDau + thanhTienGioTiepTheo
                        tongTienTam = tongTienTam + (thanhTien * (50 / 100))
                    }
                    else {
                        let thanhTien = phong[i].giaGioDau
                        tongTienTam = tongTienTam + (thanhTien * (50 / 100))
                    }
                }
                else if (loaiThue == 'Thuê theo ngày') {
                    let soNgayThue = parseInt(localStorage.getItem('soNgayThue'))
                    let thanhTien = soNgayThue * phong[i].giaTheoNgay
                    tongTienTam = tongTienTam + (thanhTien * (50 / 100))
                }
            }
            setTongTien(tongTienTam)
        }
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div style={{ marginTop: '2%' }}>
                <form action="">
                    <div className="row">
                        <label htmlFor='ten-kh' className="form-label col-2">Nhập họ và tên</label>
                        <input type='text' className="form-control col" placeholder='Nhập họ và tên' id='ten-kh' value={tenKH} onChange={event => setTenKH(event.target.value)} />
                    </div>
                    <div className="row" style={{ marginTop: '2%' }}>
                        <label htmlFor='so-cmnd' className="form-label col-2">Nhập số CMND/CCCD</label>
                        <input type='text' className="form-control col" placeholder='Nhập số CMND/CCCD' id='so-cmnd' value={soCMND} onChange={event => setSoCMND(event.target.value)} />
                    </div>
                    <div className="row" style={{ marginTop: '2%' }}>
                        <label htmlFor='sdt' className="form-label col-2">Nhập số điện thoại</label>
                        <input type='text' className="form-control col" placeholder='Nhập số điện thoại' id='sdt' value={sdt} onChange={event => setSDT(event.target.value)} />
                    </div>
                    <div className="row" style={{ marginTop: '2%' }}>
                        <label htmlFor='phoneNumber' className="form-label col-2">Chọn hình thức thanh toán: </label>
                        <div className="form-check col">
                            <input type="radio" className="form-check-input" id="radio1" name="optradio" value="option1" checked />Paypal
                            <label className="form-check-label" htmlFor="radio1"></label>
                        </div>
                    </div>
                    {phong.length == null ? <h5 style={{ marginTop: '2%' }}>Phòng: {phong.maPhong}</h5> : <h5 style={{ marginTop: '2%' }}>Phòng: {phong.map((phong) => phong.maPhong + ', ')}</h5>}
                    <h5 style={{ marginTop: '2%' }}>Tổng tiền đặt cọc: {tongTien.toLocaleString({ style: "currency", currency: "vnd" })}</h5>
                    <input style={{ marginTop: '5%', marginLeft: '40%', width: '20%' }} className='btn btn-primary' type="button" value='XÁC NHẬN' onClick={e => setHienPayPal(true)} />
                    <div className="row" style={{marginLeft: '25%', marginTop: '1%'}}>
                        {hienPayPal == true && <Paypal tongTien={tongTien} phong={phong} />}
                    </div>
                </form>
            </div>
        </div>
    )
}