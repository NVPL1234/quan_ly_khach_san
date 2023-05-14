package com.example.quan_ly_ks_server.service;

import com.example.quan_ly_ks_server.entity.TaiKhoan;
import com.example.quan_ly_ks_server.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public TaiKhoan createUser(TaiKhoan nguoiDung) {
		return userRepository.save(nguoiDung);
	}

	@Override
	public TaiKhoan findByTenDangNhap(String tenDangNhap) {
		return userRepository.findByTenDangNhap(tenDangNhap);

	}

}