import React, { useState, useEffect } from "react"
import axios from 'axios'
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function PhongTrong(props) {

    const [donDat, setDonDat] = useState(props.donDat)
    const [loaiThue, setLoaiThue] = useState(donDat.loaiThue)
    const [dsPhong, setDSPhong] = useState([])
    const [dsPhongDat, setDSPhongDat] = useState([])
    const [tongTien, setTongTien] = useState(0)
    const [taiLai, setTaiLai] = useState(true)

    const tinhTongTien = (e, p) => {
        let ngayNhanPhong = donDat.ngayNhanPhong
        let ngayTraPhong = donDat.ngayTraPhong
        if (e.target.checked) {
            setDSPhongDat(phongDat => [...phongDat, p])
            if (loaiThue == 'Thuê theo giờ') {
                let soGioThue = moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'hours')
                let gioDau = p.gioDau
                let gioTiepTheo = soGioThue - gioDau
                if (soGioThue > gioDau) {
                    let thanhTienGioDau = p.giaGioDau
                    let thanhTienGioTiepTheo = gioTiepTheo * p.giaGioTiepTheo
                    let thanhTien = thanhTienGioDau + thanhTienGioTiepTheo
                    setTongTien(tongTien + thanhTien)
                }
                else {
                    let thanhTien = p.giaGioDau
                    setTongTien(tongTien + thanhTien)
                }
            }
            else if (loaiThue == 'Thuê theo ngày') {
                let soNgayThue = moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'days')
                let thanhTien = soNgayThue * p.giaTheoNgay
                setTongTien(tongTien + thanhTien)
            }
        }
        else {
            let dsPhongDatTam = dsPhongDat.filter(phongDat => phongDat.maPhong != p.maPhong)
            setDSPhongDat(dsPhongDatTam)
            if (loaiThue == 'Thuê theo giờ') {
                let soGioThue = moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'hours')
                let gioDau = p.gioDau
                let gioTiepTheo = soGioThue - gioDau
                if (soGioThue > gioDau) {
                    let thanhTienGioDau = p.giaGioDau
                    let thanhTienGioTiepTheo = gioTiepTheo * p.giaGioTiepTheo
                    let thanhTien = thanhTienGioDau + thanhTienGioTiepTheo
                    setTongTien(tongTien - thanhTien)
                }
                else {
                    let thanhTien = p.giaGioDau
                    setTongTien(tongTien - thanhTien)
                }
            }
            else if (loaiThue == 'Thuê theo ngày') {
                let soNgayThue = moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'days')
                let thanhTien = soNgayThue * p.giaTheoNgay
                setTongTien(tongTien - thanhTien)
            }
        }
    }

    const themCTHDPhong = async () => {
        for (let i = 0; i < dsPhongDat.length; i++) {
            let maPhong = dsPhongDat[i].maPhong
            try {
                await axios.put('http://localhost:8080/rooms/' + maPhong + '/' + 'Đã đặt')
                await axios.post('http://localhost:8080/room_order_details', {
                    hoaDon: { 'maHD': donDat.maHD },
                    phong: { 'maPhong': maPhong },
                    gioDau: dsPhongDat[i].gioDau,
                    giaGioDau: dsPhongDat[i].giaGioDau,
                    giaGioTiepTheo: dsPhongDat[i].giaGioTiepTheo,
                    giaTheoNgay: dsPhongDat[i].giaTheoNgay,
                })
            } catch (error) {
                console.log(error.message);
            }
        }
        setTaiLai(true)
        alert("Thêm phòng thành công!")
    }

    useEffect(() => {
        if (taiLai)
            axios.get('http://localhost:8080/rooms/ngayNhanPhong/' + moment(donDat.ngayNhanPhong).format('YYYY-MM-DD HH:mm:ss') + '/ngayTraPhong/' + moment(donDat.ngayTraPhong).format('YYYY-MM-DD HH:mm:ss'))
                .then((res) => {
                    setDSPhong(res.data)
                    setTongTien(0)
                    setDSPhongDat([])
                    setTaiLai(false)
                })
                .catch((e) => console.log(e.message))
    }, [taiLai])

    return (
        <div className="row">
            <div className="row">
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
                                    <th>Chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dsPhong.map((p) =>
                                    <tr key={p.maPhong}>
                                        <td>{p.maPhong}</td>
                                        <td>{p.tang.tenTang}</td>
                                        <td>{p.loaiPhong.ten}</td>
                                        <td>{p.soGiuong}</td>
                                        <td>{p.sucChua}</td>
                                        <td>{p.dienTich}</td>
                                        {loaiThue == 'Thuê theo giờ' && <td>{p.gioDau}</td>}
                                        {loaiThue == 'Thuê theo giờ' && <td>{p.giaGioDau}</td>}
                                        {loaiThue == 'Thuê theo giờ' && <td>{p.giaGioTiepTheo}</td>}
                                        {loaiThue == 'Thuê theo ngày' && <td>{p.giaTheoNgay}</td>}
                                        {loaiThue == 'Thuê theo giờ' && <td>{moment(donDat.ngayTraPhong).diff(moment(donDat.ngayNhanPhong), "hours")}</td>}
                                        {loaiThue == 'Thuê theo ngày' && <td>{moment(donDat.ngayTraPhong).diff(moment(donDat.ngayNhanPhong), "days")}</td>}
                                        <td>
                                            <input type="checkbox" className='form-check-input' onChange={e => tinhTongTien(e, p)} />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <h5>TỔNG TIỀN: <h5 style={{ color: 'red' }}>{tongTien} đ</h5></h5>
                <input type='button' value='THÊM' className='btn btn-success' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={themCTHDPhong} />
            </div>
        </div>
    )
}