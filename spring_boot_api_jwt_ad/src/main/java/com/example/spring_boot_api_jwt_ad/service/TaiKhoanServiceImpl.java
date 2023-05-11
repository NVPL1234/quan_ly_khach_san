package com.example.spring_boot_api_jwt_ad.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_boot_api_jwt_ad.entity.TaiKhoan;
import com.example.spring_boot_api_jwt_ad.repository.TaiKhoanRepository;

@Service
public class TaiKhoanServiceImpl implements TaiKhoanService{
	
	@Autowired
	private TaiKhoanRepository taiKhoanRepository;

	@Override
	public void xoa(Long maTK) {
		taiKhoanRepository.deleteById(maTK);
	}

	@Override
	public TaiKhoan luu(TaiKhoan taiKhoan) {
		return taiKhoanRepository.save(taiKhoan);
	}

}
