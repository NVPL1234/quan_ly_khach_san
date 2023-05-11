package com.example.spring_boot_api_jwt_ad.entity;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;

@Embeddable
public class ChiTietHoaDonDichVuPK implements Serializable {

	private Long hoaDon;
	private Long dichVu;

	public ChiTietHoaDonDichVuPK() {
	}

	@Override
	public int hashCode() {
		return Objects.hash(dichVu, hoaDon);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ChiTietHoaDonDichVuPK other = (ChiTietHoaDonDichVuPK) obj;
		return Objects.equals(dichVu, other.dichVu) && Objects.equals(hoaDon, other.hoaDon);
	}

}
