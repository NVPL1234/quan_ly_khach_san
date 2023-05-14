package com.example.quan_ly_ks_server.service;

import java.util.List;

import com.example.quan_ly_ks_server.entity.ChiTietHoaDonDichVu;

public interface ChiTietHoaDonDichVuService {
	
	public List<ChiTietHoaDonDichVu> layDSCTHDDVTheoMa(Long maHD);

	public List<ChiTietHoaDonDichVu> layDSCTHDDV();

	public void xoa(Long maHD, Long maDV);
	
	public ChiTietHoaDonDichVu timCTHDDVTheo(Long maHD, Long maDV);

	public ChiTietHoaDonDichVu luu(ChiTietHoaDonDichVu chiTietHoaDonDichVu);
	
	public void capNhatSoLuong(Long maHD, Long maDV, int soLuong);
}