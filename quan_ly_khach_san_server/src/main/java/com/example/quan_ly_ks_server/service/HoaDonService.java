package com.example.quan_ly_ks_server.service;

import java.util.List;

import com.example.quan_ly_ks_server.entity.HoaDon;

public interface HoaDonService {
	public HoaDon layHDTheo(Long maHD);
	public void xoa(Long maHD);
	public HoaDon luu(HoaDon hoaDon);
	public int capNhatNgayNhanPhong(Long maHD, String ngayNhanPhong);
	public List<Object> timDSHDChuaThanhToan(Long maKH, String trangThai);
	public List<HoaDon> layDSHD(String trangThai);
	public List<HoaDon> layDSHD(Long maKH, String trangThai);
	public void capNhatTrangThai(Long maHD, String trangThai);
	public List<Object> layDSHDCTDV(Long maKH, String trangThai);
	public int capNhatHD(Long maHD, double tienCoc);
	public List<HoaDon> timDSHDTrong(int soNgay);
	public List<HoaDon> timDSHDTheo(String ngayDau, String ngayCuoi);
}
