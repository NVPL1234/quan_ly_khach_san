package com.example.quan_ly_ks_server.service;

import com.example.quan_ly_ks_server.entity.TaiKhoan;

public interface UserService {
	TaiKhoan createUser(TaiKhoan nguoiDung);
    TaiKhoan findByTenDangNhap(String tenDangNhap);
}