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

import com.example.quan_ly_ks_server.entity.KhachHang;
import com.example.quan_ly_ks_server.service.KhachHangService;

@RestController
@CrossOrigin
public class KhachHangController {

	@Autowired
	private KhachHangService khachHangService;

	@GetMapping("/customers")
	public List<KhachHang> layDSKH(){
		return khachHangService.layDSKH();
	}
	
	@GetMapping("/customers/{maKH}")
	public KhachHang layKHTheoMa(@PathVariable Long maKH){
		return khachHangService.layKHTheoMa(maKH);
	}

	@GetMapping("/customers/cccd/{cccd}")
	public KhachHang timKHTheoCCCD(@PathVariable String cccd) {
		return khachHangService.timKHTheoCCCD(cccd);
	}
	
	@GetMapping("/customers/sdt/{sdt}")
	public KhachHang timKHTheoSDT(@PathVariable String sdt) {
		return khachHangService.timKHTheoSDT(sdt);
	}
	
	@GetMapping("/customers/maPhong/{maPhong}")
	public Long timMaKHTheoPhong(@PathVariable String maPhong) {
		return khachHangService.timMaKHTheoPhong(maPhong);
	}
	
	@PostMapping("/customers")
	public KhachHang luu(@RequestBody KhachHang khachHang) {
		return khachHangService.luu(khachHang);
	}

	@DeleteMapping("/customers/{maKH}")
    public String xoa(@PathVariable Long maKH){
        khachHangService.xoa(maKH);
        return "Đã xoá khách hàng " + maKH;
    }
}
