package com.example.quan_ly_ks_server.entity;

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

@Entity
@Table(name = "dich_vu")
@SqlResultSetMapping(
		name = "HoaDon_DichVu_LoaiDichVu",
		entities = {
		@EntityResult(entityClass = HoaDon.class),
		@EntityResult(entityClass = DichVu.class),
		@EntityResult(entityClass = LoaiDichVu.class)}
)
public class DichVu {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_dv")
    private Long maDV;

    @Column(name = "ten_dv", columnDefinition = "nvarchar(50)", nullable = false)
    private String tenDV;

    @Column(name = "gia_dv", columnDefinition = "money CHECK (gia_dv >= 0)", nullable = false)
    private double giaDV;
    
    @Column(name = "don_vi", columnDefinition = "nvarchar(100)")
    private String donVi;
    
    @Column(name = "so_luong", columnDefinition = "int CHECK (so_luong >= 0)", nullable = false)
    private int soLuong;

    @ManyToOne
    @JoinColumn(name = "ma_loai_dv", nullable = false)
    private LoaiDichVu loaiDichVu;

    public Long getMaDV() {
		return maDV;
	}

	public void setMaDV(Long maDV) {
		this.maDV = maDV;
	}

	public String getTenDV() {
		return tenDV;
	}

	public void setTenDV(String tenDV) {
		this.tenDV = tenDV;
	}

	public double getGiaDV() {
		return giaDV;
	}

	public void setGiaDV(double giaDV) {
		this.giaDV = giaDV;
	}

	public String getDonVi() {
		return donVi;
	}

	public void setDonVi(String donVi) {
		this.donVi = donVi;
	}

	public int getSoLuong() {
		return soLuong;
	}

	public void setSoLuong(int soLuong) {
		this.soLuong = soLuong;
	}

	public LoaiDichVu getLoaiDichVu() {
		return loaiDichVu;
	}

	public void setLoaiDichVu(LoaiDichVu loaiDichVu) {
		this.loaiDichVu = loaiDichVu;
	}

	public DichVu() {
    }

	public DichVu(Long maDV, String tenDV, double giaDV, String donVi, int soLuong, LoaiDichVu loaiDichVu) {
		this.maDV = maDV;
		this.tenDV = tenDV;
		this.giaDV = giaDV;
		this.donVi = donVi;
		this.soLuong = soLuong;
		this.loaiDichVu = loaiDichVu;
	}

	@Override
	public String toString() {
		return "DichVu [maDV=" + maDV + ", tenDV=" + tenDV + ", giaDV=" + giaDV + ", donVi=" + donVi + ", soLuong="
				+ soLuong + ", loaiDichVu=" + loaiDichVu + "]";
	}
}