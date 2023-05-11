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

import com.example.spring_boot_api_jwt_ad.entity.ChucVu;
import com.example.spring_boot_api_jwt_ad.service.ChucVuService;

@RestController
@CrossOrigin
public class ChucVuController {
    
    @Autowired
    private ChucVuService chucVuService;

    @PostMapping("/positions")
    public ChucVu luu(@RequestBody ChucVu chucVu){
        return chucVuService.luu(chucVu);
    }

    @GetMapping("/positions")
    public List<ChucVu> layDSDV(){
        return chucVuService.layDSCV();
    }

    @DeleteMapping("/positions/{maCV}")
    public String xoa(@PathVariable Long maCV){
        chucVuService.xoa(maCV);
        return "Đã xoá chức vụ " + maCV;
    }
}
