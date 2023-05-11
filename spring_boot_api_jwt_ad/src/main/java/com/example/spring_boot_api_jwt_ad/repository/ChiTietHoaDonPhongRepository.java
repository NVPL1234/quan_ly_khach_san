package com.example.spring_boot_api_jwt_ad.repository;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.ChiTietHoaDonPhong;

public interface ChiTietHoaDonPhongRepository {
	
	public List<ChiTietHoaDonPhong> layDSCTHDPTheoMa(Long maHD);

	public List<ChiTietHoaDonPhong> layDSCTHDP();

	public void xoa(Long maHD, String maPhong);

	public ChiTietHoaDonPhong luu(ChiTietHoaDonPhong chiTietHoaDonPhong);
	
	public List<ChiTietHoaDonPhong> layDSCTHDP(Long maHD);
}
