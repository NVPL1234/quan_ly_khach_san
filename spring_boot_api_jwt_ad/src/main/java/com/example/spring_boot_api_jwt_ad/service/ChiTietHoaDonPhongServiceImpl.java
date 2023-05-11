package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_boot_api_jwt_ad.entity.ChiTietHoaDonPhong;
import com.example.spring_boot_api_jwt_ad.repository.ChiTietHoaDonPhongRepository;

@Service
public class ChiTietHoaDonPhongServiceImpl implements ChiTietHoaDonPhongService {
	
	@Autowired
	private ChiTietHoaDonPhongRepository chiTietHoaDonPhongRepository;

	@Override
	public List<ChiTietHoaDonPhong> layDSCTHDPTheoMa(Long maHD) {
		return chiTietHoaDonPhongRepository.layDSCTHDPTheoMa(maHD);
	}

	@Override
	public List<ChiTietHoaDonPhong> layDSCTHDP() {
		return chiTietHoaDonPhongRepository.layDSCTHDP();
	}

	@Override
	public void xoa(Long maHD, String maPhong) {
		chiTietHoaDonPhongRepository.xoa(maHD, maPhong);
	}

	@Override
	public ChiTietHoaDonPhong luu(ChiTietHoaDonPhong chiTietHoaDonPhong) {
		return chiTietHoaDonPhongRepository.luu(chiTietHoaDonPhong);
	}
	
	@Override
	public List<ChiTietHoaDonPhong> layDSCTHDP(Long maHD) {
		return chiTietHoaDonPhongRepository.layDSCTHDP(maHD);
	}
}
