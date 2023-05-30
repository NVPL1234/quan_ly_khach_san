import React from "react"
import Nav from "../component/Nav";
import ks from '../hinh/ks.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function TrangChu() {

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div className="row" style={{ marginTop: '1%' }}>
                <img src={ks} width='100%' height='100%' />
            </div>
            <div className="row" style={{ marginTop: '1%' }}>
                <h5>KHÁCH SẠN LAM HẢI</h5>
                <span>Địa chỉ: 12 Nguyễn Văn Bảo, P.4, Quận Gò Vấp, TP.HCM</span>
                <span>Số điện thoại: 0906953700</span>
                <span>Email: nlam39784@gmail.com</span>
                <span>Website: lamhai.com.vn</span>
            </div>
        </div>
    )
}