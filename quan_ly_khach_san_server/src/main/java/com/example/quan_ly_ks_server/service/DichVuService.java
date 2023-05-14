package com.example.quan_ly_ks_server.service;

import java.util.List;

import com.example.quan_ly_ks_server.entity.DichVu;

public interface DichVuService {
	
	public DichVu layDVTheoMa(Long maDV);

	public List<DichVu> layDSDV();

	public void xoa(Long maDV);

	public DichVu luu(DichVu dichVu);
	
	public void capNhatSoLuong(Long maDV, int soLuong);
	
	public List<DichVu> timDVTheoLoai(Long maLoaiDV);
	
	public List<DichVu> timDVTheoTen(String tenDV);
	
	public List<Object> timDSDVTrong(int soNgay);
	
	public List<Object> timDSDVTheo(String ngayDau, String ngayCuoi);
}
