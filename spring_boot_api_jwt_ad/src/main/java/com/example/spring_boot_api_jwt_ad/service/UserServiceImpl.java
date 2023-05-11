package com.example.spring_boot_api_jwt_ad.service;

import com.example.spring_boot_api_jwt_ad.entity.TaiKhoan;
import com.example.spring_boot_api_jwt_ad.repository.UserRepository;
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