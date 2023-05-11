package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.LoaiPhong;

public interface LoaiPhongService {
	public LoaiPhong layLoaiPhongTheoMa(Long maLoaiPhong);

	public List<LoaiPhong> layDSLoaiPhong();

	public void xoa(Long maLoaiPhong);

	public LoaiPhong luu(LoaiPhong loaiPhong);
}
