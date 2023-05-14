package com.example.quan_ly_ks_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.quan_ly_ks_server.entity.Phong;

public interface PhongRepository extends JpaRepository<Phong, String>, PhongRepositoryCus{
	
}
