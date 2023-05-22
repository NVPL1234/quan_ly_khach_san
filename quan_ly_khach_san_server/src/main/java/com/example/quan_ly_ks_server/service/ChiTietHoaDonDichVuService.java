package com.example.quan_ly_ks_server.service;

import java.util.List;

import com.example.quan_ly_ks_server.entity.ChiTietHoaDonDichVu;

public interface ChiTietHoaDonDichVuService {
	
	public List<ChiTietHoaDonDichVu> layDSCTHDDVTheoMa(Long maHD);

	public List<ChiTietHoaDonDichVu> layDSCTHDDV();

	public void xoa(Long maHD, Long maDV, String maPhong);
	
	public ChiTietHoaDonDichVu timCTHDDVTheo(Long maHD, Long maDV, String maPhong);
	
	public List<ChiTietHoaDonDichVu> timCTHDDVTheo(Long maHD, String maPhong);

	public ChiTietHoaDonDichVu luu(ChiTietHoaDonDichVu chiTietHoaDonDichVu);
	
	public void capNhatSoLuong(Long maHD, String maPhong, Long maDV, int soLuong);
}