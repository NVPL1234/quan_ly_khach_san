package com.example.quan_ly_ks_server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quan_ly_ks_server.entity.HoaDon;
import com.example.quan_ly_ks_server.repository.HoaDonRepository;

@Service
public class HoaDonServiceImpl implements HoaDonService{

	@Autowired
	private HoaDonRepository hoaDonRepository;
	
	@Override
	public void xoa(Long maHD) {
		hoaDonRepository.deleteById(maHD);
	}

	@Override
	public HoaDon luu(HoaDon hoaDon) {
		return hoaDonRepository.save(hoaDon);
	}

	@Override
	public int capNhatNgayNhanPhong(Long maHD, String ngayNhanPhong) {
		return hoaDonRepository.capNhatNgayNhanPhong(maHD, ngayNhanPhong);
	}

	@Override
	public List<Object> timDSHDChuaThanhToan(Long maKH, String trangThai) {
		return hoaDonRepository.timDSHDChuaThanhToan(maKH, trangThai);
	}

	@Override
	public List<HoaDon> layDSHD(String trangThai) {
		return hoaDonRepository.layDSHD(trangThai);
	}

	@Override
	public List<HoaDon> layDSHD(Long maKH, String trangThai) {
		return hoaDonRepository.layDSHD(maKH, trangThai);
	}

	@Override
	public void capNhatTrangThai(Long maHD, String trangThai) {
		hoaDonRepository.capNhatTrangThai(maHD, trangThai);
	}

	@Override
	public List<Object> layDSHDCTDV(Long maKH, String trangThai) {
		return hoaDonRepository.layDSHDCTDV(maKH, trangThai);
	}

	@Override
	public HoaDon layHDTheo(Long maHD) {
		Optional<HoaDon> hd = hoaDonRepository.findById(maHD);
		return hd.get();
	}

	@Override
	public int capNhatHD(Long maHD, double tienCoc) {
		return hoaDonRepository.capNhatHD(maHD, tienCoc);
	}

	@Override
	public List<Object> timDSHDTrong(int soNgay) {
		return hoaDonRepository.timDSHDTrong(soNgay);
	}

	@Override
	public List<Object> timDSHDTheo(String ngayDau, String ngayCuoi) {
		return hoaDonRepository.timDSHDTheo(ngayDau, ngayCuoi);
	}
}
