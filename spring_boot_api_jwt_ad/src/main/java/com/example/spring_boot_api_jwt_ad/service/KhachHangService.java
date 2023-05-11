package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.KhachHang;

public interface KhachHangService {
	public KhachHang layKHTheoMa(Long maKH);
	public List<KhachHang> layDSKH();
	public void xoa(Long maKH);
	public KhachHang luu(KhachHang khachHang);
	public KhachHang timKHTheoCCCD(String cccd);
	public KhachHang timKHTheoSDT(String sdt);
	public Long timMaKHTheoPhong(String maPhong);
}
