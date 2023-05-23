package com.example.quan_ly_ks_server.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.quan_ly_ks_server.entity.HoaDon;

@Repository
public class HoaDonRepositoryCusImpl implements HoaDonRepositoryCus{
	
	private EntityManager entityManager;
	
	@Autowired
	public HoaDonRepositoryCusImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public int capNhatNgayNhanPhong(Long maHD, String ngayNhanPhong) {
		Query query = entityManager.createQuery("update HoaDon set ngay_nhan_phong=:ngayNhanPhong where ma_hd=:maHD");
		query.setParameter("maHD", maHD);
		query.setParameter("ngayNhanPhong", ngayNhanPhong);
		return query.executeUpdate();
	}

	@Override
	@Transactional//
	public List<Object> timDSHDChuaThanhToan(Long maKH, String trangThai) {
		if(maKH != 0) {
			Query query = entityManager.createNativeQuery("select * from hoa_don hd join chi_tiet_hoa_don_phong ct on hd.ma_hd = ct.ma_hd join phong p on ct.ma_phong = p.ma_phong join khach_hang kh on hd.ma_kh = kh.ma_kh where hd.trang_thai_hd like N'Chưa thanh toán' and p.trang_thai_phong like N'" + trangThai + "' and kh.ma_kh = " + maKH, "HoaDon_Phong");
			return query.getResultList();
		}
		else {
			Query query = entityManager.createNativeQuery("select * from hoa_don_phong hd join chi_tiet_hoa_don_phong ct on hd.ma_hdp = ct.ma_hdp join phong p on ct.ma_phong = p.ma_phong join khach_hang kh on hd.ma_kh = kh.ma_kh where hd.trang_thai_hdp like N'Chưa thanh toán' and p.trang_thai_phong like N'" + trangThai + "'", "HoaDon_Phong");
			return query.getResultList();
		}
	}

	@Override
	@Transactional
	public List<HoaDon> layDSHD(String trangThai) {
		Query query = entityManager.createNativeQuery("select * from hoa_don where trang_thai_hd like N'" + trangThai + "'", HoaDon.class);
		return query.getResultList();
	}

	@Override
	@Transactional
	public List<HoaDon> layDSHD(Long maKH, String trangThai) {
		Query query = entityManager.createNativeQuery("select * from hoa_don where trang_thai_hd like N'" + trangThai + "' and ma_kh = " + maKH, HoaDon.class);
		return query.getResultList();
	}

	@Override
	@Transactional
	public void capNhatTrangThai(Long maHD, String trangThai) {
		Query query = entityManager.createQuery("update HoaDon set trang_thai_hd=:trangThai where ma_hd=:maHD");
		query.setParameter("trangThai", trangThai);
		query.setParameter("maHD", maHD);
		query.executeUpdate();
	}

	@Override
	@Transactional
	public List<Object> layDSHDCTDV(Long maKH, String trangThai) {
		Query query = entityManager.createNativeQuery("select * from hoa_don hd join chi_tiet_hoa_don_dich_vu ct on hd.ma_hd = ct.ma_hd join dich_vu dv on ct.ma_dv = dv.ma_dv where ma_kh = " + maKH + " and trang_thai_hd like N'" + trangThai + "'", "HoaDonDichVu_DichVu");
		return query.getResultList();
	}

	@Override
	@Transactional
	public int capNhatHD(Long maHD, double tienCoc) {
		Query query = entityManager.createNativeQuery("update hoa_don set tien_coc = " + tienCoc + " where ma_hd = " + maHD);
		return query.executeUpdate();
	}

	@Override
	@Transactional
	public List<Object> timDSHDTrong(int soNgay) {
		if(soNgay != 0) {
			Query query = entityManager.createNativeQuery("SELECT * FROM hoa_don HD LEFT JOIN chi_tiet_hoa_don_phong CTP ON HD.ma_hd = CTP.ma_hd LEFT JOIN chi_tiet_hoa_don_dich_vu CTDV ON HD.ma_hd = CTDV.ma_hd WHERE HD.ngay_lap_hd BETWEEN GETDATE() - " + soNgay + " AND GETDATE() ORDER BY HD.ngay_lap_hd", "HoaDon");
			return query.getResultList();
		}
		Query query = entityManager.createNativeQuery("SELECT * FROM hoa_don HD LEFT JOIN chi_tiet_hoa_don_phong CTP ON HD.ma_hd = CTP.ma_hd LEFT JOIN chi_tiet_hoa_don_dich_vu CTDV ON HD.ma_hd = CTDV.ma_hd WHERE DAY(HD.ngay_lap_hd) = DAY(GETDATE()) AND MONTH(HD.ngay_lap_hd) = MONTH(GETDATE()) AND YEAR(HD.ngay_lap_hd) = YEAR(GETDATE()) ORDER BY HD.ngay_lap_hd", "HoaDon");
		return query.getResultList();
	}

	@Override
	@Transactional
	public List<Object> timDSHDTheo(String ngayDau, String ngayCuoi) {
		Query query = entityManager.createNativeQuery("SELECT * FROM hoa_don HD LEFT JOIN chi_tiet_hoa_don_phong CTP ON HD.ma_hd = CTP.ma_hd LEFT JOIN chi_tiet_hoa_don_dich_vu CTDV ON HD.ma_hd = CTDV.ma_hd WHERE HD.ngay_lap_hd BETWEEN '" + ngayDau + "' AND '" + ngayCuoi + "' ORDER BY HD.ngay_lap_hd, HD.ma_nv", "HoaDon");
		return query.getResultList();
	}
}
