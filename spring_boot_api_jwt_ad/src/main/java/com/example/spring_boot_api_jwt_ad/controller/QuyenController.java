package com.example.spring_boot_api_jwt_ad.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_boot_api_jwt_ad.entity.Quyen;
import com.example.spring_boot_api_jwt_ad.service.QuyenService;

@RestController
@CrossOrigin
public class QuyenController {
	
	@Autowired
    private QuyenService quyenService;

    @PostMapping("/permissions")
    public Quyen luu(@RequestBody Quyen quyen){
        return quyenService.luu(quyen);
    }

    @GetMapping("/permissions")
    public List<Quyen> layDSQuyen(){
        return quyenService.layDSQuyen();
    }

    @DeleteMapping("/permissions/{maQuyen}")
    public String xoa(@PathVariable Long maQuyen){
        quyenService.xoa(maQuyen);
        return "Đã xoá quyền " + maQuyen;
    }

}
