package com.example.quan_ly_ks_server.service;

import java.util.List;

import com.example.quan_ly_ks_server.entity.ChucVu;

public interface ChucVuService {

    public ChucVu layCVTheoMa(Long maCV);

	public List<ChucVu> layDSCV();

	public void xoa(Long maCV);

	public ChucVu luu(ChucVu chucVu);
}
