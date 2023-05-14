package com.example.quan_ly_ks_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.quan_ly_ks_server.entity.DichVu;

public interface DichVuRepository extends JpaRepository<DichVu, Long>, DichVuRepositoryCus{

}
