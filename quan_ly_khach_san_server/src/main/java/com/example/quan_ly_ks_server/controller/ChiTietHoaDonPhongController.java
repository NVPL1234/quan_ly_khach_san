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

import com.example.quan_ly_ks_server.entity.ChiTietHoaDonPhong;
import com.example.quan_ly_ks_server.service.ChiTietHoaDonPhongService;

@RestController
@CrossOrigin
public class ChiTietHoaDonPhongController {
	
	@Autowired
	private ChiTietHoaDonPhongService chiTietHoaDonPhongService;
	
	@PostMapping("/room_order_details")
    public ChiTietHoaDonPhong luu(@RequestBody ChiTietHoaDonPhong chiTietHoaDonPhong){
        return chiTietHoaDonPhongService.luu(chiTietHoaDonPhong);
    }

    @GetMapping("/room_order_details")
    public List<ChiTietHoaDonPhong> layDSCTHDP(){
        return chiTietHoaDonPhongService.layDSCTHDP();
    }

    @GetMapping("/room_order_details/{maHD}")
	public List<ChiTietHoaDonPhong> layDSCTHDP(@PathVariable Long maHD) {
		return chiTietHoaDonPhongService.layDSCTHDP(maHD);
	}
    
    @DeleteMapping("/room_order_details/{maHD}/{maPhong}")
    public String xoa(@PathVariable Long maHD, @PathVariable String maPhong){
    	chiTietHoaDonPhongService.xoa(maHD, maPhong);
        return "Đã xoá chi tiết hoá đơn phòng " + maHD;
    }
}
