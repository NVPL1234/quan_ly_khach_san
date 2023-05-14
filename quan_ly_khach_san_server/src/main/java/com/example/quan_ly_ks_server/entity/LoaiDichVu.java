package com.example.quan_ly_ks_server.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "loai_dich_vu")
public class LoaiDichVu {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_loai_dv")
	private Long maLoaiDV;
	
	@Column(columnDefinition = "nvarchar(50)", nullable = false)
	private String ten;

	public Long getMaLoaiDV() {
		return maLoaiDV;
	}

	public void setMaLoaiDV(Long maLoaiDV) {
		this.maLoaiDV = maLoaiDV;
	}

	public String getTen() {
		return ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	public LoaiDichVu() {
	}

	public LoaiDichVu(Long maLoaiDV, String ten) {
		this.maLoaiDV = maLoaiDV;
		this.ten = ten;
	}

	@Override
	public String toString() {
		return "LoaiDichVu [maLoaiDV=" + maLoaiDV + ", ten=" + ten + "]";
	}
}
