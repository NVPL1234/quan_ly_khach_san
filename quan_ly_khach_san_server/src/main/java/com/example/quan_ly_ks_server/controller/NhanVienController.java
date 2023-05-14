package com.example.quan_ly_ks_server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.quan_ly_ks_server.entity.NhanVien;
import com.example.quan_ly_ks_server.service.NhanVienService;

@RestController
@CrossOrigin
public class NhanVienController {

	@Autowired
	private NhanVienService nhanVienService;

	@GetMapping("/employees")
	public List<NhanVien> layDSNV(){
		return nhanVienService.layDSNV();
	}

	@GetMapping("/employees/{maNV}")
	public NhanVien layNVTheoMa(@PathVariable Long maNV){
		return nhanVienService.layNVTheoMa(maNV);
	}
	
	@PostMapping("/employees")
	public NhanVien luu(@RequestBody NhanVien nhanVien) {
		return nhanVienService.luu(nhanVien);
	}

	@DeleteMapping("/employees/{maNV}")
	public String xoa(@PathVariable Long maNV) {
		nhanVienService.xoa(maNV);
		return "Đã xoá nhân viên " + maNV;
	}
}
