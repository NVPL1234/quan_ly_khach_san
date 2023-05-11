package com.example.spring_boot_api_jwt_ad.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.spring_boot_api_jwt_ad.entity.KhachHang;

public interface KhachHangRepository extends JpaRepository<KhachHang, Long>, KhachHangRepositoryCus {

}
