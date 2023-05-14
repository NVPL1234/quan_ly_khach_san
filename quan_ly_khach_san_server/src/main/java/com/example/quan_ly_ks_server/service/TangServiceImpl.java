package com.example.quan_ly_ks_server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quan_ly_ks_server.entity.Tang;
import com.example.quan_ly_ks_server.repository.TangRepository;

@Service
public class TangServiceImpl implements TangService{

	@Autowired
	private TangRepository tangRepository;
	
	@Override
	public Tang layTangTheoMa(Long maTang) {
		return null;
	}

	@Override
	public List<Tang> layDSTang() {
		return tangRepository.findAll();
	}

	@Override
	public void xoa(Long maTang) {
		tangRepository.deleteById(maTang);
	}

	@Override
	public Tang luu(Tang tang) {
		return tangRepository.save(tang);
	}

}
