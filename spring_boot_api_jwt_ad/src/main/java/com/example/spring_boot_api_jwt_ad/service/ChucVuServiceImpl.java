package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_boot_api_jwt_ad.entity.ChucVu;
import com.example.spring_boot_api_jwt_ad.repository.ChucVuRepository;

@Service
public class ChucVuServiceImpl implements ChucVuService{

    @Autowired
    private ChucVuRepository chucVuRepository;

    @Override
    public ChucVu layCVTheoMa(Long maCV) {
        return null;
    }

    @Override
    public List<ChucVu> layDSCV() {
        return chucVuRepository.findAll();
    }

    @Override
    public void xoa(Long maCV) {
        chucVuRepository.deleteById(maCV);
    }

    @Override
    public ChucVu luu(ChucVu chucVu) {
        return chucVuRepository.save(chucVu);
    }
    
}
