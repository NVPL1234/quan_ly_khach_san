package com.example.quan_ly_ks_server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quan_ly_ks_server.entity.TaiKhoan;
import com.example.quan_ly_ks_server.repository.TaiKhoanRepository;

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
