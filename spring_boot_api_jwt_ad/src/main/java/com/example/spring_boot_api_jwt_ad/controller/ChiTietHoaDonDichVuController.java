package com.example.spring_boot_api_jwt_ad.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_boot_api_jwt_ad.entity.ChiTietHoaDonDichVu;
import com.example.spring_boot_api_jwt_ad.service.ChiTietHoaDonDichVuService;

@RestController
@CrossOrigin
public class ChiTietHoaDonDichVuController {

	@Autowired
	private ChiTietHoaDonDichVuService chiTietHoaDonDichVuService;

	@PostMapping("/service_order_details")
	public ChiTietHoaDonDichVu luu(@RequestBody ChiTietHoaDonDichVu chiTietHoaDonDichVu) {
		return chiTietHoaDonDichVuService.luu(chiTietHoaDonDichVu);
	}

	@GetMapping("/service_order_details")
	public List<ChiTietHoaDonDichVu> layDSCTHDDV() {
		return chiTietHoaDonDichVuService.layDSCTHDDV();
	}

	@GetMapping("/service_order_details/{maHD}")
	public List<ChiTietHoaDonDichVu> layDSCTHDDV(@PathVariable Long maHD) {
		return chiTietHoaDonDichVuService.layDSCTHDDVTheoMa(maHD);
	}
	
	@GetMapping("/service_order_details/{maHD}/{maDV}")
	public ChiTietHoaDonDichVu layCTHDDV(@PathVariable Long maHD, @PathVariable Long maDV) {
		return chiTietHoaDonDichVuService.timCTHDDVTheo(maHD, maDV);
	}

	@DeleteMapping("/service_order_details/{maHD}/{maDV}")
	public String xoa(@PathVariable Long maHD, @PathVariable Long maDV) {
		chiTietHoaDonDichVuService.xoa(maHD, maDV);
		return "Đã xoá chi tiết hoá đơn dịch vụ " + maDV;
	}
	
	@PutMapping("/service_order_details/{maHD}/{maDV}/{soLuong}")
	public String capNhatSoLuong(@PathVariable Long maHD, @PathVariable Long maDV, @PathVariable int soLuong) {
		chiTietHoaDonDichVuService.capNhatSoLuong(maHD, maDV, soLuong);
		return "Đã cập nhật";
	}
}
