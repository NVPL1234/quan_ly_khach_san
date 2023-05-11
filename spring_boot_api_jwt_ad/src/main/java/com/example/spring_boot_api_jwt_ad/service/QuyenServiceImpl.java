package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_boot_api_jwt_ad.entity.Quyen;
import com.example.spring_boot_api_jwt_ad.repository.QuyenRepository;

@Service
public class QuyenServiceImpl implements QuyenService{

	@Autowired
	private QuyenRepository quyenRepository;
	
	@Override
	public Quyen layQuyenTheoMa(Long maQuyen) {
		return null;
	}

	@Override
	public List<Quyen> layDSQuyen() {
		return quyenRepository.findAll();
	}

	@Override
	public void xoa(Long maQuyen) {
		quyenRepository.deleteById(maQuyen);
	}

	@Override
	public Quyen luu(Quyen quyen) {
		return quyenRepository.save(quyen);
	}
}
