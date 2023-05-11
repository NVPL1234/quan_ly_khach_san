package com.example.spring_boot_api_jwt_ad.repository;

import com.example.spring_boot_api_jwt_ad.entity.TaiKhoan;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository
        extends JpaRepository<TaiKhoan, Long> {

	TaiKhoan findByTenDangNhap(String tenDangNhap);
}