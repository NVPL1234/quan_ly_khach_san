package com.example.spring_boot_api_jwt_ad.service;

import com.example.spring_boot_api_jwt_ad.authen.UserPrincipal;
import com.example.spring_boot_api_jwt_ad.entity.TaiKhoan;

public interface UserService {
	TaiKhoan createUser(TaiKhoan nguoiDung);
    TaiKhoan findByTenDangNhap(String tenDangNhap);
}