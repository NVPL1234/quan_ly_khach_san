import React, { useState, useRef, useEffect } from "react"
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export const HoaDon = React.forwardRef((props, ref) => {

  let donDat = props.donDat
  let ngayLapHD = props.ngayLapHD
  let ngayTraPhong = props.ngayTraPhong
  let dscthdp = props.dscthdp
  let dscthddv = props.dscthddv
  const [tongTien, setTongTien] = useState(0)
  let nv = props.nv

  const tinhGioThue = (ngayNhanPhong, ngayTraPhong, gioDau) => {
    let tongGioThue = moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'hours')
    if (tongGioThue == 0 || tongGioThue < gioDau)
      return gioDau
    else {
      let tongPhutThue = moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'minutes')
      let phutThue = tongGioThue * 60
      let phutLe = tongPhutThue - phutThue
      if (phutLe >= 30) {
        return tongGioThue + 1
      }
      else {
        return tongGioThue
      }
    }
  }

  const tinhNgayThue = (ngayNhanPhong, ngayTraPhong) => {
    let tongNgayThue = moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'days')
    if (tongNgayThue == 0)
      return 1
    else {
      let tongGioThue = moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'hours')
      let gioThue = tongNgayThue * 24
      let gioLe = tongGioThue - gioThue
      if (gioLe >= 12) {
        return tongNgayThue + 1
      }
      else {
        return tongNgayThue
      }
    }
  }

  const tinhThanhTien = (cthdp) => {
    if (donDat.loaiThue == 'Thuê theo giờ') {
      let soGioThue = tinhGioThue(donDat.ngayNhanPhong, ngayTraPhong, cthdp.gioDau)
      let gioDau = cthdp.gioDau
      let gioTiepTheo = soGioThue - gioDau
      if (soGioThue > gioDau) {
        let thanhTienGioDau = cthdp.giaGioDau
        let thanhTienGioTiepTheo = gioTiepTheo * cthdp.giaGioTiepTheo
        return thanhTienGioDau + thanhTienGioTiepTheo
      }
      else {
        return cthdp.giaGioDau
      }
    }
    else if (donDat.loaiThue == 'Thuê theo ngày') {
      let soNgayThue = tinhNgayThue(donDat.ngayNhanPhong, ngayTraPhong)
      return soNgayThue * cthdp.giaTheoNgay
    }
  }

  useEffect(() => {
    let tongTienTam = 0
    for (let i = 0; i < dscthdp.length; i++) {
      tongTienTam = tongTienTam + tinhThanhTien(dscthdp[i].phong)
    }
    for (let i = 0; i < dscthddv.length; i++) {
      tongTienTam = tongTienTam + (dscthddv[i].donGia * dscthddv[i].soLuong)
    }
    setTongTien(tongTienTam - donDat.tienCoc)
  }, [donDat, dscthdp, dscthddv])

  return (
    <div ref={ref} className="container" id="in_hoa_don" hidden>
      <div className="row">
        <span style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>KHÁCH SẠN LAM HẢI</span>
        <span>Địa chỉ: 12 Nguyễn Văn Bảo, P.4, Quận Gò Vấp, TP.HCM</span>
        <span>Số điện thoại: 0906953700</span>
        <span>Email: nlam39784@gmail.com</span>
        <span>Website: lamhai.com.vn</span>
      </div>
      <div className="row" style={{ marginTop: '1%', textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>
        <span>HOÁ ĐƠN</span>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <span className="col">Ngày lập hoá đơn: {ngayLapHD.format('DD-MM-YYYY')}</span>
        <span className="col">Ngày nhận phòng: {moment(donDat.ngayNhanPhong).format('DD-MM-YYYY HH:mm:ss')}</span>
        <span className="col">Ngày trả phòng: {ngayTraPhong.format('DD-MM-YYYY HH:mm:ss')}</span>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <span className="col">Tên khách hàng: {donDat.khachHang.tenKH}</span>
        <span className="col">Số CMND/CCCD: {donDat.khachHang.soCMND}</span>
        <span className="col">Số điện thoại: {donDat.khachHang.sDT}</span>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <span className="col">Tên nhân viên thu: {nv.tenNV}</span>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <h4>PHÒNG</h4>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Mã phòng</th>
              {dscthdp[0].hoaDon.loaiThue == 'Thuê theo giờ' && <th>Giờ đầu</th>}
              {dscthdp[0].hoaDon.loaiThue == 'Thuê theo giờ' && <th>Giá giờ đầu</th>}
              {dscthdp[0].hoaDon.loaiThue == 'Thuê theo giờ' && <th>Giá giờ tiếp theo</th>}
              {dscthdp[0].hoaDon.loaiThue == 'Thuê theo giờ' && <th>Tổng giờ thuê</th>}
              {dscthdp[0].hoaDon.loaiThue == 'Thuê theo ngày' && <th>Giá theo ngày</th>}
              {dscthdp[0].hoaDon.loaiThue == 'Thuê theo ngày' && <th>Tổng ngày thuê</th>}
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {dscthdp.map((cthdp, i) =>
              <tr key={i}>
                <td>{cthdp.phong.maPhong}</td>
                {donDat.loaiThue == 'Thuê theo giờ' && <td>{cthdp.gioDau}</td>}
                {donDat.loaiThue == 'Thuê theo giờ' && <td>{cthdp.giaGioDau.toLocaleString({ style: "currency", currency: "vnd" })}</td>}
                {donDat.loaiThue == 'Thuê theo giờ' && <td>{cthdp.giaGioTiepTheo.toLocaleString({ style: "currency", currency: "vnd" })}</td>}
                {donDat.loaiThue == 'Thuê theo giờ' && <td>{tinhGioThue(donDat.ngayNhanPhong, ngayTraPhong, cthdp.gioDau)}</td>}
                {donDat.loaiThue == 'Thuê theo ngày' && <td>{cthdp.giaTheoNgay.toLocaleString({ style: "currency", currency: "vnd" })}</td>}
                {donDat.loaiThue == 'Thuê theo ngày' && <td>{tinhNgayThue(donDat.ngayNhanPhong, ngayTraPhong)}</td>}
                <td>{tinhThanhTien(cthdp).toLocaleString({ style: "currency", currency: "vnd" })}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <h4>DỊCH VỤ</h4>
      </div>
      <div className="row" style={{ marginTop: '1%' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Mã phòng</th>
              <th>Tên dịch vụ</th>
              <th>Giá dịch vụ</th>
              <th>Đơn vị</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {dscthddv.map((cthddv, i) =>
              <tr key={i}>
                <td>{cthddv.phong.maPhong}</td>
                <td>{cthddv.dichVu.tenDV}</td>
                <td>{cthddv.donGia.toLocaleString({ style: "currency", currency: "vnd" })}</td>
                <td>{cthddv.dichVu.donVi}</td>
                <td>{cthddv.soLuong}</td>
                <td>{(cthddv.soLuong * cthddv.donGia).toLocaleString({ style: "currency", currency: "vnd" })}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='row' style={{ marginTop: '2%' }}>
        <span style={{ fontSize: 20 }}>TIỀN CỌC: {donDat.tienCoc.toLocaleString({ style: "currency", currency: "vnd" })}</span>
      </div>
      <div className='row' style={{ marginTop: '2%' }}>
        <h5>TỔNG TIỀN THANH TOÁN: <h5>{tongTien.toLocaleString({ style: "currency", currency: "vnd" })} đ</h5></h5>
      </div>
      <div className='row' style={{ marginTop: '2%', textAlign: 'center' }}>
        <h5>---TRÂN TRỌNG CẢM ƠN QUÝ KHÁCH!---</h5>
      </div>
    </div>
  );
});