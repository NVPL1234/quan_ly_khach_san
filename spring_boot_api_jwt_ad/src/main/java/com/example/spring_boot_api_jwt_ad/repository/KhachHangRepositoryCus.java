package com.example.spring_boot_api_jwt_ad.repository;

import com.example.spring_boot_api_jwt_ad.entity.KhachHang;

public interface KhachHangRepositoryCus {
	public KhachHang timKHTheoCCCD(String cccd);
	public KhachHang timKHTheoSDT(String sdt);
	public Long timMaKHTheoPhong(String maPhong);
}
