package com.example.quan_ly_ks_server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quan_ly_ks_server.entity.KhachHang;
import com.example.quan_ly_ks_server.entity.TaiKhoan;
import com.example.quan_ly_ks_server.repository.KhachHangRepository;
import com.example.quan_ly_ks_server.repository.UserRepository;

@Service
public class KhachHangServiceImpl implements KhachHangService {

	@Autowired
	private KhachHangRepository khachHangRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public KhachHang layKHTheoMa(Long maKH) {
		Optional<KhachHang> kq = khachHangRepository.findById(maKH);
		return kq.get();
	}

	@Override
	public List<KhachHang> layDSKH() {
		return khachHangRepository.findAll();
	}

	@Override
	public void xoa(Long maKH) {
		Optional<TaiKhoan> kq = userRepository.findById(maKH);			
		TaiKhoan tk = kq.get();
		userRepository.deleteById(tk.getMaTK());
	}

	@Override
	public KhachHang luu(KhachHang khachHang) {	
		if(khachHang.getTaiKhoan() != null) {
			Optional<TaiKhoan> kq = userRepository.findById(khachHang.getTaiKhoan().getMaTK());			
			TaiKhoan tk = kq.get();
			khachHang.setTaiKhoan(tk);
		}
		return khachHangRepository.saveAndFlush(khachHang);
	}

	@Override
	public KhachHang timKHTheoCCCD(String cccd) {
		return khachHangRepository.timKHTheoCCCD(cccd);
	}

	@Override
	public KhachHang timKHTheoSDT(String sdt) {
		return khachHangRepository.timKHTheoSDT(sdt);
	}

	@Override
	public Long timMaKHTheoPhong(String maPhong) {
		return khachHangRepository.timMaKHTheoPhong(maPhong);
	}
}
