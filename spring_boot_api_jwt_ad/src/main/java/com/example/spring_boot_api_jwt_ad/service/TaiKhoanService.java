package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.KhachHang;
import com.example.spring_boot_api_jwt_ad.entity.TaiKhoan;

public interface TaiKhoanService {
//	public KhachHang layTKTheoMa(Long maTK);
//	public List<KhachHang> layDSKH();
	public void xoa(Long maTK);
	public TaiKhoan luu(TaiKhoan taiKhoan);
}
