import React, { useState, useRef, useEffect } from "react"
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export const HoaDon = React.forwardRef((props, ref) => {

  let ngayLapHD = props.ngayLapHD
  let ngayNhanPhong = props.ngayNhanPhong
  let ngayTraPhong = props.ngayTraPhong
  let tienCoc = props.tienCoc
  let tenKH = props.tenKH
  let sDT = props.sDT
  let soCMND = props.soCMND
  let dscthdp = props.dscthdp
  let dscthddv = props.dscthddv

  const themDSPhongDaNhanVaoBang = (dscthdp) => {

    var tbody = document.getElementById('phong_da_nhan_2').getElementsByTagName('tbody')[0];
    var rowCount = tbody.rows.length;
    for (var i = rowCount - 1; i >= 0; i--) {
      tbody.deleteRow(i);
    }

    for (let i = 0; i < dscthdp.length; i++) {
      var hang = tbody.insertRow();

      var oMaPhong = hang.insertCell();

      var maPhong = document.createTextNode(dscthdp[i].phong.maPhong);
      oMaPhong.appendChild(maPhong);

      if (dscthdp[i].hoaDon.loaiThue == 'Thuê theo giờ') {
        var oGioDau = hang.insertCell();
        var oGiaGioDau = hang.insertCell();
        var oGiaGioTiepTheo = hang.insertCell();
        var oTongGioThue = hang.insertCell();
        var oThanhTien = hang.insertCell();
        oThanhTien.className = 'o_thanh_tien_2'
        var tgioDau = document.createTextNode(dscthdp[i].phong.gioDau);
        oGioDau.appendChild(tgioDau);
        var giaGioDau = document.createTextNode(dscthdp[i].phong.giaGioDau);
        oGiaGioDau.appendChild(giaGioDau);
        var giaGioTiepTheo = document.createTextNode(dscthdp[i].phong.giaGioTiepTheo);
        oGiaGioTiepTheo.appendChild(giaGioTiepTheo);
        let soGioThue
        if (moment(ngayTraPhong).diff(ngayNhanPhong, 'minutes') >= 1)
          soGioThue = moment(ngayTraPhong).diff(ngayNhanPhong, 'hours') + 1
        else
          soGioThue = moment(ngayTraPhong).diff(ngayNhanPhong, 'hours')
        var tongGioThue = document.createTextNode(soGioThue);
        oTongGioThue.appendChild(tongGioThue);

        let gioDau = dscthdp[i].phong.gioDau
        let gioTiepTheo = soGioThue - gioDau
        if (soGioThue > gioDau) {
          let thanhTienGioDau = gioDau * dscthdp[i].phong.giaGioDau
          let thanhTienGioTiepTheo = gioTiepTheo * dscthdp[i].phong.giaGioTiepTheo
          var thanhTien = document.createTextNode(thanhTienGioDau + thanhTienGioTiepTheo);
          oThanhTien.appendChild(thanhTien);
        }
        else {
          var thanhTien = document.createTextNode(soGioThue * dscthdp[i].phong.giaGioDau);
          oThanhTien.appendChild(thanhTien);
        }
      }
      else if (dscthdp[i].hoaDon.loaiThue == 'Thuê theo ngày') {
        var oGiaTheoNgay = hang.insertCell();
        var oTongNgayThue = hang.insertCell();
        var oThanhTien = hang.insertCell();
        oThanhTien.className = 'o_thanh_tien_2'
        var giaTheoNgay = document.createTextNode(dscthdp[i].phong.giaTheoNgay);
        oGiaTheoNgay.appendChild(giaTheoNgay);
        let soNgayThue = moment(ngayTraPhong).diff(ngayNhanPhong, 'days')
        var tongNgayThue = document.createTextNode(soNgayThue);
        oTongNgayThue.appendChild(tongNgayThue);
        var thanhTien = document.createTextNode(soNgayThue * dscthdp[i].phong.giaTheoNgay);
        oThanhTien.appendChild(thanhTien);
      }
      else if (dscthdp[i].hoaDon.loaiThue == 'Thuê qua đêm') {
        var oGiaQuaDem = hang.insertCell();
        var oTongDemThue = hang.insertCell();
        var oThanhTien = hang.insertCell();
        oThanhTien.className = 'o_thanh_tien_2'
        var giaQuaDem = document.createTextNode(dscthdp[i].phong.giaQuaDem);
        oGiaQuaDem.appendChild(giaQuaDem);
        var tongDemThue = document.createTextNode(1);
        oTongDemThue.appendChild(tongDemThue);
        var thanhTien = document.createTextNode(dscthdp[i].phong.giaQuaDem);
        oThanhTien.appendChild(thanhTien);
      }
    }

    var ttPhongVaDV = document.getElementsByClassName('o_thanh_tien_2');
    var len = ttPhongVaDV.length;
    let tongThanhTien = 0
    for (var i = 0; i < len; i++) {
      tongThanhTien = tongThanhTien + parseFloat(ttPhongVaDV[i].textContent)
    }
    document.getElementById('thanh_tien_4').innerHTML = tongThanhTien - tienCoc + ' đ'
  }

  const themDSDVDaNhanVaoBang = (dscthddv) => {

    var tbody = document.getElementById('dv_da_nhan_2').getElementsByTagName('tbody')[0];
    var rowCount = tbody.rows.length;
    for (var i = rowCount - 1; i >= 0; i--) {
      tbody.deleteRow(i);
    }
    for (let i = 0; i < dscthddv.length; i++) {
      var hang = tbody.insertRow();

      var oTenDV = hang.insertCell();
      var oGiaDV = hang.insertCell();
      var oDonVi = hang.insertCell();
      var oSoLuong = hang.insertCell();
      var oThanhTien = hang.insertCell();
      oThanhTien.className = 'o_thanh_tien_2'

      var tenDV = document.createTextNode(dscthddv[i].dichVu.tenDV);
      oTenDV.appendChild(tenDV);
      var giaDV = document.createTextNode(dscthddv[i].dichVu.giaDV);
      oGiaDV.appendChild(giaDV);
      var donVi = document.createTextNode(dscthddv[i].dichVu.donVi);
      oDonVi.appendChild(donVi);
      var soLuong = document.createTextNode(dscthddv[i].soLuong);
      oSoLuong.appendChild(soLuong);
      var thanhTien = document.createTextNode(dscthddv[i].soLuong * dscthddv[i].dichVu.giaDV);
      oThanhTien.appendChild(thanhTien)
    }
    var ttPhongVaDV = document.getElementsByClassName('o_thanh_tien_2');
    var len = ttPhongVaDV.length;
    let tongThanhTien = 0
    for (var i = 0; i < len; i++) {
      tongThanhTien = tongThanhTien + parseFloat(ttPhongVaDV[i].textContent)
    }
    document.getElementById('thanh_tien_4').innerHTML = tongThanhTien - tienCoc + ' đ'
  }

  useEffect(() => {
    themDSPhongDaNhanVaoBang(dscthdp)
    themDSDVDaNhanVaoBang(dscthddv)
  }, [dscthdp, dscthddv])

  return (
    <div ref={ref} className="container" id="in_hoa_don" hidden>
      <div className="row">
        <span style={{ textAlign: 'center' }}>KHÁCH SẠN LAM HẢI</span>
        <span>Địa chỉ: 12 Nguyễn Văn Bảo P.4 Quận Gò Vấp TP.HCM</span>
        <span>Số điện thoại: 0906953700</span>
        <span>Email: nlam39784@gmail.com</span>
        <span>Website: lamhai.com.vn</span>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <span>HOÁ ĐƠN</span>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <span className="col">Ngày lập hoá đơn: {ngayLapHD}</span>
        <span className="col">Ngày nhận phòng: {ngayNhanPhong}</span>
        <span className="col">Ngày trả phòng: {ngayTraPhong}</span>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <span className="col">Tên khách hàng: {tenKH}</span>
        <span className="col">Số CMND/CCCD: {soCMND}</span>
        <span className="col">Số điện thoại: {sDT}</span>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <h4>PHÒNG</h4>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <table id="phong_da_nhan_2" className="table">
          <thead>
            <tr>
              <th>Mã phòng</th>
              {dscthdp[0].hoaDon.loaiThue == 'Thuê theo giờ' && <th>Giờ đầu</th>}
              {dscthdp[0].hoaDon.loaiThue == 'Thuê theo giờ' && <th>Giá giờ đầu</th>}
              {dscthdp[0].hoaDon.loaiThue == 'Thuê theo giờ' && <th>Giá giờ tiếp theo</th>}
              {dscthdp[0].hoaDon.loaiThue == 'Thuê theo giờ' && <th>Tổng giờ thuê</th>}
              {dscthdp[0].hoaDon.loaiThue == 'Thuê theo ngày' && <th>Giá theo ngày</th>}
              {dscthdp[0].hoaDon.loaiThue == 'Thuê theo ngày' && <th>Tổng ngày thuê</th>}
              {dscthdp[0].hoaDon.loaiThue == 'Thuê qua đêm' && <th>Giá qua đêm</th>}
              {dscthdp[0].hoaDon.loaiThue == 'Thuê qua đêm' && <th>Tổng đêm thuê</th>}
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <h4>DỊCH VỤ</h4>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <table id="dv_da_nhan_2" className="table">
          <thead>
            <tr>
              <th>Tên dịch vụ</th>
              <th>Giá dịch vụ</th>
              <th>Đơn vị</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
      <div className='row' style={{ marginTop: '2%' }}>
        <span style={{ fontSize: 20 }}>TIỀN CỌC: {tienCoc}</span>
      </div>
      <div className='row' style={{ marginTop: '2%' }}>
        <h5>TỔNG TIỀN THANH TOÁN: <h5 id='thanh_tien_4'>0 đ</h5></h5>
      </div>
    </div>
  );
});