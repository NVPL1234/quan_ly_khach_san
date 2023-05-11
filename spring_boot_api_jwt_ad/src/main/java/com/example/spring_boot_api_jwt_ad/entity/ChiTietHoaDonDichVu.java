package com.example.spring_boot_api_jwt_ad.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@IdClass(ChiTietHoaDonDichVuPK.class)
@Table(name = "chi_tiet_hoa_don_dich_vu")
public class ChiTietHoaDonDichVu {
    
    @Id
    @ManyToOne
    @JoinColumn(name = "ma_hd")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private HoaDon hoaDon;

    @Id
    @ManyToOne
    @JoinColumn(name = "ma_dv")
    private DichVu dichVu;

    @Column(name = "so_luong", columnDefinition = "int DEFAULT 1 CHECK (so_luong > 0)")
    private int soLuong = 1;
    
    @Column(name = "don_gia", columnDefinition = "money DEFAULT 0 CHECK (don_gia >= 0)")
    private double donGia = 0;
    
	public HoaDon getHoaDon() {
		return hoaDon;
	}

	public void setHoaDon(HoaDon hoaDon) {
		this.hoaDon = hoaDon;
	}

	public DichVu getDichVu() {
		return dichVu;
	}

	public void setDichVu(DichVu dichVu) {
		this.dichVu = dichVu;
	}

	public int getSoLuong() {
		return soLuong;
	}
	
	public void setSoLuong(int soLuong) {
		this.soLuong = soLuong;
	}

	public double getDonGia() {
		return donGia;
	}

	public void setDonGia(double donGia) {
		this.donGia = donGia;
	}

	public ChiTietHoaDonDichVu() {
    }

	public ChiTietHoaDonDichVu(HoaDon hoaDon, DichVu dichVu, int soLuong, double donGia) {
		this.hoaDon = hoaDon;
		this.dichVu = dichVu;
		this.soLuong = soLuong;
		this.donGia = donGia;
	}

	@Override
	public String toString() {
		return "ChiTietHoaDonDichVu [hoaDon=" + hoaDon + ", dichVu=" + dichVu + ", soLuong=" + soLuong + ", donGia="
				+ donGia + "]";
	}
}
