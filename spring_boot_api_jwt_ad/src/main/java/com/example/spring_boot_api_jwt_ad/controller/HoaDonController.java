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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_boot_api_jwt_ad.entity.HoaDon;
import com.example.spring_boot_api_jwt_ad.service.HoaDonService;

@RestController
@CrossOrigin
public class HoaDonController {

	@Autowired
	private HoaDonService hoaDonService;

	@PostMapping("/orders")
	public HoaDon luu(@RequestBody HoaDon hoaDon) {
		return hoaDonService.luu(hoaDon);
	}

	@GetMapping("/orders/maHD/{maHD}")
	public HoaDon layHD(@PathVariable Long maHD) {
		return hoaDonService.layHDTheo(maHD);
	}
	
	@GetMapping("/orders/{trangThai}")
	public List<HoaDon> layDSHD(@PathVariable String trangThai) {
		return hoaDonService.layDSHD(trangThai);
	}

//    @GetMapping("/roomOrder/maKH/{maKH}/trangThai/{trangThai}")
//    public List<Object> timDSHDPChuaThanhToan(@PathVariable Long maKH, @PathVariable String trangThai){
//    	return hoaDonPhongService.timDSHDPChuaThanhToan(maKH, trangThai);
//    }

	@GetMapping("/orders/{maKH}/{trangThai}")
	public List<HoaDon> layDSHD(@PathVariable Long maKH, @PathVariable String trangThai) {
		return hoaDonService.layDSHD(maKH, trangThai);
	}

	@GetMapping("/orders/soNgay/{soNgay}")	
	public List<Object> timDSHDTrong(@PathVariable int soNgay){
		return hoaDonService.timDSHDTrong(soNgay);
	}
	
	@GetMapping("/orders/ngayDau/{ngayDau}/ngayCuoi/{ngayCuoi}")
	public List<Object> timDSHDTheo(@PathVariable String ngayDau, @PathVariable String ngayCuoi){
		return hoaDonService.timDSHDTheo(ngayDau, ngayCuoi);
	}
	
	@PutMapping("/orders/{maHD}")
	public int capNhatNgayNhanPhong(@PathVariable Long maHD, @RequestParam("ngayNhanPhong") String ngayNhanPhong) {
		return hoaDonService.capNhatNgayNhanPhong(maHD, ngayNhanPhong);
	}

	@PutMapping("/orders/maHD/{maHD}/trangThai/{trangThai}")
	public void capNhatTrangThai(@PathVariable Long maHD, @PathVariable String trangThai) {
		hoaDonService.capNhatTrangThai(maHD, trangThai);
	}

	@PutMapping("/orders/{maHD}/{tienCoc}")
	public int capNhatHD(@PathVariable Long maHD, @PathVariable double tienCoc) {
		return hoaDonService.capNhatHD(maHD, tienCoc);
	}
	
	@DeleteMapping("/orders/{maHD}")
	public String xoa(@PathVariable Long maHD) {
		hoaDonService.xoa(maHD);
		return "Đã xoá hoá đơn " + maHD;
	}
}
