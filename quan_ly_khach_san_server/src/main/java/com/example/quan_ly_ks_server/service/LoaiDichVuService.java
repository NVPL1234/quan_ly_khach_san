package com.example.quan_ly_ks_server.service;

import java.util.List;

import com.example.quan_ly_ks_server.entity.LoaiDichVu;

public interface LoaiDichVuService {
	public LoaiDichVu layLoaiDVTheoMa(Long maLoaiDV);

	public List<LoaiDichVu> layDSLoaiDV();

	public void xoa(Long maLoaiDV);

	public LoaiDichVu luu(LoaiDichVu loaiDichVu);
}
