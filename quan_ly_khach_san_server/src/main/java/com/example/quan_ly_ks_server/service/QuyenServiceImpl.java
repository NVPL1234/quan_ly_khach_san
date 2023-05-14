package com.example.quan_ly_ks_server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quan_ly_ks_server.entity.Quyen;
import com.example.quan_ly_ks_server.repository.QuyenRepository;

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
