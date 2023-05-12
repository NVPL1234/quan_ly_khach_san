import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function ThongTinTaiKhoan() {

    const [taiKhoan, setTaiKhoan] = useState(null)
    const [quyen, setQuyen] = useState(localStorage.getItem('quyen'))

    useEffect(() => {
        let maTK = parseInt(localStorage.getItem('maTK'))
        if (quyen == '1' || quyen == '2')
            axios.get('http://localhost:8080/employees/' + maTK)
                .then((res) => setTaiKhoan(res.data))
        else
            axios.get('http://localhost:8080/customers/' + maTK)
                .then((res) => setTaiKhoan(res.data))
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div className="row" style={{ textAlign: 'center', marginTop: '5%' }}>
                <div className="row" style={{marginLeft: '40%'}}>
                    {(taiKhoan != null && quyen != 3) ? <img src={taiKhoan.duongDanHinh} alt="" style={{ marginLeft: '2%', width: 200, height: 200, marginBottom: '2%' }} /> : <img src={'https://res.cloudinary.com/dffvo3nnd/image/upload/v1678013457/6386976_ht8v3e.png'} alt="" style={{ marginLeft: '2%', width: 150, height: 100, marginBottom: '2%' }} />}
                </div>
                {taiKhoan != null && <h5>Mã: {quyen != 3 ? taiKhoan.maNV : taiKhoan.maKH}</h5>}
                {taiKhoan != null && <h5>Họ và tên: {quyen != 3 ? taiKhoan.tenNV : taiKhoan.tenKH}</h5>}
                {taiKhoan != null && <h5>Giới tính: {taiKhoan.gioiTinh}</h5>}
                {taiKhoan != null && <h5>Địa chỉ: {taiKhoan.diaChi}</h5>}
                {taiKhoan != null && <h5>Số điện thoại: {taiKhoan.sDT}</h5>}
                {taiKhoan != null && <h5>Số CMND/CCCD: {taiKhoan.soCMND}</h5>}
            </div>
            <div className="row" style={{ marginTop: '2%', marginLeft: '40%', width: '20%' }}>
                <Link className='btn btn-primary' to='/doi_mat_khau'>Đổi mật khẩu</Link>
            </div>
        </div>
    )
}