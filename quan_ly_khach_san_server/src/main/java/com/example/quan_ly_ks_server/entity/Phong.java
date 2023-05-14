package com.example.quan_ly_ks_server.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityResult;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;

@Entity
@Table(name = "phong")
@SqlResultSetMapping(name = "HoaDon_Phong_LoaiPhong", entities = { 
		@EntityResult(entityClass = HoaDon.class),
		@EntityResult(entityClass = Phong.class), 
		@EntityResult(entityClass = LoaiPhong.class) }
)
public class Phong {

	@Id
	@Column(name = "ma_phong")
	private String maPhong;

	@Column(name = "trang_thai_phong", columnDefinition = "nvarchar(50) DEFAULT N'Trống' CHECK (trang_thai_phong IN (N'Trống', N'Đã đặt', N'Đã nhận', N'Chưa dọn dẹp'))")
	private String trangThaiPhong = "Trống";

	@Column(name = "duong_dan_hinh", columnDefinition = "nvarchar(1000)")
	private String duongDanHinh;

	@Column(name = "so_giuong", columnDefinition = "int CHECK (so_giuong >= 0)", nullable = false)
	private int soGiuong;

	@Column(name = "dien_tich", columnDefinition = "float CHECK (dien_tich >= 0)", nullable = false)
	private float dienTich;

	@Column(name = "suc_chua")
	private int sucChua;

	@Column(name = "gio_dau", columnDefinition = "int CHECK (gio_dau >= 0)", nullable = false)
	private int gioDau;

	@Column(name = "gia_gio_dau", columnDefinition = "money CHECK (gia_gio_dau >= 0)", nullable = false)
	private double giaGioDau;

	@Column(name = "gia_gio_tiep_theo", columnDefinition = "money CHECK (gia_gio_tiep_theo >= 0)", nullable = false)
	private double giaGioTiepTheo;

	@Column(name = "gia_theo_ngay", columnDefinition = "money CHECK (gia_theo_ngay >= 0)", nullable = false)
	private double giaTheoNgay;

	@ManyToOne
	@JoinColumn(name = "ma_loai_phong", nullable = false)
	private LoaiPhong loaiPhong;

	@ManyToOne
	@JoinColumn(name = "ma_tang", nullable = false)
	private Tang tang;

	public String getMaPhong() {
		return maPhong;
	}

	public void setMaPhong(String maPhong) {
		this.maPhong = maPhong;
	}

	public String getTrangThaiPhong() {
		return trangThaiPhong;
	}

	public void setTrangThaiPhong(String trangThaiPhong) {
		this.trangThaiPhong = trangThaiPhong;
	}

	public String getDuongDanHinh() {
		return duongDanHinh;
	}

	public void setDuongDanHinh(String duongDanHinh) {
		this.duongDanHinh = duongDanHinh;
	}

	public int getSoGiuong() {
		return soGiuong;
	}

	public void setSoGiuong(int soGiuong) {
		this.soGiuong = soGiuong;
	}

	public float getDienTich() {
		return dienTich;
	}

	public void setDienTich(float dienTich) {
		this.dienTich = dienTich;
	}

	public int getSucChua() {
		return sucChua;
	}

	public void setSucChua(int sucChua) {
		this.sucChua = sucChua;
	}

	public int getGioDau() {
		return gioDau;
	}

	public void setGioDau(int gioDau) {
		this.gioDau = gioDau;
	}

	public double getGiaGioDau() {
		return giaGioDau;
	}

	public void setGiaGioDau(double giaGioDau) {
		this.giaGioDau = giaGioDau;
	}

	public double getGiaGioTiepTheo() {
		return giaGioTiepTheo;
	}

	public void setGiaGioTiepTheo(double giaGioTiepTheo) {
		this.giaGioTiepTheo = giaGioTiepTheo;
	}

	public double getGiaTheoNgay() {
		return giaTheoNgay;
	}

	public void setGiaTheoNgay(double giaTheoNgay) {
		this.giaTheoNgay = giaTheoNgay;
	}

	public LoaiPhong getLoaiPhong() {
		return loaiPhong;
	}

	public void setLoaiPhong(LoaiPhong loaiPhong) {
		this.loaiPhong = loaiPhong;
	}

	public Tang getTang() {
		return tang;
	}

	public void setTang(Tang tang) {
		this.tang = tang;
	}

	public Phong() {
	}

	public Phong(String maPhong, String trangThaiPhong, String duongDanHinh, int soGiuong, float dienTich,
			int sucChua, int gioDau, double giaGioDau, double giaGioTiepTheo, double giaTheoNgay, LoaiPhong loaiPhong,
			Tang tang) {
		this.maPhong = maPhong;
		this.trangThaiPhong = trangThaiPhong;
		this.duongDanHinh = duongDanHinh;
		this.soGiuong = soGiuong;
		this.dienTich = dienTich;
		this.sucChua = sucChua;
		this.gioDau = gioDau;
		this.giaGioDau = giaGioDau;
		this.giaGioTiepTheo = giaGioTiepTheo;
		this.giaTheoNgay = giaTheoNgay;
		this.loaiPhong = loaiPhong;
		this.tang = tang;
	}

	@Override
	public String toString() {
		return "Phong [maPhong=" + maPhong + ", trangThaiPhong=" + trangThaiPhong + ", duongDanHinh=" + duongDanHinh
				+ ", soGiuong=" + soGiuong + ", dienTich=" + dienTich + ", sucChua=" + sucChua + ", gioDau=" + gioDau
				+ ", giaGioDau=" + giaGioDau + ", giaGioTiepTheo=" + giaGioTiepTheo + ", giaTheoNgay=" + giaTheoNgay
				+ ", loaiPhong=" + loaiPhong + ", tang=" + tang + "]";
	}
}