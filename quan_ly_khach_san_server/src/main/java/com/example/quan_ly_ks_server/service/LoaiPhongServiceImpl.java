package com.example.quan_ly_ks_server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quan_ly_ks_server.entity.LoaiPhong;
import com.example.quan_ly_ks_server.repository.LoaiPhongRepository;

@Service
public class LoaiPhongServiceImpl implements LoaiPhongService {

	@Autowired
	private LoaiPhongRepository loaiPhongRepository;

	@Override
	public LoaiPhong layLoaiPhongTheoMa(Long maLoaiPhong) {
		LoaiPhong loaiPhong = null;
		Optional<LoaiPhong> kq = loaiPhongRepository.findById(maLoaiPhong);
		try {
			loaiPhong = kq.get();
			return loaiPhong;
		} catch (Exception e) {
			return loaiPhong;
		}
	}

	@Override
	public List<LoaiPhong> layDSLoaiPhong() {
		return loaiPhongRepository.findAll();
	}

	@Override
	public void xoa(Long maLoaiPhong) {
		loaiPhongRepository.deleteById(maLoaiPhong);
	}

	@Override
	public LoaiPhong luu(LoaiPhong loaiPhong) {
		return loaiPhongRepository.save(loaiPhong);
	}
}
