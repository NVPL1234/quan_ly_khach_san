package com.example.quan_ly_ks_server.repository;

import java.util.List;

import com.example.quan_ly_ks_server.entity.ChiTietHoaDonPhong;

public interface ChiTietHoaDonPhongRepository {
	
	public List<ChiTietHoaDonPhong> layDSCTHDPTheoMa(Long maHD);

	public List<ChiTietHoaDonPhong> layDSCTHDP();

	public void xoa(Long maHD, String maPhong);

	public ChiTietHoaDonPhong luu(ChiTietHoaDonPhong chiTietHoaDonPhong);
	
	public List<ChiTietHoaDonPhong> layDSCTHDP(Long maHD);
}
