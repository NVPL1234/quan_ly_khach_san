package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_boot_api_jwt_ad.entity.Tang;
import com.example.spring_boot_api_jwt_ad.repository.TangRepository;

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
