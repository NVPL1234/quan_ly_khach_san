package com.example.quan_ly_ks_server.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "tai_khoan")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "maTK")
public class TaiKhoan {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_tk")
	private Long maTK;

	@Column(name = "ten_dang_nhap", columnDefinition = "nvarchar(255) UNIQUE")
	private String tenDangNhap;

	@Column(name = "mat_khau")
	private String matKhau;

	@ManyToOne
    @JoinColumn(name = "ma_quyen")
	private Quyen quyen;

	public Long getMaTK() {
		return maTK;
	}

	public void setMaTK(Long maTK) {
		this.maTK = maTK;
	}

	public String getTenDangNhap() {
		return tenDangNhap;
	}

	public void setTenDangNhap(String tenDangNhap) {
		this.tenDangNhap = tenDangNhap;
	}

	public String getMatKhau() {
		return matKhau;
	}

	public void setMatKhau(String matKhau) {
		this.matKhau = matKhau;
	}

	public Quyen getQuyen() {
		return quyen;
	}

	public void setQuyen(Quyen quyen) {
		this.quyen = quyen;
	}

	public TaiKhoan() {
	}

	public TaiKhoan(Long maTK, String tenDangNhap, String matKhau, Quyen quyen) {
		this.maTK = maTK;
		this.tenDangNhap = tenDangNhap;
		this.matKhau = matKhau;
		this.quyen = quyen;
	}

	@Override
	public String toString() {
		return "TaiKhoan [maTK=" + maTK + ", tenDangNhap=" + tenDangNhap + ", matKhau=" + matKhau + ", quyen=" + quyen
				+ "]";
	}
}