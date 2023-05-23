package com.example.quan_ly_ks_server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quan_ly_ks_server.entity.NhanVien;
import com.example.quan_ly_ks_server.entity.TaiKhoan;
import com.example.quan_ly_ks_server.repository.NhanVienRepository;
import com.example.quan_ly_ks_server.repository.UserRepository;

@Service
public class NhanVienServiceImpl implements NhanVienService {

	@Autowired
	private NhanVienRepository nhanVienRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public NhanVien layNVTheoMa(Long maNV) {
		NhanVien nhanVien = null;
		Optional<NhanVien> kq = nhanVienRepository.findById(maNV);
		try {
			nhanVien = kq.get();
			return nhanVien;
		} catch (Exception e) {
			return nhanVien;
		}
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
