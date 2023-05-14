package com.example.quan_ly_ks_server.repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.quan_ly_ks_server.entity.KhachHang;

@Repository
public class KhachHangRepositoryCusImpl implements KhachHangRepositoryCus{
	
	private EntityManager entityManager;
	
	@Autowired
	public KhachHangRepositoryCusImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public KhachHang timKHTheoCCCD(String cccd) {
		Query query = entityManager.createNativeQuery("select * from khach_hang where so_cmnd like '" + cccd + "'", KhachHang.class);
		return (KhachHang) query.getSingleResult();
	}

	@Override
	@Transactional
	public KhachHang timKHTheoSDT(String sdt) {
		Query query = entityManager.createNativeQuery("select * from khach_hang where sdt like '" + sdt + "'", KhachHang.class);
		return (KhachHang) query.getSingleResult();
	}

	@Override
	@Transactional
	public Long timMaKHTheoPhong(String maPhong) {
		Query query = entityManager.createNativeQuery("select ma_kh from hoa_don_phong hd join chi_tiet_hoa_don_phong ct on hd.ma_hdp = ct.ma_hdp join phong p on ct.ma_phong = p.ma_phong where p.ma_phong like '" + maPhong + "' and hd.trang_thai_hdp like N'Đã nhận'");
		return Long.parseLong(query.getSingleResult().toString());
	}

}
