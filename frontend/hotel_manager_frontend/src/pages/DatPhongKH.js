import React, { useEffect, useState } from "react"
import { GoSearch } from 'react-icons/go'
import axios from "axios";
import moment from 'moment'
import Nav from "../component/Nav";
import Phong from "../component/Phong";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function DatPhongKH() {

    const [ngayNhanPhong, setNgayNhanPhong] = useState('')
    const [ngayTraPhong, setNgayTraPhong] = useState('')
    const [loaiThue, setLoaiThue] = useState('')
    const [dsPhong, setDSPhong] = useState([])

    const timPhong = async () => {
        let ngayNhanf = moment(ngayNhanPhong).format('YYYY-MM-DD HH:mm:ss');
        let ngayTraf = moment(ngayTraPhong).format('YYYY-MM-DD HH:mm:ss');
        if (moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'hours') < 24) {
            localStorage.setItem('ngayNhanPhong', moment(ngayNhanPhong).format())
            localStorage.setItem('ngayTraPhong', moment(ngayTraPhong).format())
            localStorage.setItem('soGioThue', moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'hours'))
            localStorage.setItem('loaiThue', 'Thuê theo giờ')
        }
        else if (moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'hours') >= 24) {
            localStorage.setItem('ngayNhanPhong', moment(ngayNhanPhong).format())
            localStorage.setItem('ngayTraPhong', moment(ngayTraPhong).format())
            localStorage.setItem('soNgayThue', moment(ngayTraPhong).diff(moment(ngayNhanPhong), 'days'))
            localStorage.setItem('loaiThue', 'Thuê theo ngày')
        }
        try {
            let res = await axios.get('http://localhost:8080/rooms/ngayNhanPhong/' + ngayNhanf + '/ngayTraPhong/' + ngayTraf)
            setDSPhong(res.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('ngayNhanPhong') != null) {
            let ngayNhanPhongf = moment(localStorage.getItem('ngayNhanPhong')).format('YYYY-MM-DD HH:mm:ss')
            setNgayNhanPhong(ngayNhanPhongf)
            let ngayTraPhongf = moment(localStorage.getItem('ngayTraPhong')).format('YYYY-MM-DD HH:mm:ss')
            setNgayTraPhong(ngayTraPhongf)
            axios.get('http://localhost:8080/rooms/ngayNhanPhong/' + ngayNhanPhongf + '/ngayTraPhong/' + ngayTraPhongf)
                .then((res) => setDSPhong(res.data))
                .catch((e) => console.log(e))
        }
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div className="row" style={{ marginTop: '1%' }}>
                <form>
                    <div className="col input-group">
                        <span className="input-group-text">Ngày nhận phòng</span>
                        <input type='datetime-local' className="form-control" id='ngay-nhan-phong' value={ngayNhanPhong} onChange={e => setNgayNhanPhong(e.target.value)} />
                        <span className="input-group-text">Ngày trả phòng</span>
                        <input type='datetime-local' className="form-control" id='ngay-tra-phong' value={ngayTraPhong} onChange={e => setNgayTraPhong(e.target.value)} />
                        <button className="btn btn-success" type="button" onClick={timPhong}><GoSearch /></button>
                    </div>
                </form>
            </div>
            <div className="row" style={{ marginTop: '1%', marginBottom: '4%' }}>
                <Phong dsPhong={dsPhong} />
            </div>
        </div>
    )
}