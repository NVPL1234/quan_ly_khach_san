import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function DangNhap() {

  const navigate = useNavigate()

  const [tenDangNhap, setTenDangNhap] = useState('')
  const [matKhau, setMatKhau] = useState('')

  const dangNhap = async () => {
    try {
      let res = await axios.post('http://localhost:8080/login', {
        tenDangNhap: tenDangNhap,
        matKhau: matKhau
      })
      let taiKhoan = res.data
      if (taiKhoan == null) {
        alert('Đăng nhập thất bại!')
        return
      }
      localStorage.setItem('tenDangNhap', taiKhoan.tenDangNhap)
      localStorage.setItem('maTK', taiKhoan.maTK)
      if (taiKhoan.quyen.maQuyen == 1) {
        localStorage.setItem('quyen', '1')
        navigate('/')
      }
      else if (taiKhoan.quyen.maQuyen == 2) {
        localStorage.setItem('quyen', '2')
        navigate('/')
      }
      else if (taiKhoan.quyen.maQuyen == 3) {
        localStorage.setItem('quyen', '3')
        navigate('/')
      }

    } catch (error) {
      alert('Đăng nhập thất bại!')
    }
  }

  return (
    <div className="container-fluid" style={{ marginTop: '2%' }}>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>ĐĂNG NHẬP</h1>
      <div className='row' style={{ marginLeft: '20%', marginRight: '20%', marginTop: '1%' }}>
        <form>
          <div className='row'>
            <label for='ten-dang-nhap' className="form-label col-4">Nhập tên tài khoản</label>
            <input type='text' className="form-control col" placeholder='Nhập tên tài khoản' id='ten-dang-nhap' onChange={event => setTenDangNhap(event.target.value)} />
          </div>

          <div className='row' style={{ marginTop: '1%' }}>
            <label for='mat-khau' className="form-label col-4">Nhập mật khẩu</label>
            <input type='password' className="form-control col" placeholder='Nhập mật khẩu' id='mat-khau' onChange={event => setMatKhau(event.target.value)} />
          </div>

          <input type='button' value='ĐĂNG NHẬP' className='btn btn-success' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={dangNhap} />

          <div className='row' style={{ marginTop: '1%' }}>
            <span>Bạn chưa có tài khoản? </span><Link type='button' to='/dang_ky'>ĐĂNG KÝ</Link>
          </div>
        </form>
      </div>
    </div>
  );
}