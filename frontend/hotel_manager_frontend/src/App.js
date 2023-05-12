import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import DangNhap from './pages/DangNhap'
import DangKy from './pages/DangKy'
import TrangChu from './pages/TrangChu'
import QuanLiChucVu from './pages/QuanLiChucVu'
import QuanLiPhong from './pages/QuanLiPhong'
import QuanLiLoaiPhong from './pages/QuanLiLoaiPhong'
import QuanLiNhanVien from './pages/QuanLiNhanVien'
import QuanLiTang from './pages/QuanLiTang'
import QuanLiDichVu from './pages/QuanLiDichVu'
import QuanLiLoaiDichVu from './pages/QuanLiLoaiDichVu'
import FormHoaDonPhong from './pages/FormHoaDonPhong'
import FormPhieuDatDichVu from './pages/FormPhieuDatDichVu'
import QuanLiKhachHang from './pages/QuanLiKhachHang'
import FormHoaDon from './pages/FormHoaDon'
import ThongTinTaiKhoan from './pages/ThongTinTaiKhoan'
import ProfileForm from './pages/ProfileForm'
import ThueTraPhong from './pages/ThueTraPhong'
import DoiMatKhau from './pages/DoiMatKhau'
import ThongKe from './pages/ThongKe'
import DatPhongKH from './pages/DatPhongKH'
import ChiTietPhong from './pages/ChiTietPhong'
import FormDatPhongKH from './pages/FormDatPhongKH'
import GioHangPage from './pages/GioHangPage'
import HoaDonKH from './pages/HoaDonKH'
import Test from './pages/Test'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dang_nhap' element={<DangNhap />}></Route>
        <Route path='/dang_ky' element={<DangKy />}></Route>
        <Route path='/' element={<TrangChu />}></Route>
        <Route path='/nv/quan_li_chuc_vu' element={<QuanLiChucVu />}></Route>
        <Route path='/nv/quan_li_phong' element={<QuanLiPhong />}></Route>
        <Route path='/nv/quan_li_loai_phong' element={<QuanLiLoaiPhong />}></Route>
        <Route path='/nv/quan_li_nhan_vien' element={<QuanLiNhanVien />}></Route>
        <Route path='/nv/quan_li_tang' element={<QuanLiTang />}></Route>
        <Route path='/nv/quan_li_dich_vu' element={<QuanLiDichVu />}></Route>
        <Route path='/nv/quan_li_loai_dich_vu' element={<QuanLiLoaiDichVu />}></Route>
        <Route path='/nv/form_phieu_dat_phong' element={<FormHoaDonPhong />}></Route>
        <Route path='/nv/form_phieu_dat_dich_vu' element={<FormPhieuDatDichVu />}></Route>
        <Route path='/nv/quan_li_khach_hang' element={<QuanLiKhachHang />}></Route>
        <Route path='/nv/form_hoa_don' element={<FormHoaDon />}></Route>
        <Route path='/thong_tin' element={<ThongTinTaiKhoan />}></Route>
        <Route path='/profileForm' element={<ProfileForm />}></Route>
        <Route path='/nv/thue_tra_phong' element={<ThueTraPhong />}></Route>
        <Route path='/doi_mat_khau' element={<DoiMatKhau />}></Route>
        <Route path='/nv/thong_ke' element={<ThongKe />}></Route>
        <Route path='/kh/dat_phong' element={<DatPhongKH />}></Route>
        <Route path='/kh/ct_phong' element={<ChiTietPhong />}></Route>
        <Route path='/kh/form_dat_phong' element={<FormDatPhongKH />}></Route>
        <Route path='/kh/gio_hang' element={<GioHangPage />}></Route>
        <Route path='/kh/hoa_don' element={<HoaDonKH />}></Route>
        <Route path='/test' element={<Test />}></Route>
      </Routes>
    </BrowserRouter>
  )
}