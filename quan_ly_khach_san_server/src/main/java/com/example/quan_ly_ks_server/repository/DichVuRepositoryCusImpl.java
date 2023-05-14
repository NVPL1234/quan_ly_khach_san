package com.example.quan_ly_ks_server.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.quan_ly_ks_server.entity.DichVu;

@Repository
public class DichVuRepositoryCusImpl implements DichVuRepositoryCus{
	
	private EntityManager entityManager;

	@Autowired
	public DichVuRepositoryCusImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public void capNhatSoLuong(Long maDV, int soLuong) {
		Query query = entityManager.createQuery("UPDATE DichVu SET so_luong=:soLuong WHERE ma_dv=:maDV");
		query.setParameter("maDV", maDV);
		query.setParameter("soLuong", soLuong);
		query.executeUpdate();		
	}


	@Override
	@Transactional
	public List<DichVu> timDVTheoLoai(Long maLoaiDV) {
		Query query = entityManager.createQuery("from DichVu where ma_loai_dv=:maLoaiDV");
		query.setParameter("maLoaiDV", maLoaiDV);
		return query.getResultList();	
	}

	@Override
	@Transactional
	public List<DichVu> timDVTheoTen(String tenDV) {
		Query query = entityManager.createNativeQuery("select * from dich_vu where ten_dv like N'%" + tenDV + "%'", DichVu.class);
		return query.getResultList();	
	}

	@Override
	@Transactional
	public List<Object> timDSDVTrong(int soNgay) {
		if(soNgay != 0) {
			Query query = entityManager.createNativeQuery("SELECT * FROM hoa_don HD JOIN chi_tiet_hoa_don_dich_vu CT ON HD.ma_hd = CT.ma_hd JOIN dich_vu DV ON CT.ma_dv = DV.ma_dv JOIN loai_dich_vu LDV ON DV.ma_loai_dv = LDV.ma_loai_dv WHERE HD.ngay_lap_hd BETWEEN GETDATE() - " + soNgay + " AND GETDATE() ORDER BY LDV.ma_loai_dv ASC", "HoaDon_DichVu_LoaiDichVu");
			return query.getResultList();			
		}
		Query query = entityManager.createNativeQuery("SELECT * FROM hoa_don HD JOIN chi_tiet_hoa_don_dich_vu CT ON HD.ma_hd = CT.ma_hd JOIN dich_vu DV ON CT.ma_dv = DV.ma_dv JOIN loai_dich_vu LDV ON DV.ma_loai_dv = LDV.ma_loai_dv WHERE DAY(HD.ngay_lap_hd) = DAY(GETDATE()) AND MONTH(HD.ngay_lap_hd) = MONTH(GETDATE()) AND YEAR(HD.ngay_lap_hd) = YEAR(GETDATE()) ORDER BY LDV.ma_loai_dv ASC", "HoaDon_DichVu_LoaiDichVu");
		return query.getResultList();
	}

	@Override
	@Transactional
	public List<Object> timDSDVTheo(String ngayDau, String ngayCuoi) {
		Query query = entityManager.createNativeQuery("SELECT * FROM hoa_don HD JOIN chi_tiet_hoa_don_dich_vu CT ON HD.ma_hd = CT.ma_hd JOIN dich_vu DV ON CT.ma_dv = DV.ma_dv JOIN loai_dich_vu LDV ON DV.ma_loai_dv = LDV.ma_loai_dv WHERE HD.ngay_lap_hd BETWEEN '" + ngayDau + "' AND '" + ngayCuoi + "' ORDER BY LDV.ma_loai_dv ASC", "HoaDon_DichVu_LoaiDichVu");
		return query.getResultList();
	}
}
