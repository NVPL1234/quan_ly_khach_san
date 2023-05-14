package com.example.quan_ly_ks_server.controller;

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

import com.example.quan_ly_ks_server.entity.DichVu;
import com.example.quan_ly_ks_server.service.DichVuService;

@RestController
@CrossOrigin
public class DichVuController {

	@Autowired
	private DichVuService dichVuService;
	
	@PostMapping("/services")
	public DichVu luu(@RequestBody DichVu dichVu) {
		return dichVuService.luu(dichVu);
	}

	@GetMapping("/services")
	public List<DichVu> layDSDV() {
		return dichVuService.layDSDV();
	}

	@GetMapping("/services/maDV/{maDV}")
	public DichVu layDV(@PathVariable Long maDV) {
		return dichVuService.layDVTheoMa(maDV);
	}

	@GetMapping("/services/maLoaiDV/{maLoaiDV}")
	public List<DichVu> timDVTheoLoai(@PathVariable Long maLoaiDV) {
		return dichVuService.timDVTheoLoai(maLoaiDV);
	}

	@GetMapping("/services/tenDV/{tenDV}")
	public List<DichVu> timDVTheoTen(@PathVariable String tenDV) {
		return dichVuService.timDVTheoTen(tenDV);
	}

	@GetMapping("/services/soNgay/{soNgay}")
	public List<Object> timDSDVTrong(@PathVariable int soNgay){
		return dichVuService.timDSDVTrong(soNgay);
	}
	
	@GetMapping("/services/ngayDau/{ngayDau}/ngayCuoi/{ngayCuoi}")
	public List<Object> timDSDVTheo(@PathVariable String ngayDau, @PathVariable String ngayCuoi){
		return dichVuService.timDSDVTheo(ngayDau, ngayCuoi);
	}
	
	@DeleteMapping("/services/{maDV}")
	public String xoa(@PathVariable Long maDV) {
		dichVuService.xoa(maDV);
		return "Đã xoá dịch vụ " + maDV;
	}

	@PutMapping("/services/{maDV}/{soLuongMoi}")
	public String capNhatSoLuong(@PathVariable Long maDV, @PathVariable int soLuongMoi) {
		DichVu dichVu = dichVuService.layDVTheoMa(maDV);
		if (soLuongMoi >= 0) {
			soLuongMoi = dichVu.getSoLuong() - soLuongMoi;
			dichVuService.capNhatSoLuong(maDV, soLuongMoi);
			return "Đã cập nhật";
		} 
		else {
			soLuongMoi = dichVu.getSoLuong() - soLuongMoi;
			dichVuService.capNhatSoLuong(maDV, soLuongMoi);
			return "Đã cập nhật";
		}
	}

	@PutMapping("/services/{maDV}/{soLuong}/{tangGiam}")
	public String capNhatSoLuong(@PathVariable Long maDV, @PathVariable int soLuong, @PathVariable String tangGiam) {
		if (tangGiam.equals("Giam")) {
			DichVu dichVu = dichVuService.layDVTheoMa(maDV);
			soLuong = dichVu.getSoLuong() - soLuong;
			dichVuService.capNhatSoLuong(maDV, soLuong);
			return "Đã cập nhật";
		} else {
			DichVu dichVu = dichVuService.layDVTheoMa(maDV);
			soLuong = dichVu.getSoLuong() + soLuong;
			dichVuService.capNhatSoLuong(maDV, soLuong);
			return "Đã cập nhật";
		}
	}
}
