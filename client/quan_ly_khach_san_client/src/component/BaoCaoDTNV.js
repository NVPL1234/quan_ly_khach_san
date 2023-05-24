import React, { useState, useRef, useEffect } from "react"
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export const BaoCaoDTNV = React.forwardRef((props, ref) => {

    let nv = props.nv
    let dshd = props.dshd
    const [doanhThu, setDoanhThu] = useState([])
    let ngayDau = props.ngayDau
    let ngayCuoi = props.ngayCuoi

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

    const tienPhong = (hd) => {
        if (hd[0].loaiThue == 'Thuê theo giờ') {
            let gioDau = hd[1].gioDau
            let soGioThue = tinhGioThue(hd[0].ngayNhanPhong, hd[0].ngayTraPhong, hd[1].gioDau)
            let soGioTiepTheo = soGioThue - gioDau
            let tienGioDau = hd[1].giaGioDau
            if (soGioThue > gioDau) {
                let tienGioTiepTheo = soGioTiepTheo * hd[1].giaGioTiepTheo
                return tienGioDau + tienGioTiepTheo
            }
            else if (soGioThue = gioDau) {
                return tienGioDau
            }
        }
        else if (hd[0].loaiThue == 'Thuê theo ngày') {
            let soNgayThue = tinhNgayThue(hd[0].ngayNhanPhong, hd[0].ngayTraPhong)
            return soNgayThue * hd[1].giaTheoNgay
        }
    }

    const tinhTongDoanhThu = () => {
        let tongDoanhThu = 0
        for (let i = 0; i < doanhThu.length; i++) {
            tongDoanhThu = tongDoanhThu + doanhThu[i].tongTien
        }
        return tongDoanhThu
    }

    useEffect(() => {
        let maNV = 0
        let tenNV = ''
        let ngayLapHD = ''
        let tongTien = 0
        let doanhThuTam = []
        for (let i = 0; i < dshd.length; i++) {
            if (ngayLapHD == '') {
                ngayLapHD = moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')
                maNV = dshd[i][0].nhanVien.maNV
                tenNV = dshd[i][0].nhanVien.tenNV
            }
            if (ngayLapHD != moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')) {
                doanhThuTam.push({
                    maNV: maNV,
                    tenNV: tenNV,
                    ngayLapHD: ngayLapHD,
                    tongTien: tongTien
                })
                ngayLapHD = moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')
                maNV = dshd[i][0].nhanVien.maNV
                tenNV = dshd[i][0].nhanVien.tenNV
                tongTien = 0
            }
            if (dshd.length - i == 1) {
                tongTien = tongTien + tienPhong(dshd[i])
                if (dshd[i][2] != null)
                    tongTien = tongTien + (dshd[i][2].soLuong * dshd[i][2].donGia)
                doanhThuTam.push({
                    maNV: maNV,
                    tenNV: tenNV,
                    ngayLapHD: ngayLapHD,
                    tongTien: tongTien
                })
                setDoanhThu(doanhThuTam)
            }
            else {
                if (dshd[i][0].nhanVien.maNV == maNV) {
                    tongTien = tongTien + tienPhong(dshd[i])
                    if (dshd[i][2] != null)
                        tongTien = tongTien + (dshd[i][2].soLuong * dshd[i][2].donGia)
                }
                else {
                    doanhThuTam.push({
                        maNV: maNV,
                        tenNV: tenNV,
                        ngayLapHD: ngayLapHD,
                        tongTien: tongTien
                    })
                    maNV = dshd[i][0].nhanVien.maNV
                    tenNV = dshd[i][0].nhanVien.tenNV
                    tongTien = 0
                    tongTien = tongTien + tienPhong(dshd[i])
                    if (dshd[i][2] != null)
                        tongTien = tongTien + (dshd[i][2].soLuong * dshd[i][2].donGia)
                }
            }
        }
    }, [dshd])

    return (
        <div ref={ref} className="container" id="xuat-bao-cao" hidden>
            <div className="row" style={{ textAlign: 'center', marginTop: '5%' }}>
                <h5>BÁO CÁO DOANH THU</h5>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <span>Ngày lập báo cáo: {moment().format('DD-MM-YYYY HH:mm:ss')}</span>
                <span>Người lập báo cáo: {nv.tenNV}</span>
                <span>Từ ngày: {moment(ngayDau).format('DD-MM-YYYY HH:mm:ss')} đến ngày: {moment(ngayCuoi).format('DD-MM-YYYY HH:mm:ss')}</span>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã nhân viên</th>
                            <th>Tên nhân viên</th>
                            <th>Ngày lập hoá đơn</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doanhThu.length > 0 && doanhThu.map((dt, i) =>
                            <tr key={i}>
                                <td>{dt.maNV}</td>
                                <td>{dt.tenNV}</td>
                                <td>{dt.ngayLapHD}</td>
                                <td>{dt.tongTien}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                {doanhThu.length > 0 && <h5>Tổng doanh thu: {tinhTongDoanhThu()}</h5>}
            </div>
        </div>
    )
});