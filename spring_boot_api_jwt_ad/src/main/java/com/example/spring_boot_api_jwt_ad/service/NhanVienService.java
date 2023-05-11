package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.NhanVien;

public interface NhanVienService {
	public NhanVien layNVTheoMa(Long maNV);

	public List<NhanVien> layDSNV();

	public void xoa(Long maNV);

	public NhanVien luu(NhanVien nhanVien);
}
