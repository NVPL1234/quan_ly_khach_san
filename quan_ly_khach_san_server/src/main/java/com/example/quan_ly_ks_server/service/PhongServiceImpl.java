package com.example.quan_ly_ks_server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quan_ly_ks_server.entity.Phong;
import com.example.quan_ly_ks_server.repository.PhongRepository;

@Service
public class PhongServiceImpl implements PhongService {

	@Autowired
	private PhongRepository phongRepository;

	@Override
	public Phong layPhongTheoMa(String maPhong) {
		Phong phong = null;
		Optional<Phong> kq = phongRepository.findById(maPhong);
		try {
			phong = kq.get();
			return phong;
		} catch (Exception e) {
			return phong;
		}
	}

	@Override
	public List<Phong> layDSPhong() {
		return phongRepository.findAll();
	}

	@Override
	public void xoa(String maPhong) {
		phongRepository.deleteById(maPhong);
	}

	@Override
	public Phong luu(Phong phong) {
		return phongRepository.save(phong);
	}

	@Override
	public void capNhatTrangThai(String maPhong, String trangThai) {
		phongRepository.capNhatTrangThai(maPhong, trangThai);
	}

	@Override
	public List<Phong> timPhong(Long maLoaiPhong, int soGiuong) {
		return phongRepository.timPhong(maLoaiPhong, soGiuong);
	}

	@Override
	public List<Object> timPhong(Long maKH, String trangThai) {
		return phongRepository.timPhong(maKH, trangThai);
	}

	@Override
	public List<Phong> layDSPTheoTrangThai(String trangThai) {
		return phongRepository.layDSPTheoTrangThai(trangThai);
	}

	@Override
	public List<Phong> timPhongTrongTheoNgay(String ngayNhanPhong, String ngayTraPhong) {
		return phongRepository.timPhongTrongTheoNgay(ngayNhanPhong, ngayTraPhong);
	}

	@Override
	public List<Object> timMaPhongTheoTrangThai(String maPhong, String trangThai) {
		return phongRepository.timMaPhongTheoTrangThai(maPhong, trangThai);
	}

	@Override
	public List<Object> timDSPTrong(int soNgay) {
		return phongRepository.timDSPTrong(soNgay);
	}

	@Override
	public List<Object> timDSPTheo(String ngayDau, String ngayCuoi) {
		return phongRepository.timDSPTheo(ngayDau, ngayCuoi);
	}
}
