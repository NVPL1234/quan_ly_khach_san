package com.example.spring_boot_api_jwt_ad.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityResult;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "hoa_don")
@SqlResultSetMapping(
		name = "HoaDon_Phong",
		entities = {
		@EntityResult(entityClass = HoaDon.class),
		@EntityResult(entityClass = Phong.class),
		@EntityResult(entityClass = KhachHang.class)}
)
@SqlResultSetMapping(
		name = "HoaDonDichVu_DichVu",
		entities = {
		@EntityResult(entityClass = ChiTietHoaDonDichVu.class),
		@EntityResult(entityClass = DichVu.class)}
)
@SqlResultSetMapping(
		name = "HoaDon",
		entities = {
		@EntityResult(entityClass = HoaDon.class),
		@EntityResult(entityClass = ChiTietHoaDonPhong.class),
		@EntityResult(entityClass = ChiTietHoaDonDichVu.class)}
)
public class HoaDon {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_hd")
	private Long maHD;

	@Column(name = "ngay_lap_hd", columnDefinition = "DATETIME")
	@ColumnDefault(value = "CURRENT_TIMESTAMP")
	private Date ngayLapHD = new Date();

	@Column(name = "ngay_tra_phong", columnDefinition = "DATETIME")
	private Date ngayTraPhong;

	@Column(name = "ngay_nhan_phong", columnDefinition = "DATETIME")
	private Date ngayNhanPhong;

	@Column(name = "loai_thue", columnDefinition = "nvarchar(50) CHECK (loai_thue IN (N'Thuê theo giờ', N'Thuê theo ngày', N'Thuê qua đêm'))")
	private String loaiThue;

	@Column(name = "trang_thai_hd", columnDefinition = "NVARCHAR(50) CHECK (trang_thai_hd IN (N'Đã đặt', N'Đã nhận', N'Đã thanh toán'))")
	private String trangThaiHD;

	@Column(name = "tien_coc", columnDefinition = "money DEFAULT 0 CHECK (tien_coc >= 0)")
	private double tienCoc = 0;
	
	@ManyToOne
	@JoinColumn(name = "ma_kh", nullable = false)
	private KhachHang khachHang;

	@ManyToOne
	@JoinColumn(name = "ma_nv")
	private NhanVien nhanVien;

	public Long getMaHD() {
		return maHD;
	}

	public void setMaHD(Long maHD) {
		this.maHD = maHD;
	}

	public Date getNgayLapHD() {
		return ngayLapHD;
	}

	public void setNgayLapHD(Date ngayLapHD) {
		this.ngayLapHD = ngayLapHD;
	}

	public Date getNgayTraPhong() {
		return ngayTraPhong;
	}

	public void setNgayTraPhong(Date ngayTraPhong) {
		this.ngayTraPhong = ngayTraPhong;
	}

	public Date getNgayNhanPhong() {
		return ngayNhanPhong;
	}

	public void setNgayNhanPhong(Date ngayNhanPhong) {
		this.ngayNhanPhong = ngayNhanPhong;
	}

	public String getLoaiThue() {
		return loaiThue;
	}

	public void setLoaiThue(String loaiThue) {
		this.loaiThue = loaiThue;
	}

	public String getTrangThaiHD() {
		return trangThaiHD;
	}

	public void setTrangThaiHD(String trangThaiHD) {
		this.trangThaiHD = trangThaiHD;
	}

	public double getTienCoc() {
		return tienCoc;
	}

	public void setTienCoc(double tienCoc) {
		this.tienCoc = tienCoc;
	}

	public KhachHang getKhachHang() {
		return khachHang;
	}

	public void setKhachHang(KhachHang khachHang) {
		this.khachHang = khachHang;
	}

	public NhanVien getNhanVien() {
		return nhanVien;
	}

	public void setNhanVien(NhanVien nhanVien) {
		this.nhanVien = nhanVien;
	}

	public HoaDon() {
	}

	public HoaDon(Long maHD, Date ngayLapHD, Date ngayTraPhong, Date ngayNhanPhong, String loaiThue, String trangThaiHD,
			double tienCoc, KhachHang khachHang, NhanVien nhanVien) {
		this.maHD = maHD;
		this.ngayLapHD = ngayLapHD;
		this.ngayTraPhong = ngayTraPhong;
		this.ngayNhanPhong = ngayNhanPhong;
		this.loaiThue = loaiThue;
		this.trangThaiHD = trangThaiHD;
		this.tienCoc = tienCoc;
		this.khachHang = khachHang;
		this.nhanVien = nhanVien;
	}

	@Override
	public String toString() {
		return "HoaDon [maHD=" + maHD + ", ngayLapHD=" + ngayLapHD + ", ngayTraPhong=" + ngayTraPhong + ", ngayNhanPhong="
				+ ngayNhanPhong + ", loaiThue=" + loaiThue + ", trangThaiHD=" + trangThaiHD + ", tienCoc=" + tienCoc
				+ ", khachHang=" + khachHang + ", nhanVien=" + nhanVien + "]";
	}
}
