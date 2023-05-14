import React, { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import BieuDoDichVuNgay from "./BieuDoDichVuNgay";
import BieuDoDichVuThang from "./BieuDoDichVuThang";
import BieuDoDichVuTuyChinh from "./BieuDoDichVuTuyChinh";
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function TKDichVu() {
    const [loaiTK, setLoaiTK] = useState('1')

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="row" style={{ marginTop: '1%' }}>
                    <label htmlFor='loai_tk' className="form-label col-2">Chọn loại thống kê</label>
                    <select className="form-select col" id='loai_tk' value={loaiTK} onChange={e => setLoaiTK(e.target.value)}>
                        <option value="1">Thống kê theo ngày</option>
                        <option value="2">Thống kê theo tháng</option>
                        <option value="3">Tuỳ chỉnh</option>
                    </select>
                </div>

                {loaiTK == '1' && <BieuDoDichVuNgay />}
                {loaiTK == '2' && <BieuDoDichVuThang />}
                {loaiTK == '3' && <BieuDoDichVuTuyChinh/>}
            </div>
        </div>
    )
}