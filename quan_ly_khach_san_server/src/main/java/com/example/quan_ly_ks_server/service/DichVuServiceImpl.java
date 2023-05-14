package com.example.quan_ly_ks_server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quan_ly_ks_server.entity.DichVu;
import com.example.quan_ly_ks_server.repository.DichVuRepository;

@Service
public class DichVuServiceImpl implements DichVuService{
	
	@Autowired
	private DichVuRepository dichVuRepository;

	@Override
	public DichVu layDVTheoMa(Long maDV) {
		Optional<DichVu> kq = dichVuRepository.findById(maDV);
		return kq.get();
	}

	@Override
	public List<DichVu> layDSDV() {
		return dichVuRepository.findAll();
	}

	@Override
	public void xoa(Long maDV) {
		dichVuRepository.deleteById(maDV);
	}

	@Override
	public DichVu luu(DichVu dichVu) {
		return dichVuRepository.save(dichVu);
	}

	@Override
	public void capNhatSoLuong(Long maDV, int soLuong) {
		dichVuRepository.capNhatSoLuong(maDV, soLuong);
	}

	@Override
	public List<DichVu> timDVTheoLoai(Long maLoaiDV) {
		return dichVuRepository.timDVTheoLoai(maLoaiDV);
	}

	@Override
	public List<DichVu> timDVTheoTen(String tenDV) {
		return dichVuRepository.timDVTheoTen(tenDV);
	}

	@Override
	public List<Object> timDSDVTrong(int soNgay) {
		return dichVuRepository.timDSDVTrong(soNgay);
	}

	@Override
	public List<Object> timDSDVTheo(String ngayDau, String ngayCuoi) {
		return dichVuRepository.timDSDVTheo(ngayDau, ngayCuoi);
	}

}
