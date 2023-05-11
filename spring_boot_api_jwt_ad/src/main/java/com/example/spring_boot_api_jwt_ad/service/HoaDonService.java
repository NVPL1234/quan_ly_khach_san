package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.HoaDon;

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
	public int capNhatHD(Long maHD, String ngayLapHD, String ngayNhanPhong, String ngayTraPhong, String loaiThue);
	public List<Object> timDSHDTrong(int soNgay);
	public List<Object> timDSHDTheo(String ngayDau, String ngayCuoi);
}
