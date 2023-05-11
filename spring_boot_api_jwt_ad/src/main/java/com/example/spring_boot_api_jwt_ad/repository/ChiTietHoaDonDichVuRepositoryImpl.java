package com.example.spring_boot_api_jwt_ad.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.spring_boot_api_jwt_ad.entity.ChiTietHoaDonDichVu;

@Repository
public class ChiTietHoaDonDichVuRepositoryImpl implements ChiTietHoaDonDichVuRepository{
	
	private EntityManager entityManager;

	@Autowired
	public ChiTietHoaDonDichVuRepositoryImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public List<ChiTietHoaDonDichVu> layDSCTHDDVTheoMa(Long maHD) {
		Query query = entityManager.createQuery("from ChiTietHoaDonDichVu where ma_hd=:maHD");
		query.setParameter("maHD", maHD);
		return query.getResultList();
	}

	@Override
	@Transactional
	public List<ChiTietHoaDonDichVu> layDSCTHDDV() {
		return null;
	}

	@Override
	@Transactional
	public void xoa(Long maHD, Long maDV) {
		Query query = entityManager.createNativeQuery("delete from chi_tiet_hoa_don_dich_vu where ma_dv = " + maDV + " and ma_hd = " + maHD);
		query.executeUpdate();
	}
	
	@Override
	@Transactional
	public ChiTietHoaDonDichVu timCTHDDVTheo(Long maHD, Long maDV) {
		ChiTietHoaDonDichVu chiTietHoaDonDichVu = null;
		Query query = entityManager.createNativeQuery("select * from chi_tiet_hoa_don_dich_vu where ma_hd = " + maHD + " and ma_dv = " + maDV, ChiTietHoaDonDichVu.class);
		try {
			chiTietHoaDonDichVu = (ChiTietHoaDonDichVu) query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
		return chiTietHoaDonDichVu;
	}

	@Override
	@Transactional
	public ChiTietHoaDonDichVu luu(ChiTietHoaDonDichVu chiTietHoaDonDichVu) {
		return entityManager.merge(chiTietHoaDonDichVu);
	}

	@Override
	@Transactional
	public void capNhatSoLuong(Long maHD, Long maDV, int soLuong) {
		Query query = entityManager.createNativeQuery("update chi_tiet_hoa_don_dich_vu set so_luong = " + soLuong + " where ma_hd = " + maHD + " and ma_dv = " + maDV);
		query.executeUpdate();
	}
}
