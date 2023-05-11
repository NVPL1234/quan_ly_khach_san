package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.DichVu;

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
