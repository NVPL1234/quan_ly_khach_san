package com.example.spring_boot_api_jwt_ad.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "nhan_vien")
public class NhanVien {
	
	@Id
	@Column(name = "ma_nv")
	private Long maNV;

	@Column(name = "ten_nv", columnDefinition = "nvarchar(100)", nullable = false)
	private String tenNV;
	
	@Column(name = "gioi_tinh")
	private String gioiTinh;
	
	@Column(name = "dia_chi", columnDefinition = "nvarchar(100)")
	private String diaChi;
	
	@Column(name = "so_cmnd", columnDefinition = "varchar(12)", nullable = false)
	private String soCMND;

	@Column(name = "sdt", columnDefinition = "varchar(10)", nullable = false)
	private String sDT;

	@Column(name = "duong_dan_hinh", columnDefinition = "nvarchar(1000)")
	private String duongDanHinh;

	@ManyToOne
    @JoinColumn(name = "ma_cv", nullable = false)
	private ChucVu chucVu;
	
	@OneToOne
	@MapsId
	@JoinColumn(name = "ma_nv")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private TaiKhoan taiKhoan;

	public Long getMaNV() {
		return maNV;
	}

	public void setMaNV(Long maNV) {
		this.maNV = maNV;
	}

	public String getTenNV() {
		return tenNV;
	}

	public void setTenNV(String tenNV) {
		this.tenNV = tenNV;
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

	public String getDuongDanHinh() {
		return duongDanHinh;
	}

	public void setDuongDanHinh(String duongDanHinh) {
		this.duongDanHinh = duongDanHinh;
	}

	public ChucVu getChucVu() {
		return chucVu;
	}

	public void setChucVu(ChucVu chucVu) {
		this.chucVu = chucVu;
	}

	public TaiKhoan getTaiKhoan() {
		return taiKhoan;
	}

	public void setTaiKhoan(TaiKhoan taiKhoan) {
		this.taiKhoan = taiKhoan;
	}

	public NhanVien() {
	}

	public NhanVien(Long maNV, String tenNV, String gioiTinh, String diaChi, String soCMND, String sDT,
			String duongDanHinh, ChucVu chucVu, TaiKhoan taiKhoan) {
		this.maNV = maNV;
		this.tenNV = tenNV;
		this.gioiTinh = gioiTinh;
		this.diaChi = diaChi;
		this.soCMND = soCMND;
		this.sDT = sDT;
		this.duongDanHinh = duongDanHinh;
		this.chucVu = chucVu;
		this.taiKhoan = taiKhoan;
	}

	@Override
	public String toString() {
		return "NhanVien [maNV=" + maNV + ", tenNV=" + tenNV + ", gioiTinh=" + gioiTinh + ", diaChi=" + diaChi
				+ ", soCMND=" + soCMND + ", sDT=" + sDT + ", duongDanHinh=" + duongDanHinh + ", chucVu=" + chucVu
				+ ", taiKhoan=" + taiKhoan + "]";
	}
}
