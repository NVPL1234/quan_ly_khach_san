package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.Tang;

public interface TangService {
	
	public Tang layTangTheoMa(Long maTang);

	public List<Tang> layDSTang();

	public void xoa(Long maTang);

	public Tang luu(Tang tang);
}
