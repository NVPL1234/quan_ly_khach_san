package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import com.example.spring_boot_api_jwt_ad.entity.ChucVu;

public interface ChucVuService {

    public ChucVu layCVTheoMa(Long maCV);

	public List<ChucVu> layDSCV();

	public void xoa(Long maCV);

	public ChucVu luu(ChucVu chucVu);
}
