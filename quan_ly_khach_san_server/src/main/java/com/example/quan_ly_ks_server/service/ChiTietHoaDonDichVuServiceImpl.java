package com.example.quan_ly_ks_server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quan_ly_ks_server.entity.ChiTietHoaDonDichVu;
import com.example.quan_ly_ks_server.repository.ChiTietHoaDonDichVuRepository;

@Service
public class ChiTietHoaDonDichVuServiceImpl implements ChiTietHoaDonDichVuService{
	
	@Autowired
	private ChiTietHoaDonDichVuRepository chiTietHoaDonDichVuRepository;

	@Override
	public List<ChiTietHoaDonDichVu> layDSCTHDDVTheoMa(Long maHD) {
		return chiTietHoaDonDichVuRepository.layDSCTHDDVTheoMa(maHD);
	}

	@Override
	public List<ChiTietHoaDonDichVu> layDSCTHDDV() {
		return chiTietHoaDonDichVuRepository.layDSCTHDDV();
	}

	@Override
	public void xoa(Long maHD, Long maDV) {
		chiTietHoaDonDichVuRepository.xoa(maHD, maDV);
	}

	@Override
	public ChiTietHoaDonDichVu timCTHDDVTheo(Long maHD, Long maDV) {
		return chiTietHoaDonDichVuRepository.timCTHDDVTheo(maHD, maDV);
	}
	
	@Override
	public ChiTietHoaDonDichVu luu(ChiTietHoaDonDichVu chiTietHoaDonDichVu) {
		ChiTietHoaDonDichVu chiTietHoaDonDichVu2 = timCTHDDVTheo(chiTietHoaDonDichVu.getHoaDon().getMaHD(), chiTietHoaDonDichVu.getDichVu().getMaDV());
		if(chiTietHoaDonDichVu2 == null)
			return chiTietHoaDonDichVuRepository.luu(chiTietHoaDonDichVu);
		else {
			int soLuong = chiTietHoaDonDichVu2.getSoLuong();
			int soLuongTong = soLuong + chiTietHoaDonDichVu.getSoLuong();
			chiTietHoaDonDichVu.setSoLuong(soLuongTong);
			return chiTietHoaDonDichVuRepository.luu(chiTietHoaDonDichVu);
		}
	}

	@Override
	public void capNhatSoLuong(Long maHD, Long maDV, int soLuong) {
		chiTietHoaDonDichVuRepository.capNhatSoLuong(maHD, maDV, soLuong);
	}
}
