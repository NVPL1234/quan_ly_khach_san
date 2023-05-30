import React, { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function BieuDoDichVuTuyChinh() {

    const [ngayDau, setNgayDau] = useState('')
    const [ngayCuoi, setNgayCuoi] = useState('')
    const [luotThue, setLuotThue] = useState([])

    const layDSDVTuyChinh = async () => {
        try {
            let res = await axios.get('http://localhost:8080/services/ngayDau/' + moment(ngayDau).format('YYYY-MM-DD') + '/ngayCuoi/' + moment(ngayCuoi).format('YYYY-MM-DD'))
            let dsdv = res.data
            let ten = ''
            let tongLuotThue = 0
            let luotThueTam = []
            for (let i = 0; i < dsdv.length; i++) {
                if (ten == '') {
                    ten = dsdv[i][2].ten
                }
                if (dsdv[i][2].ten != ten) {
                    luotThueTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    ten = dsdv[i][2].ten
                    tongLuotThue = 0
                }
                if (dsdv.length - i == 1) {
                    tongLuotThue = tongLuotThue + 1
                    luotThueTam.push({
                        ten: ten,
                        tongLuotThue: tongLuotThue
                    })
                    setLuotThue(luotThueTam)
                }
                else {
                    tongLuotThue = tongLuotThue + 1
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const thongKe = () => {
        layDSDVTuyChinh()
    }

    return (
        <div className="row" style={{ marginTop: '2%' }}>
            <div className="row">
                <label htmlFor='ngay_dau' className="form-label col-2">Từ</label>
                <input type='datetime-local' className="form-control col" id='ngay_dau' value={ngayDau} onChange={e => setNgayDau(e.target.value)}/>
                <label htmlFor='ngay_cuoi' className="form-label col-2">Đến</label>
                <input type='datetime-local' className="form-control col" id='ngay_cuoi' value={ngayCuoi} onChange={e => setNgayCuoi(e.target.value)}/>
                <div className="row" style={{ marginTop: '2%' }}>
                    <input type="button" className="btn btn-primary col-2" value='THỐNG KÊ' onClick={thongKe} style={{ marginLeft: '41%' }} />
                </div>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <ResponsiveContainer width="100%" aspect={3}>
                    <BarChart
                        width={500}
                        height={300}
                        data={luotThue}
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
    )
}