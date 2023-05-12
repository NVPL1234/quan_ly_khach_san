package com.example.spring_boot_api_jwt_ad.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.spring_boot_api_jwt_ad.entity.NhanVien;
import com.example.spring_boot_api_jwt_ad.entity.TaiKhoan;
import com.example.spring_boot_api_jwt_ad.repository.NhanVienRepository;
import com.example.spring_boot_api_jwt_ad.repository.UserRepository;

@Service
public class NhanVienServiceImpl implements NhanVienService {

	@Autowired
	private NhanVienRepository nhanVienRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public NhanVien layNVTheoMa(Long maNV) {
		Optional<NhanVien> kq = nhanVienRepository.findById(maNV);
		return kq.get();
	}

	@Override
	public List<NhanVien> layDSNV() {
		return nhanVienRepository.findAll();
	}

	@Override
	public void xoa(Long maNV) {
		Optional<TaiKhoan> kq = userRepository.findById(maNV);			
		TaiKhoan taiKhoan = kq.get();
		userRepository.deleteById(taiKhoan.getMaTK());
	}

	@Override
	public NhanVien luu(NhanVien nhanVien) {
		if(nhanVien.getTaiKhoan() != null) {
			Optional<TaiKhoan> kq = userRepository.findById(nhanVien.getTaiKhoan().getMaTK());			
			TaiKhoan tk = kq.get();
			nhanVien.setTaiKhoan(tk);
		}
		return nhanVienRepository.save(nhanVien);
	}
}
