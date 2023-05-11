package com.example.spring_boot_api_jwt_ad.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.spring_boot_api_jwt_ad.entity.Phong;

@Repository
@SuppressWarnings("unchecked")
public class PhongRepositoryCusImpl implements PhongRepositoryCus {

	private EntityManager entityManager;

	@Autowired
	public PhongRepositoryCusImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public void capNhatTrangThai(String maPhong, String trangThai) {
		Query query = entityManager.createQuery("UPDATE Phong SET trang_thai_phong=:trangThai WHERE ma_phong=:maPhong");
		query.setParameter("maPhong", maPhong);
		query.setParameter("trangThai", trangThai);
		query.executeUpdate();
	}

	@Override
	@Transactional
	public List<Phong> timPhong(Long maLoaiPhong, int soGiuong) {
		Query query = entityManager.createNativeQuery("select * from phong where ma_loai_phong = " + maLoaiPhong
				+ " and so_giuong = " + soGiuong + " and trang_thai_phong like N'Trống'", Phong.class);
		return query.getResultList();
	}

	@Override
	@Transactional
	public List<Object> timPhong(Long maKH, String trangThai) {
		if(maKH != 0) {
			Query query = entityManager.createNativeQuery("select * from hoa_don hd join chi_tiet_hoa_don_phong ct on hd.ma_hd = ct.ma_hd join phong p on ct.ma_phong = p.ma_phong join khach_hang kh on hd.ma_kh = kh.ma_kh where hd.ma_kh = " + maKH + " and hd.trang_thai_hd like N'Chưa thanh toán' and p.trang_thai_phong like N'" + trangThai + "'", "HoaDonPhong_Phong");
			return query.getResultList();
		}
		else {
			Query query = entityManager.createNativeQuery("select * from hoa_don hd join chi_tiet_hoa_don_phong ct on hd.ma_hd = ct.ma_hd join phong p on ct.ma_phong = p.ma_phong join khach_hang kh on hd.ma_kh = kh.ma_kh where hd.trang_thai_hd like N'Chưa thanh toán' and p.trang_thai_phong like N'" + trangThai + "'", "HoaDonPhong_Phong");
			return query.getResultList();
		}
	}

	@Override
	@Transactional
	public List<Phong> layDSPTheoTrangThai(String trangThai) {
		Query query = entityManager.createNativeQuery("SELECT * FROM phong where trang_thai_phong like N'" + trangThai + "'",
				Phong.class);
		return query.getResultList();
	}

	@Override
	@Transactional
	public List<Phong> timPhongTrongTheoNgay(String ngayNhanPhong, String ngayTraPhong) {
		Query query = entityManager.createNativeQuery("SELECT p.ma_phong, dien_tich, duong_dan_hinh, p.gia_gio_dau, p.gia_gio_tiep_theo, p.gia_qua_dem, p.gia_theo_ngay, p.gio_dau, so_giuong, trang_thai_phong, ma_loai_phong, ma_tang FROM hoa_don hd join chi_tiet_hoa_don_phong ct ON hd.ma_hd = ct.ma_hd right join phong p ON ct.ma_phong = p.ma_phong WHERE P.ma_phong NOT IN (select p.ma_phong from hoa_don hd join chi_tiet_hoa_don_phong ct on hd.ma_hd = ct.ma_hd right join phong p on ct.ma_phong = p.ma_phong where (ngay_nhan_phong >= '" + ngayNhanPhong + "' and ngay_nhan_phong < '" + ngayTraPhong + "') or (ngay_tra_phong > '" + ngayNhanPhong + "' and ngay_tra_phong < '" + ngayTraPhong + "') or (ngay_nhan_phong < '" + ngayNhanPhong + "' and ngay_tra_phong > '" + ngayTraPhong + "')) GROUP BY p.ma_phong, dien_tich, duong_dan_hinh, p.gia_gio_dau, p.gia_gio_tiep_theo, p.gia_qua_dem, p.gia_theo_ngay, p.gio_dau, so_giuong, trang_thai_phong, ma_loai_phong, ma_tang", Phong.class);
		return query.getResultList();
	}

	@Override
	@Transactional
	public List<Object> timMaPhongTheoTrangThai(String maPhong, String trangThai) {
		if(maPhong.equals("-1")) {
			Query query = entityManager.createNativeQuery("select * from hoa_don hd join chi_tiet_hoa_don_phong ct on hd.ma_hd = ct.ma_hd join phong p on ct.ma_phong = p.ma_phong join khach_hang kh on hd.ma_kh = kh.ma_kh where p.trang_thai_phong like N'Đã nhận' and hd.trang_thai_hd like N'Đã nhận'", "HoaDon_Phong");
			return query.getResultList();
		}
		Query query = entityManager.createNativeQuery("select * from hoa_don hd join chi_tiet_hoa_don_phong ct on hd.ma_hd = ct.ma_hd join phong p on ct.ma_phong = p.ma_phong join khach_hang kh on hd.ma_kh = kh.ma_kh where p.ma_phong like '" + maPhong + "' and p.trang_thai_phong like N'Đã nhận' and hd.trang_thai_hd like N'Đã nhận'", "HoaDon_Phong");
		return query.getResultList();
	}

	@Override
	@Transactional
	public List<Object> timDSPTrong(int soNgay) {
		if(soNgay != 0) {
			Query query = entityManager.createNativeQuery("SELECT * FROM hoa_don HD JOIN chi_tiet_hoa_don_phong CT ON HD.ma_hd = CT.ma_hd JOIN phong P ON CT.ma_phong = P.ma_phong JOIN loai_phong LP ON P.ma_loai_phong = LP.ma_loai_phong WHERE HD.ngay_lap_hd BETWEEN GETDATE() - " + soNgay + " AND GETDATE() ORDER BY LP.ma_loai_phong ASC", "HoaDon_Phong_LoaiPhong");
			return query.getResultList();			
		}
		Query query = entityManager.createNativeQuery("SELECT * FROM hoa_don HD JOIN chi_tiet_hoa_don_phong CT ON HD.ma_hd = CT.ma_hd JOIN phong P ON CT.ma_phong = P.ma_phong JOIN loai_phong LP ON P.ma_loai_phong = LP.ma_loai_phong WHERE DAY(HD.ngay_lap_hd) = DAY(GETDATE()) AND MONTH(HD.ngay_lap_hd) = MONTH(GETDATE()) AND YEAR(HD.ngay_lap_hd) = YEAR(GETDATE()) ORDER BY LP.ma_loai_phong ASC", "HoaDon_Phong_LoaiPhong");
		return query.getResultList();
	}

	@Override
	@Transactional
	public List<Object> timDSPTheo(String ngayDau, String ngayCuoi) {
		Query query = entityManager.createNativeQuery("SELECT * FROM hoa_don HD JOIN chi_tiet_hoa_don_phong CT ON HD.ma_hd = CT.ma_hd JOIN phong P ON CT.ma_phong = P.ma_phong JOIN loai_phong LP ON P.ma_loai_phong = LP.ma_loai_phong WHERE HD.ngay_lap_hd BETWEEN '" + ngayDau + "' AND '" + ngayCuoi + "' ORDER BY LP.ma_loai_phong ASC", "HoaDon_Phong_LoaiPhong");
		return query.getResultList();
	}
}