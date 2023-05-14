package com.example.quan_ly_ks_server.service;

import com.example.quan_ly_ks_server.entity.TaiKhoan;

public interface TaiKhoanService {
//	public KhachHang layTKTheoMa(Long maTK);
//	public List<KhachHang> layDSKH();
	public void xoa(Long maTK);
	public TaiKhoan luu(TaiKhoan taiKhoan);
}
