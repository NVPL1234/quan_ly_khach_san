import React, { useState, useRef, useEffect } from "react"
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export const BaoCaoDTNV = React.forwardRef((props, ref) => {

    let dshd = props.dshd
    const [doanhThu, setDoanhThu] = useState([])

    const tienPhong = (hd) => {
        if (hd[0].loaiThue == 'Thuê theo giờ') {
            let gioDau = hd[1].gioDau
            let soGioThue = moment(hd[0].ngayTraPhong).diff(moment(hd[0].ngayNhanPhong), 'hours')
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
            let soNgayThue = moment(hd[0].ngayTraPhong).diff(moment(hd[0].ngayNhanPhong), 'days')
            return soNgayThue * hd[1].giaTheoNgay
        }
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
            <div className="row">
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
        </div>
    )
});