import React from "react"
import Nav from "../component/Nav"
import DatPhong from "../component/DatPhong";
import TraPhong from "../component/TraPhong"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function FormHoaDonPhong() {

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#dat_phong">Đặt phòng</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#nhan_phong_dat_truoc">Nhận phòng đặt trước</a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#tra_phong">Trả phòng</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#don_dep_phong">Phòng cần dọn dẹp</a>
                    </li> */}
                </ul>

                <div className="tab-content">
                    <div className="tab-pane container-fluid active" id="dat_phong">
                        <DatPhong/>
                    </div>
                    <div className="tab-pane container-fluid fade" id="nhan_phong_dat_truoc">
                        
                    </div>
                    <div className="tab-pane container-fluid fade" id="tra_phong">
                        <TraPhong/>
                    </div>
                    <div className="tab-pane container fade" id="don_dep_phong"></div>
                </div>
            </div>
        </div>
    )
}