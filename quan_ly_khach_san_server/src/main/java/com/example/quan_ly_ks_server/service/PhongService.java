package com.example.quan_ly_ks_server.service;

import java.util.List;

import com.example.quan_ly_ks_server.entity.Phong;

public interface PhongService {
	public Phong layPhongTheoMa(String maPhong);
	public List<Phong> layDSPhong();
	public void xoa(String maPhong);
	public Phong luu(Phong phong);
	public void capNhatTrangThai(String maPhong, String trangThai);
	public List<Phong> timPhong(Long maLoaiPhong, int soGiuong);
	public List<Object> timPhong(Long maKH, String trangThai);
	public List<Phong> layDSPTheoTrangThai(String trangThai);
	public List<Phong> timPhongTrongTheoNgay(String ngayNhanPhong, String ngayTraPhong);
	public List<Object> timMaPhongTheoTrangThai(String maPhong, String trangThai);
	public List<Object> timDSPTrong(int soNgay);
	public List<Object> timDSPTheo(String ngayDau, String ngayCuoi);
}
