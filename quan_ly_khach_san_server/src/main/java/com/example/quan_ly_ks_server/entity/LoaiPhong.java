package com.example.quan_ly_ks_server.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "loai_phong")
public class LoaiPhong {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_loai_phong")
	private Long maLoaiPhong;
	
	@Column(columnDefinition = "nvarchar(50)", nullable = false)
	private String ten;

	public Long getMaLoaiPhong() {
		return maLoaiPhong;
	}

	public void setMaLoaiPhong(Long maLoaiPhong) {
		this.maLoaiPhong = maLoaiPhong;
	}

	public String getTen() {
		return ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	public LoaiPhong() {
	}

	public LoaiPhong(Long maLoaiPhong, String ten) {
		this.maLoaiPhong = maLoaiPhong;
		this.ten = ten;
	}

	@Override
	public String toString() {
		return "LoaiPhong [maLoaiPhong=" + maLoaiPhong + ", ten=" + ten + "]";
	}
}