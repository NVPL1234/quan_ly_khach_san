import React, { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function BieuDoDichVuNgay() {

    const [luotThueHomNay, setLuotThueHomNay] = useState([])
    const [luotThue7Ngay, setLuotThue7Ngay] = useState([])
    const [luotThue30Ngay, setLuotThue30Ngay] = useState([])
    const [loaiTK, setLoaiTK] = useState('hom nay')

    const layDSDVTrongHomNay = async () => {

        try {
            let res = await axios.get('http://localhost:8080/services/soNgay/0')
            let dsdv = res.data
            let ten = ''
            let tongLuotThue = 0
            let luotThueHomNayTam = []
            for (let i = 0; i < dsdv.length; i++) {
                if (ten == '') {
                    ten = dsdv[i][2].ten
                }
                if (dsdv[i][2].ten != ten) {
                    luotThueHomNayTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    ten = dsdv[i][2].ten
                    tongLuotThue = 0
                }
                if (dsdv.length - i == 1) {
                    tongLuotThue = tongLuotThue + 1
                    luotThueHomNayTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    setLuotThueHomNay(luotThueHomNayTam)
                }
                else {
                    tongLuotThue = tongLuotThue + 1
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const layDSDVTrong7Ngay = async () => {

        try {
            let res = await axios.get('http://localhost:8080/services/soNgay/7')
            let dsdv = res.data
            let ten = ''
            let tongLuotThue = 0
            let luotThue7NgayTam = []
            for (let i = 0; i < dsdv.length; i++) {
                if (ten == '') {
                    ten = dsdv[i][2].ten
                }
                if (dsdv[i][2].ten != ten) {
                    luotThue7NgayTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    ten = dsdv[i][2].ten
                    tongLuotThue = 0
                }
                if (dsdv.length - i == 1) {
                    tongLuotThue = tongLuotThue + 1
                    luotThue7NgayTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    setLuotThue7Ngay(luotThue7NgayTam)
                }
                else {
                    tongLuotThue = tongLuotThue + 1
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const layDSDVTrong30Ngay = async () => {

        try {
            let res = await axios.get('http://localhost:8080/services/soNgay/30')
            let dsdv = res.data
            let ten = ''
            let tongLuotThue = 0
            let luotThue30NgayTam = []
            for (let i = 0; i < dsdv.length; i++) {
                if (ten == '') {
                    ten = dsdv[i][2].ten
                }
                if (dsdv[i][2].ten != ten) {
                    luotThue30NgayTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    ten = dsdv[i][2].ten
                    tongLuotThue = 0
                }
                if (dsdv.length - i == 1) {
                    tongLuotThue = tongLuotThue + 1
                    luotThue30NgayTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    setLuotThue30Ngay(luotThue30NgayTam)
                }
                else {
                    tongLuotThue = tongLuotThue + 1
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const thongKeHomNay = () => {
        setLoaiTK('hom nay')
    }

    const thongKe7Ngay = () => {
        setLoaiTK('7 ngay')
    }

    const thongKe30Ngay = () => {
        setLoaiTK('30 ngay')
    }

    useEffect(() => {
        if (loaiTK == 'hom nay')
            layDSDVTrongHomNay()
        else if (loaiTK == '7 ngay')
            layDSDVTrong7Ngay()
        else if (loaiTK == '30 ngay')
            layDSDVTrong30Ngay()
    }, [loaiTK])

    return (
        <>
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <a class="nav-link active" data-bs-toggle="pill" href="#bd_dv_hom_nay" onClick={e => thongKeHomNay()}>Hôm nay</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="pill" href="#bd_dv_7_ngay" onClick={e => thongKe7Ngay()}>7 ngày</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="pill" href="#bd_dv_30_ngay" onClick={e => thongKe30Ngay()}>30 ngày</a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane container active" id="bd_dv_hom_nay">
                    <div className="container-fluid">
                        <div className="row" style={{ marginTop: '2%' }}>
                            <ResponsiveContainer width="100%" aspect={3}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={luotThueHomNay}
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
                                    <Bar dataKey="tongLuotThue" fill="#8884d8" name="Lượt thuê" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div class="tab-pane container fade" id="bd_dv_7_ngay">
                    <div className="container-fluid">
                        <div className="row" style={{ marginTop: '2%' }}>
                            <ResponsiveContainer width="100%" aspect={3}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={luotThue7Ngay}
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
                                    <Bar dataKey="tongLuotThue" fill="#8884d8" name="Lượt thuê" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div class="tab-pane container fade" id="bd_dv_30_ngay">
                    <div className="container-fluid">
                        <div className="row" style={{ marginTop: '2%' }}>
                            <ResponsiveContainer width="100%" aspect={3}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={luotThue30Ngay}
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
                                    <Bar dataKey="tongLuotThue" fill="#8884d8" name="Lượt thuê" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}