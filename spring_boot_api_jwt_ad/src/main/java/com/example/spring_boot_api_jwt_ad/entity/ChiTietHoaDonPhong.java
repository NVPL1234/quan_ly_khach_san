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
@IdClass(ChiTietHoaDonPhongPK.class)
@Table(name = "chi_tiet_hoa_don_phong")
public class ChiTietHoaDonPhong {
    
    @Id
    @ManyToOne
    @JoinColumn(name = "ma_hd")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private HoaDon hoaDon;

    @Id
    @ManyToOne
    @JoinColumn(name = "ma_phong")
    private Phong phong;
    
    @Column(name = "gio_dau", columnDefinition = "int CHECK (gio_dau >= 0)", nullable = false)
	private int gioDau;

	@Column(name = "gia_gio_dau", columnDefinition = "money CHECK (gia_gio_dau >= 0)", nullable = false)
	private double giaGioDau;

	@Column(name = "gia_gio_tiep_theo", columnDefinition = "money CHECK (gia_gio_tiep_theo >= 0)", nullable = false)
	private double giaGioTiepTheo;

	@Column(name = "gia_theo_ngay", columnDefinition = "money CHECK (gia_theo_ngay >= 0)", nullable = false)
	private double giaTheoNgay;

	public HoaDon getHoaDon() {
		return hoaDon;
	}

	public void setHoaDon(HoaDon hoaDon) {
		this.hoaDon = hoaDon;
	}

	public Phong getPhong() {
		return phong;
	}

	public void setPhong(Phong phong) {
		this.phong = phong;
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

	public ChiTietHoaDonPhong() {
    }

	public ChiTietHoaDonPhong(HoaDon hoaDon, Phong phong, int gioDau, double giaGioDau, double giaGioTiepTheo,
			double giaTheoNgay) {
		this.hoaDon = hoaDon;
		this.phong = phong;
		this.gioDau = gioDau;
		this.giaGioDau = giaGioDau;
		this.giaGioTiepTheo = giaGioTiepTheo;
		this.giaTheoNgay = giaTheoNgay;
	}

	@Override
	public String toString() {
		return "ChiTietHoaDonPhong [hoaDon=" + hoaDon + ", phong=" + phong + ", gioDau=" + gioDau + ", giaGioDau="
				+ giaGioDau + ", giaGioTiepTheo=" + giaGioTiepTheo + ", giaTheoNgay=" + giaTheoNgay + "]";
	}
}
