package com.example.quan_ly_ks_server.entity;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;

@Embeddable
public class ChiTietHoaDonPhongPK implements Serializable {

	private Long hoaDon;
	private String phong;

	public ChiTietHoaDonPhongPK() {
	}

	@Override
	public int hashCode() {
		return Objects.hash(hoaDon, phong);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ChiTietHoaDonPhongPK other = (ChiTietHoaDonPhongPK) obj;
		return Objects.equals(hoaDon, other.hoaDon) && Objects.equals(phong, other.phong);
	}

}
