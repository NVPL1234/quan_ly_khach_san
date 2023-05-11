package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_boot_api_jwt_ad.entity.LoaiPhong;
import com.example.spring_boot_api_jwt_ad.repository.LoaiPhongRepository;

@Service
public class LoaiPhongServiceImpl implements LoaiPhongService {

	@Autowired
	private LoaiPhongRepository loaiPhongRepository;

	@Override
	public LoaiPhong layLoaiPhongTheoMa(Long maLoaiPhong) {
		return null;
	}

	@Override
	public List<LoaiPhong> layDSLoaiPhong() {
		return loaiPhongRepository.findAll();
	}

	@Override
	public void xoa(Long maLoaiPhong) {
		loaiPhongRepository.deleteById(maLoaiPhong);
	}

	@Override
	public LoaiPhong luu(LoaiPhong loaiPhong) {
		return loaiPhongRepository.save(loaiPhong);
	}
}
