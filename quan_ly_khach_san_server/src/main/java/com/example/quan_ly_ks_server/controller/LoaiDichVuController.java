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
import com.example.quan_ly_ks_server.service.LoaiDichVuService;

@RestController
@CrossOrigin
public class LoaiDichVuController {
	
	@Autowired
    private LoaiDichVuService loaiDichVuService;

    @PostMapping("/service_categories")
    public LoaiDichVu luu(@RequestBody LoaiDichVu loaiDichVu){
        return loaiDichVuService.luu(loaiDichVu);
    }

    @GetMapping("/service_categories")
    public List<LoaiDichVu> layDSLoaiDV(){
        return loaiDichVuService.layDSLoaiDV();
    }

    @GetMapping("/service_categories/{maLoaiDV}")
    public LoaiDichVu layLoaiDVTheoMa(@PathVariable Long maLoaiDV){
        return loaiDichVuService.layLoaiDVTheoMa(maLoaiDV);
    }
    
    @DeleteMapping("/service_categories/{maLoaiDV}")
    public String xoa(@PathVariable Long maLoaiDV){
        loaiDichVuService.xoa(maLoaiDV);
        return "Đã xoá loại dịch vụ " + maLoaiDV;
    }
}
