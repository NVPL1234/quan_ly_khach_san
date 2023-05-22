import React, { useState, useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import { GoSearch } from 'react-icons/go'
import { FiRefreshCw } from 'react-icons/fi'
import axios from 'axios'
import moment from 'moment';
import Nav from "../component/Nav"
import DichVuDaDat from "../component/DichVuDaDat";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.js"

export default function FormPhieuDatDichVu() {

    const [dshd, setDSHD] = useState([])
    const [hd, setHD] = useState(null)
    const [maPhong, setMaPhong] = useState('')
    const [hienModalCT, setHienModalCT] = useState(false);
    const [taiLai, setTaiLai] = useState(true)

    const timPhong = () => {
        setDSHD([])
        axios.get('http://localhost:8080/rooms/maPhong/' + maPhong + '/trangThai/Đã nhận')
            .then((res) => setDSHD(res.data))
            .catch((e) => console.log(e.message))
    }

    const dongModalCT = () => setHienModalCT(false);

    const moModalCT = () => {
        setHienModalCT(true)
    };

    const xemCT = (hd) => {
        setHD(hd)
        moModalCT()
    }

    useEffect(() => {
        if (taiLai)
            axios.get('http://localhost:8080/rooms/maPhong/-1/trangThai/Đã nhận')
                .then((res) => {
                    setDSHD(res.data)
                    setTaiLai(false)
                })
                .catch((e) => console.log(e.message))
    }, [taiLai])

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div className="row" style={{ marginTop: '1%' }}>
                <div className="col input-group">
                    <input type='text' id='ma_phong' className="form-control" placeholder="Bạn muốn tìm phòng..." value={maPhong} onChange={e => setMaPhong(e.target.value)} />
                    <button class="btn btn-success" type="button" onClick={timPhong}><GoSearch /></button>
                </div>
            </div>
            <div className="row" style={{ marginTop: '2%', marginLeft: '2%' }}><button className="btn btn-warning" style={{ width: '5%' }} onClick={e => setTaiLai(true)}><FiRefreshCw /></button></div>
            <div className="row">
                <div className="col">
                    <div className="row table-responsive" style={{ borderRadius: 30, margin: '1%' }}>
                        <table className="table table-hover">
                            <thead className="table-info">
                                <tr>
                                    <th>Mã phòng</th>
                                    <th>Ngày nhận phòng</th>
                                    <th>Ngày trả phòng</th>
                                    <th>Tên khách hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dshd.length > 0 ? dshd.map((hd, i) =>
                                    <tr key={i} onClick={e => xemCT(hd)}>
                                        <td>{hd[1].maPhong}</td>
                                        <td>{moment(hd[0].ngayNhanPhong).format('DD-MM-YYYY HH:mm:ss')}</td>
                                        <td>{moment(hd[0].ngayTraPhong).format('DD-MM-YYYY HH:mm:ss')}</td>
                                        <td>{hd[0].khachHang.tenKH}</td>
                                    </tr>
                                ) : <tr>
                                    <td></td>
                                    {/* <td><span style={{ marginLeft: '65%' }}>Không tìm thấy dữ liệu</span></td> */}
                                    <td></td>
                                    <td></td>
                                </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Modal show={hienModalCT} onHide={dongModalCT} fullscreen>
                    <Modal.Header closeButton>
                        {hd != null && <Modal.Title>PHÒNG: {hd[1].maPhong}</Modal.Title>}
                    </Modal.Header>
                    <Modal.Body>
                        <DichVuDaDat hd={hd} />
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}