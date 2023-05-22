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

import com.example.quan_ly_ks_server.entity.LoaiDichVu;
import com.example.quan_ly_ks_server.entity.LoaiPhong;
import com.example.quan_ly_ks_server.service.LoaiPhongService;

@RestController
@CrossOrigin
public class LoaiPhongController {

	@Autowired
	private LoaiPhongService loaiPhongService;

	@PostMapping("/room_categories")
	public LoaiPhong luu(@RequestBody LoaiPhong loaiPhong) {
		return loaiPhongService.luu(loaiPhong);
	}

	@GetMapping("/room_categories")
	public List<LoaiPhong> layDSLoaiPhong() {
		return loaiPhongService.layDSLoaiPhong();
	}
	
	@GetMapping("/room_categories/{maLoaiPhong}")
    public LoaiPhong layLoaiPhongTheoMa(@PathVariable Long maLoaiPhong){
        return loaiPhongService.layLoaiPhongTheoMa(maLoaiPhong);
    }

	@DeleteMapping("/room_categories/{maLoaiPhong}")
	public String xoa(@PathVariable Long maLoaiPhong) {
		loaiPhongService.xoa(maLoaiPhong);
		return "Đã xoá loại phòng" + maLoaiPhong;
	}
	
}
