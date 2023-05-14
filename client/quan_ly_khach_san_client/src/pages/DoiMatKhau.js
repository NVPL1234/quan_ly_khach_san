import React, { useState } from "react"
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function DoiMatKhau() {

    const [tenDangNhap, setTenDangNhap] = useState(localStorage.getItem('tenDangNhap'))
    const [matKhau, setMatKhau] = useState('')
    const [matKhauMoi, setMatKhauMoi] = useState('')
    const [matKhauLapLai, setMatKhauLapLai] = useState('')
    const [loi, setLoi] = useState('')

    const ktMKLL = () => {
        if (matKhauMoi != matKhauLapLai) {
            setLoi('Nhập mật khẩu sai')
            return false
        }
        else {
            setLoi('')
            return true
        }
    }

    const ktMatKhau = () => {
        if (ktMKLL) {
            axios.post('http://localhost:8080/login', {
                tenDangNhap: tenDangNhap,
                matKhau: matKhau
            }).then((res) => {
                let taiKhoan = res.data
                if (taiKhoan != '') {
                    luu()
                }
                else {
                    alert('Nhập sai mật khẩu!')
                }
            }).catch(e => console.log(e))
        }
    }

    const luu = async () => {
        try {
            await axios.post('http://localhost:8080/tai_khoan', {
                maTK: parseInt(localStorage.getItem('maTK')),
                tenDangNhap: tenDangNhap,
                matKhau: matKhauMoi,
                quyen: {
                    maQuyen: parseInt(localStorage.getItem('quyen'))
                }
            })
            alert('Đã đổi mật khẩu!')
            setMatKhau('')
            setMatKhauMoi('')
            setMatKhauLapLai('')
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div style={{ marginTop: '2%', marginLeft: '20%', marginRight: '20%' }}>
                <form>
                    <div className="row">
                        <label htmlFor='passwordOld' className="form-label col-4">Nhập mật khẩu hiện tại</label>
                        <input type='password' className="form-control col" placeholder='Nhập mật khẩu hiện tại' id='passwordOld' value={matKhau} onChange={event => setMatKhau(event.target.value)} />
                    </div>
                    <div className="row" style={{ marginTop: '2%' }}>
                        <label htmlFor='passwordNew' className="form-label col-4">Nhập mật khẩu mới</label>
                        <input type='password' className="form-control col" placeholder='Nhập mật khẩu mới' id='passwordNew' value={matKhauMoi} onChange={event => setMatKhauMoi(event.target.value)} />
                    </div>
                    <div className="row" style={{ marginTop: '2%' }}>
                        <label htmlFor='passwordAgain' className="form-label col-4">Nhập lại mật khẩu mới</label>
                        <input type='password' className="form-control col" placeholder='Nhập lại mật khẩu mới' id='passwordAgain' value={matKhauLapLai} onChange={event => setMatKhauLapLai(event.target.value)} onBlur={ktMKLL} />
                        <span style={{ color: 'red' }}>{loi}</span>
                    </div>
                    <input type='button' value='LƯU' className='btn btn-success' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={ktMatKhau} />
                </form>
            </div>
        </div>
    )
}