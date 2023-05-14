package com.example.quan_ly_ks_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.quan_ly_ks_server.entity.KhachHang;

public interface KhachHangRepository extends JpaRepository<KhachHang, Long>, KhachHangRepositoryCus {

}
