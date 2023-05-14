package com.example.quan_ly_ks_server.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.quan_ly_ks_server.entity.ChiTietHoaDonPhong;

@Repository
public class ChiTietHoaDonPhongRepositoryImpl implements ChiTietHoaDonPhongRepository {
	
	private EntityManager entityManager;

	@Autowired
	public ChiTietHoaDonPhongRepositoryImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public List<ChiTietHoaDonPhong> layDSCTHDPTheoMa(Long maHD) {
		Query query = entityManager.createQuery("from ChiTietHoaDonPhong where ma_hd=:maHD");
		query.setParameter("maHD", maHD);
		return query.getResultList();
	}

	@Override
	@Transactional
	public List<ChiTietHoaDonPhong> layDSCTHDP() {
		return null;
	}

	@Override
	@Transactional
	public void xoa(Long maHD, String maPhong) {
		Query query = entityManager.createNativeQuery("delete from chi_tiet_hoa_don_phong where ma_hd = " + maHD + " and ma_phong like '" + maPhong + "'");
    	query.executeUpdate();
	}

	@Override
	@Transactional
	public ChiTietHoaDonPhong luu(ChiTietHoaDonPhong chiTietHoaDonPhong) {
		return entityManager.merge(chiTietHoaDonPhong);
	}
	
	@Override
	@Transactional
	public List<ChiTietHoaDonPhong> layDSCTHDP(Long maHD) {
		Query query = entityManager.createNativeQuery("SELECT * FROM chi_tiet_hoa_don_phong WHERE ma_hd = " + maHD, ChiTietHoaDonPhong.class);
		return query.getResultList();
	}
}
