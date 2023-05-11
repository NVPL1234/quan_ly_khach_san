package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.LoaiDichVu;

public interface LoaiDichVuService {
	public LoaiDichVu layLoaiDVTheoMa(Long maLoaiDV);

	public List<LoaiDichVu> layDSLoaiDV();

	public void xoa(Long maLoaiDV);

	public LoaiDichVu luu(LoaiDichVu loaiDichVu);
}
