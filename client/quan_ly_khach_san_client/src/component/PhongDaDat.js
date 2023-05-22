import React, { useState, useEffect } from "react"
import axios from 'axios'
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function PhongDaDat(props) {

    const [dd, setDD] = useState(props.dd)
    const [loaiThue, setLoaiThue] = useState(dd.loaiThue)
    const [dsPDD, setDSPDD] = useState([])
    const [tongTien, setTongTien] = useState(0)
    const [taiLai, setTaiLai] = useState(true)

    const tinhThanhTien = (phong) => {
        if (loaiThue == 'Thuê theo giờ') {
            let soGioThue = moment(dd.ngayTraPhong).diff(moment(dd.ngayNhanPhong), 'hours')
            let gioDau = phong.gioDau
            let gioTiepTheo = soGioThue - gioDau
            if (soGioThue > gioDau) {
                let thanhTienGioDau = phong.giaGioDau
                let thanhTienGioTiepTheo = gioTiepTheo * phong.giaGioTiepTheo
                return thanhTienGioDau + thanhTienGioTiepTheo
            }
            else {
                return phong.giaGioDau
            }
        }
        else if (loaiThue == 'Thuê theo ngày') {
            let soNgayThue = moment(dd.ngayTraPhong).diff(moment(dd.ngayNhanPhong), 'days')
            return soNgayThue * phong.giaTheoNgay
        }
    }

    const xoa = async (pdd) => {
        if (!(window.confirm('Bạn có chắc muốn xoá?')))
            return false
        try {
            await axios.delete('http://localhost:8080/room_order_details/' + pdd.hoaDon.maHD + '/' + pdd.phong.maPhong)
            await axios.put('http://localhost:8080/rooms/' + pdd.phong.maPhong + '/Trống')
            setTaiLai(true)
        } catch (error) {
            console.log(error.message);
        }
    }

    const nhanPhongDatTruoc = async () => {
        let ngayNhan = moment().format('YYYY-MM-DD HH:mm:ss')
        try {
            await axios({ url: 'http://localhost:8080/orders/' + dd.maHD, method: 'put', params: { ngayNhanPhong: ngayNhan } })
            await axios.put('http://localhost:8080/orders/maHD/' + dd.maHD + '/trangThai/Đã nhận')
        } catch (error) {
            console.log(error.message);
        }
        for (let i = 0; i < dsPDD.length; i++) {
            try {
                await axios.put('http://localhost:8080/rooms/' + dsPDD[i].phong.maPhong + '/Đã nhận')
            } catch (error) {
                console.log(error.message);
            }
        }
        setTaiLai(true)
        alert('Nhận phòng thành công!')
    }

    useEffect(() => {
        if (taiLai)
            axios.get('http://localhost:8080/room_order_details/' + dd.maHD)
                .then((res) => {
                    let dspdd = res.data
                    if (dspdd[0].phong.trangThaiPhong != 'Đã nhận') {
                        setDSPDD(dspdd)
                        let tongTienTam = 0
                        for (let i = 0; i < dspdd.length; i++) {
                            tongTienTam = tongTienTam + tinhThanhTien(dspdd[i].phong)
                        }
                        setTongTien(tongTienTam)
                    }
                    else {
                        setDSPDD([])
                        setTongTien(0)
                    }
                    setTaiLai(false)
                })
                .catch((e) => console.log(e.message))
    }, [taiLai])

    return (
        <div className="row">
            <div className="row" style={{ marginTop: '2%' }}>
                <div className="col">
                    <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100 }}>
                        <table className="table table-hover">
                            <thead className="table-info">
                                <tr>
                                    <th>Mã phòng</th>
                                    <th>Tầng</th>
                                    <th>Loại phòng</th>
                                    <th>Số giường</th>
                                    <th>Sức chứa</th>
                                    <th>Diện tích</th>
                                    {loaiThue == 'Thuê theo giờ' && <th>Giờ đầu</th>}
                                    {loaiThue == 'Thuê theo giờ' && <th>Giá giờ đầu</th>}
                                    {loaiThue == 'Thuê theo giờ' && <th>Giá giờ tiếp theo</th>}
                                    {loaiThue == 'Thuê theo ngày' && <th>Giá theo ngày</th>}
                                    {loaiThue == 'Thuê theo giờ' && <th>Tổng giờ thuê</th>}
                                    {loaiThue == 'Thuê theo ngày' && <th>Tổng ngày thuê</th>}
                                    <th>Thành tiền</th>
                                    {dsPDD.length > 1 && <th>Chọn</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {dsPDD.map((pdd, i) =>
                                    <tr key={i}>
                                        <td>{pdd.phong.maPhong}</td>
                                        <td>{pdd.phong.tang.tenTang}</td>
                                        <td>{pdd.phong.loaiPhong.ten}</td>
                                        <td>{pdd.phong.soGiuong}</td>
                                        <td>{pdd.phong.sucChua}</td>
                                        <td>{pdd.phong.dienTich}</td>
                                        {loaiThue == 'Thuê theo giờ' && <td>{pdd.phong.gioDau}</td>}
                                        {loaiThue == 'Thuê theo giờ' && <td>{pdd.phong.giaGioDau}</td>}
                                        {loaiThue == 'Thuê theo giờ' && <td>{pdd.phong.giaGioTiepTheo}</td>}
                                        {loaiThue == 'Thuê theo ngày' && <td>{pdd.phong.giaTheoNgay}</td>}
                                        {loaiThue == 'Thuê theo giờ' && <td>{moment(pdd.hoaDon.ngayTraPhong).diff(moment(pdd.hoaDon.ngayNhanPhong), 'hours')}</td>}
                                        {loaiThue == 'Thuê theo ngày' && <td>{moment(pdd.hoaDon.ngayTraPhong).diff(moment(pdd.hoaDon.ngayNhanPhong), 'days')}</td>}
                                        <td>{tinhThanhTien(pdd.phong)}</td>
                                        {dsPDD.length > 1 && <td>
                                            <input type="button" className="btn btn-danger" value="XOÁ" onClick={e => xoa(pdd)} />
                                        </td>}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <h5>TỔNG TIỀN: <h5 style={{ color: 'red' }}>{tongTien} đ</h5></h5>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <input type="button" className="btn btn-success" value='NHẬN PHÒNG' onClick={nhanPhongDatTruoc} />
            </div>
        </div>
    )
}