package com.example.quan_ly_ks_server.service;

import java.util.List;

import com.example.quan_ly_ks_server.entity.NhanVien;

public interface NhanVienService {
	public NhanVien layNVTheoMa(Long maNV);

	public List<NhanVien> layDSNV();

	public void xoa(Long maNV);

	public NhanVien luu(NhanVien nhanVien);
}
