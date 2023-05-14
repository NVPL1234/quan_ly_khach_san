package com.example.quan_ly_ks_server.repository;

import java.util.List;

import com.example.quan_ly_ks_server.entity.DichVu;

public interface DichVuRepositoryCus {
	public void capNhatSoLuong(Long maDV, int soLuong);
	public List<DichVu> timDVTheoLoai(Long maLoaiDV);
	public List<DichVu> timDVTheoTen(String tenDV);
	public List<Object> timDSDVTrong(int soNgay);
	public List<Object> timDSDVTheo(String ngayDau, String ngayCuoi);
}
