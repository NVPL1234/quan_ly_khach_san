package com.example.quan_ly_ks_server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quan_ly_ks_server.entity.LoaiDichVu;
import com.example.quan_ly_ks_server.repository.LoaiDichVuRepository;

@Service
public class LoaiDichVuServiceImpl implements LoaiDichVuService{

	@Autowired
	private LoaiDichVuRepository loaiDichVuRepository;
	
	@Override
	public LoaiDichVu layLoaiDVTheoMa(Long maLoaiDV) {
		Optional<LoaiDichVu> kq = loaiDichVuRepository.findById(maLoaiDV);
		return kq.get();
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
