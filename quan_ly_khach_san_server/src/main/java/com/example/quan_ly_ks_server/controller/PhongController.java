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

import com.example.quan_ly_ks_server.entity.Phong;
import com.example.quan_ly_ks_server.service.PhongService;

@RestController
@CrossOrigin
public class PhongController {

	@Autowired
	private PhongService phongService;

	@PostMapping("/rooms")
	public Phong luu(@RequestBody Phong phong) {
		return phongService.luu(phong);
	}

	@GetMapping("/rooms")
	public List<Phong> layDSPhong() {
		return phongService.layDSPhong();
	}

	@GetMapping("/rooms/maPhong/{maPhong}/trangThai/{trangThai}")
	public List<Object> timMaPhongTheoTrangThai(@PathVariable String maPhong, @PathVariable String trangThai) {
		return phongService.timMaPhongTheoTrangThai(maPhong, trangThai);
	}
	
	@GetMapping("/rooms/{maPhong}")
	public Phong layPhongTheoMa(@PathVariable String maPhong) {
		return phongService.layPhongTheoMa(maPhong);
	}
	
	@GetMapping("/rooms/ngayNhanPhong/{ngayNhanPhong}/ngayTraPhong/{ngayTraPhong}")
	public List<Phong> timPhongTrongTheoNgay(@PathVariable String ngayNhanPhong, @PathVariable String ngayTraPhong) {
		return phongService.timPhongTrongTheoNgay(ngayNhanPhong, ngayTraPhong);
	}

	@GetMapping("/rooms/trangThai/{trangThai}")
	public List<Phong> layDSPTheoTrangThai(@PathVariable String trangThai) {
		return phongService.layDSPTheoTrangThai(trangThai);
	}

	@GetMapping("/rooms/{maKH}/{trangThai}")
	public List<Object> timPhongTheoKHTT(@PathVariable Long maKH, @PathVariable String trangThai) {
		return phongService.timPhong(maKH, trangThai);
	}

	@GetMapping("/rooms/maLoaiPhong/{maLoaiPhong}/soGiuong/{soGiuong}")
	public List<Phong> timPhongTheoLPSG(@PathVariable Long maLoaiPhong, @PathVariable int soGiuong) {
		return phongService.timPhong(maLoaiPhong, soGiuong);
	}

	@GetMapping("/rooms/soNgay/{soNgay}")
	public List<Object> timDSPTrong(@PathVariable int soNgay){
		return phongService.timDSPTrong(soNgay);
	}
	
	@GetMapping("/rooms/ngayDau/{ngayDau}/ngayCuoi/{ngayCuoi}")
	public List<Object> timDSPTheo(@PathVariable String ngayDau, @PathVariable String ngayCuoi){
		return phongService.timDSPTheo(ngayDau, ngayCuoi);
	}
	
	@DeleteMapping("/rooms/{maPhong}")
	public String xoa(@PathVariable String maPhong) {
		phongService.xoa(maPhong);
		return "Đã xoá phòng " + maPhong;
	}

	@PutMapping("/rooms/{maPhong}/{trangThai}")
	public String capNhatTrangThai(@PathVariable String maPhong, @PathVariable String trangThai) {
		phongService.capNhatTrangThai(maPhong, trangThai);
		return "Đã cập nhật";
	}
}
