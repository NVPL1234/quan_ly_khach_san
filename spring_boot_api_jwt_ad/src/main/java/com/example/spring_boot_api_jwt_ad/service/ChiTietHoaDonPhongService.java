package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.ChiTietHoaDonPhong;

public interface ChiTietHoaDonPhongService {
	
	public List<ChiTietHoaDonPhong> layDSCTHDPTheoMa(Long maHD);

	public List<ChiTietHoaDonPhong> layDSCTHDP();

	public void xoa(Long maHD, String maPhong);

	public ChiTietHoaDonPhong luu(ChiTietHoaDonPhong chiTietHoaDonPhong);
	
	public List<ChiTietHoaDonPhong> layDSCTHDP(Long maHD);
}
