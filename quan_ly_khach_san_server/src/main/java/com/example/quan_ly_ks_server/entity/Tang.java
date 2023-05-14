package com.example.quan_ly_ks_server.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tang")
public class Tang {
	 
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_tang")
    private Long maTang;
	
	@Column(name = "ten_tang", columnDefinition = "nvarchar(50)", nullable = false)
	private String tenTang;

	public Long getMaTang() {
		return maTang;
	}

	public void setMaTang(Long maTang) {
		this.maTang = maTang;
	}

	public String getTenTang() {
		return tenTang;
	}

	public void setTenTang(String tenTang) {
		this.tenTang = tenTang;
	}

	public Tang() {
	}

	public Tang(Long maTang, String tenTang) {
		this.maTang = maTang;
		this.tenTang = tenTang;
	}

	@Override
	public String toString() {
		return "Tang [maTang=" + maTang + ", tenTang=" + tenTang + "]";
	}
}
