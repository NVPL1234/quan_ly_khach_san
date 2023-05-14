package com.example.quan_ly_ks_server.service;

import java.util.List;

import com.example.quan_ly_ks_server.entity.LoaiPhong;

public interface LoaiPhongService {
	public LoaiPhong layLoaiPhongTheoMa(Long maLoaiPhong);

	public List<LoaiPhong> layDSLoaiPhong();

	public void xoa(Long maLoaiPhong);

	public LoaiPhong luu(LoaiPhong loaiPhong);
}
