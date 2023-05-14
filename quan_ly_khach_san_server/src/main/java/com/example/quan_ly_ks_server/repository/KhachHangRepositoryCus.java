package com.example.quan_ly_ks_server.repository;

import com.example.quan_ly_ks_server.entity.KhachHang;

public interface KhachHangRepositoryCus {
	public KhachHang timKHTheoCCCD(String cccd);
	public KhachHang timKHTheoSDT(String sdt);
	public Long timMaKHTheoPhong(String maPhong);
}
