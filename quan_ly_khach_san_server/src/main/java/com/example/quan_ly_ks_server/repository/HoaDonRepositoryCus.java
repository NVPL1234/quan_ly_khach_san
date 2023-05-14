package com.example.quan_ly_ks_server.repository;

import java.util.List;

import com.example.quan_ly_ks_server.entity.HoaDon;

public interface HoaDonRepositoryCus {

	public int capNhatNgayNhanPhong(Long maHD, String ngayNhanPhong);
	public List<Object> timDSHDChuaThanhToan(Long maKH, String trangThai);
	public List<HoaDon> layDSHD(String trangThai);
	public List<HoaDon> layDSHD(Long maKH, String trangThai);
	public void capNhatTrangThai(Long maHD, String trangThai);
	public List<Object> layDSHDCTDV(Long maKH, String trangThai);
	public int capNhatHD(Long maHD, double tienCoc);
	public List<Object> timDSHDTrong(int soNgay);
	public List<Object> timDSHDTheo(String ngayDau, String ngayCuoi);
}
