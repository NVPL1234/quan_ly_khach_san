package com.example.quan_ly_ks_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.quan_ly_ks_server.entity.TaiKhoan;

public interface UserRepository
        extends JpaRepository<TaiKhoan, Long> {

	TaiKhoan findByTenDangNhap(String tenDangNhap);
}