import React, { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import Nav from "../component/Nav"
import TKDichVu from "../component/TKDichVu"
import TKDoanhThu from "../component/TKDoanhThu"
import TKPhong from "../component/TKPhong"
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function ThongKe() {

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#doanh_thu">DOANH THU</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#phong">PHÒNG</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#dich_vu">DỊCH VỤ</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane container-fluid active" id="doanh_thu">
                        <TKDoanhThu />
                    </div>
                    <div className="tab-pane container-fluid fade" id="phong">
                        <TKPhong/>
                    </div>
                    <div className="tab-pane container-fluid fade" id="dich_vu">
                        <TKDichVu />
                    </div>
                </div>
            </div>
        </div>
    )
}