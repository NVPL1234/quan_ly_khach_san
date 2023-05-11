package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_boot_api_jwt_ad.entity.LoaiDichVu;
import com.example.spring_boot_api_jwt_ad.repository.LoaiDichVuRepository;

@Service
public class LoaiDichVuServiceImpl implements LoaiDichVuService{

	@Autowired
	private LoaiDichVuRepository loaiDichVuRepository;
	
	@Override
	public LoaiDichVu layLoaiDVTheoMa(Long maLoaiDV) {
		return null;
	}

	@Override
	public List<LoaiDichVu> layDSLoaiDV() {
		return loaiDichVuRepository.findAll();
	}

	@Override
	public void xoa(Long maLoaiDV) {
		loaiDichVuRepository.deleteById(maLoaiDV);
	}

	@Override
	public LoaiDichVu luu(LoaiDichVu loaiDichVu) {
		return loaiDichVuRepository.save(loaiDichVu);
	}

}
