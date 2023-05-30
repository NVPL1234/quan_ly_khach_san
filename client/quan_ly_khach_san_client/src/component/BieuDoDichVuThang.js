import React, { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function BieuDoDichVuThang() {

    const [luotThue3Thang, setLuotThue3Thang] = useState([])
    const [luotThue6Thang, setLuotThue6Thang] = useState([])
    const [luotThue12Thang, setLuotThue12Thang] = useState([])
    const [loaiTK, setLoaiTK] = useState('3 thang')

    const layDSDVTrong3Thang = async () => {

        try {
            let res = await axios.get('http://localhost:8080/services/soNgay/90')
            let dsdv = res.data
            let ten = ''
            let tongLuotThue = 0
            let luotThue3ThangTam = []
            for (let i = 0; i < dsdv.length; i++) {
                if (ten == '') {
                    ten = dsdv[i][2].ten
                }
                if (dsdv[i][2].ten != ten) {
                    luotThue3ThangTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    ten = dsdv[i][2].ten
                    tongLuotThue = 0
                }
                if (dsdv.length - i == 1) {
                    tongLuotThue = tongLuotThue + 1
                    luotThue3ThangTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    setLuotThue3Thang(luotThue3ThangTam)
                }
                else {
                    tongLuotThue = tongLuotThue + 1
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const layDSDVTrong6Thang = async () => {

        try {
            let res = await axios.get('http://localhost:8080/services/soNgay/180')
            let dsdv = res.data
            let ten = ''
            let tongLuotThue = 0
            let luotThue6ThangTam = []
            for (let i = 0; i < dsdv.length; i++) {
                if (ten == '') {
                    ten = dsdv[i][2].ten
                }
                if (dsdv[i][2].ten != ten) {
                    luotThue6ThangTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    ten = dsdv[i][2].ten
                    tongLuotThue = 0
                }
                if (dsdv.length - i == 1) {
                    tongLuotThue = tongLuotThue + 1
                    luotThue6ThangTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    setLuotThue6Thang(luotThue6ThangTam)
                }
                else {
                    tongLuotThue = tongLuotThue + 1
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const layDSDVTrong12Thang = async () => {

        try {
            let res = await axios.get('http://localhost:8080/services/soNgay/365')
            let dsdv = res.data
            let ten = ''
            let tongLuotThue = 0
            let luotThue12ThangTam = []
            for (let i = 0; i < dsdv.length; i++) {
                if (ten == '') {
                    ten = dsdv[i][2].ten
                }
                if (dsdv[i][2].ten != ten) {
                    luotThue12ThangTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    ten = dsdv[i][2].ten
                    tongLuotThue = 0
                }
                if (dsdv.length - i == 1) {
                    tongLuotThue = tongLuotThue + 1
                    luotThue12ThangTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    setLuotThue12Thang(luotThue12ThangTam)
                }
                else {
                    tongLuotThue = tongLuotThue + 1
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const thongKe3Thang = () => {
        setLoaiTK('3 thang')
    }

    const thongKe6Thang = () => {
        setLoaiTK('6 thang')
    }

    const thongKe12Thang = () => {
        setLoaiTK('12 thang')
    }


    useEffect(() => {
        if (loaiTK == '3 thang')
            layDSDVTrong3Thang()
        else if (loaiTK == '6 thang')
            layDSDVTrong6Thang()
        else if (loaiTK == '12 thang')
            layDSDVTrong12Thang()
    }, [loaiTK])

    return (
        <>
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <a class="nav-link active" data-bs-toggle="pill" href="#bd_dv_3_thang" onClick={e => thongKe3Thang()}>3 tháng</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="pill" href="#bd_dv_6_thang" onClick={e => thongKe6Thang()}>6 tháng</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="pill" href="#bd_dv_12_thang" onClick={e => thongKe12Thang()}>12 tháng</a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane container active" id="bd_dv_3_thang">
                    <div className="container-fluid">
                        <div className="row" style={{ marginTop: '2%' }}>
                            <ResponsiveContainer width="100%" aspect={3}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={luotThue3Thang}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="ten" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="tongLuotThue" fill="#a27ea8" name="Lượt thuê" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div class="tab-pane container" id="bd_dv_6_thang">
                    <div className="container-fluid">
                        <div className="row" style={{ marginTop: '2%' }}>
                            <ResponsiveContainer width="100%" aspect={3}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={luotThue6Thang}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="ten" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="tongLuotThue" fill="#a27ea8" name="Lượt thuê" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div class="tab-pane container fade" id="bd_dv_12_thang">
                    <div className="container-fluid">
                        <div className="row" style={{ marginTop: '2%' }}>
                            <ResponsiveContainer width="100%" aspect={3}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={luotThue12Thang}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="ten" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="tongLuotThue" fill="#a27ea8" name="Lượt thuê" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}