package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.Quyen;

public interface QuyenService {
	
	public Quyen layQuyenTheoMa(Long maQuyen);

	public List<Quyen> layDSQuyen();

	public void xoa(Long maQuyen);

	public Quyen luu(Quyen quyen);
}
