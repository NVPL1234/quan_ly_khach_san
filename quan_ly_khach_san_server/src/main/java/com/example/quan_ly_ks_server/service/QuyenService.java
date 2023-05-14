package com.example.quan_ly_ks_server.service;

import java.util.List;

import com.example.quan_ly_ks_server.entity.Quyen;

public interface QuyenService {
	
	public Quyen layQuyenTheoMa(Long maQuyen);

	public List<Quyen> layDSQuyen();

	public void xoa(Long maQuyen);

	public Quyen luu(Quyen quyen);
}
