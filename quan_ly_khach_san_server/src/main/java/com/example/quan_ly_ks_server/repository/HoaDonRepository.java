package com.example.quan_ly_ks_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.quan_ly_ks_server.entity.HoaDon;

public interface HoaDonRepository extends JpaRepository<HoaDon, Long>, HoaDonRepositoryCus {

}
