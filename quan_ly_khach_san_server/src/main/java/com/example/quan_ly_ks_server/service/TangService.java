package com.example.quan_ly_ks_server.service;

import java.util.List;

import com.example.quan_ly_ks_server.entity.Tang;

public interface TangService {
	
	public Tang layTangTheoMa(Long maTang);

	public List<Tang> layDSTang();

	public void xoa(Long maTang);

	public Tang luu(Tang tang);
}
