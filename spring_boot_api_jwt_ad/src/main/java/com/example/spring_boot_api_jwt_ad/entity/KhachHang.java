package com.example.spring_boot_api_jwt_ad.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "khach_hang")
public class KhachHang {
	
	@Id 
	@Column(name = "ma_kh")
	private Long maKH;

	@Column(name = "ten_kh", columnDefinition = "nvarchar(100)", nullable = false)
	private String tenKH;
	
	@Column(name = "gioi_tinh")
	private String gioiTinh;

	@Column(name = "dia_chi", columnDefinition = "nvarchar(100)")
	private String diaChi;

	@Column(name = "so_cmnd", columnDefinition = "varchar(12)")
	private String soCMND;

	@Column(name = "sdt", columnDefinition = "varchar(10)", nullable = false)
	private String sDT;

	@OneToOne
	@MapsId
	@JoinColumn(name = "ma_kh")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private TaiKhoan taiKhoan;

	public Long getMaKH() {
		return maKH;
	}

	public void setMaKH(Long maKH) {
		this.maKH = maKH;
	}

	public String getTenKH() {
		return tenKH;
	}

	public void setTenKH(String tenKH) {
		this.tenKH = tenKH;
	}

	public String getGioiTinh() {
		return gioiTinh;
	}

	public void setGioiTinh(String gioiTinh) {
		this.gioiTinh = gioiTinh;
	}

	public String getDiaChi() {
		return diaChi;
	}

	public void setDiaChi(String diaChi) {
		this.diaChi = diaChi;
	}

	public String getSoCMND() {
		return soCMND;
	}

	public void setSoCMND(String soCMND) {
		this.soCMND = soCMND;
	}

	public String getsDT() {
		return sDT;
	}

	public void setsDT(String sDT) {
		this.sDT = sDT;
	}

	public TaiKhoan getTaiKhoan() {
		return taiKhoan;
	}

	public void setTaiKhoan(TaiKhoan taiKhoan) {
		this.taiKhoan = taiKhoan;
	}

	public KhachHang() {
	}

	public KhachHang(Long maKH, String tenKH, String gioiTinh, String diaChi, String soCMND, String sDT,
			TaiKhoan taiKhoan) {
		this.maKH = maKH;
		this.tenKH = tenKH;
		this.gioiTinh = gioiTinh;
		this.diaChi = diaChi;
		this.soCMND = soCMND;
		this.sDT = sDT;
		this.taiKhoan = taiKhoan;
	}

	@Override
	public String toString() {
		return "KhachHang [maKH=" + maKH + ", tenKH=" + tenKH + ", gioiTinh=" + gioiTinh + ", diaChi=" + diaChi
				+ ", soCMND=" + soCMND + ", sDT=" + sDT + ", taiKhoan=" + taiKhoan + "]";
	}
}