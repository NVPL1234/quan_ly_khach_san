package com.example.spring_boot_api_jwt_ad.repository;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.Phong;

public interface PhongRepositoryCus {
	public void capNhatTrangThai(String maPhong, String trangThai);
	public List<Phong> timPhong(Long maLoaiPhong, int soGiuong);
	public List<Object> timPhong(Long maKH, String trangThai);
	public List<Phong> layDSPTheoTrangThai(String trangThai);
	public List<Phong> timPhongTrongTheoNgay(String ngayNhanPhong, String ngayTraPhong);
	public List<Object> timMaPhongTheoTrangThai(String maPhong, String trangThai);
	public List<Object> timDSPTrong(int soNgay);
	public List<Object> timDSPTheo(String ngayDau, String ngayCuoi);
}
