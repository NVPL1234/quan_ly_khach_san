import React, { useState, useRef, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export const BaoCaoDTNV = React.forwardRef((props, ref) => {

    // let dshd = props.dshd
    // let dsDTNV = []

    // useEffect(() => {        
    //     let maNV = 0
    //     let tenNV = ''
    //     let ngayLapHD = ''
    //     let tongTien = 0
    //     let doanhThuTam = []
    //     for (let i = 0; i < dshd.length; i++) {
    //         if (ngayLapHD == '')
    //             ngayLapHD = moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')
    //         if (ngayLapHD != moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')) {
    //             tongTien = tongTienPhong + tongTienDV
    //             doanhThuTam.push({
    //                 maNV:,
    //                 tenNV:,
    //                 ngayLapHD:,
    //                 tongTien:
    //             })
    //             ngayLapHD = moment(dshd[i][0].ngayLapHD).format('DD-MM-YYYY')
    //             tongTienPhong = 0
    //             tongTienDV = 0
    //             tongTien = 0
    //         }
    //         if (dshd.length - i == 1) {
    //             tongTienPhong = tongTienPhong + tienPhong(dshd[i])
    //             if (dshd[i][2] != null)
    //                 tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
    //             tongTien = tongTienPhong + tongTienDV
    //             doanhThuTam.push({
    //                 ngayLapHD: ngayLapHD,
    //                 tongTienPhong: tongTienPhong,
    //                 tongTienDV: tongTienDV,
    //                 tongTien: tongTien
    //             })
    //             setDoanhThu(doanhThuTam)
    //         }
    //         else {
    //             tongTienPhong = tongTienPhong + tienPhong(dshd[i])
    //             if (dshd[i][2] != null)
    //                 tongTienDV = tongTienDV + (dshd[i][2].soLuong * dshd[i][2].donGia)
    //         }
    //     }
    // }, [])

    // return (
    //     <div ref={ref} className="container" id="xuat-bao-cao" hidden>
    //         <div className="row">
    //             <table className="table">
    //                 <thead>
    //                     <tr>
    //                         <th>Mã nhân viên</th>
    //                         <th>Tên nhân viên</th>
    //                         <th>Ngày lập hoá đơn</th>
    //                         <th>Tổng tiền</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {dsDTNV.map((dt, i) => 
    //                         <tr key={i}>
    //                             <td></td>
    //                             <td></td>
    //                             <td></td>
    //                             <td></td>
    //                         </tr>    
    //                     )}
    //                 </tbody>
    //             </table>
    //         </div>
    //     </div>
    // )
})