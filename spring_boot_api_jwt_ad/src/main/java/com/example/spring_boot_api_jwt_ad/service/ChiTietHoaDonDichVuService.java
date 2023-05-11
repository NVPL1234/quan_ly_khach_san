package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.ChiTietHoaDonDichVu;

public interface ChiTietHoaDonDichVuService {
	
	public List<ChiTietHoaDonDichVu> layDSCTHDDVTheoMa(Long maHD);

	public List<ChiTietHoaDonDichVu> layDSCTHDDV();

	public void xoa(Long maHD, Long maDV);
	
	public ChiTietHoaDonDichVu timCTHDDVTheo(Long maHD, Long maDV);

	public ChiTietHoaDonDichVu luu(ChiTietHoaDonDichVu chiTietHoaDonDichVu);
	
	public void capNhatSoLuong(Long maHD, Long maDV, int soLuong);
}