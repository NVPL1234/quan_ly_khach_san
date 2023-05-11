import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function DangNhap() {

  const [tenDangNhap, setTenDangNhap] = useState('')
  const [matKhau, setMatKhau] = useState('')

  const dangNhap = async () => {
    try {
      let res = await axios.post('http://localhost:8080/login', {
        tenDangNhap: tenDangNhap,
        matKhau: matKhau
      })
      let token = res.data
      // setToken(token)
      let res2 = await axios.get('http://localhost:8080/tai_khoan/' + tenDangNhap)
      let quyen = res2.data.authorities
      // setMaTaiKhoan(res2.data.userId);
      localStorage.setItem('maTK', res2.data.userId)
      for (let i = 0; i < quyen.length; i++) {
        if (quyen[i] == 'kh') {
          localStorage.setItem('quyen', 'kh')
          return window.location.href = '/'
        }
        else if (quyen[i] == 'nv') {
          localStorage.setItem('quyen', 'nv')
          return window.location.href = '/nv'
        }
      }
    } catch (error) {
      alert('Đăng nhập thất bại!')
    }
  }

  return (
    <div className="container-fluid" style={{ marginTop: '2%' }}>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>ĐĂNG NHẬP</h1>
      <div>
        <form action='#'>
          <label for='ten-dang-nhap' className="form-label">Nhập tên tài khoản</label>
          <input type='text' className="form-control" placeholder='Nhập tên tài khoản' id='ten-dang-nhap' onChange={event => setTenDangNhap(event.target.value)} />

          <label for='mat-khau' className="form-label">Nhập mật khẩu</label>
          <input type='password' className="form-control" placeholder='Nhập mật khẩu' id='mat-khau' onChange={event => setMatKhau(event.target.value)} />

          <input type='button' value='ĐĂNG NHẬP' className='btn btn-primary' style={{ marginLeft: '47%', marginTop: '5%' }} onClick={dangNhap} />
        </form>
      </div>
      <div>
        <Link type='button' to='/dang_ky'>Đăng ký</Link>
      </div>
    </div>
  );
}