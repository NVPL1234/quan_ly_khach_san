import React, { useState, useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import { TiDeleteOutline } from 'react-icons/ti'
import { GoSearch } from 'react-icons/go'
import { FiRefreshCw } from 'react-icons/fi'
import { GrAdd } from 'react-icons/gr'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function DanhSachDichVu(props) {

    let taiLaiDVDD = props.taiLai
    let setTaiLaiDVDD = props.setTaiLai
    const hd = props.hd
    const [dsdv, setDSDV] = useState([])
    const [dsLoaiDV, setDSLoaiDV] = useState([])
    const [maLoaiDV, setMaLoaiDV] = useState(0)
    const [tenDV, setTenDV] = useState('')
    const [dichVu, setDichVu] = useState(null)
    const [soLuong, setSoLuong] = useState(0)
    const [tongTien, setTongTien] = useState(0)
    const [hienModalThem, setHienModalThem] = useState(false)
    const [taiLai, setTaiLai] = useState(true)

    const timDVTheoLoai = () => {
        setDSDV([])
        if (maLoaiDV != '') {
            axios.get('http://localhost:8080/services/maLoaiDV/' + maLoaiDV)
                .then((res) => setDSDV(res.data))
                .catch((e) => console.log(e.message))
        }
        else {

        }
    }

    const timDVTheoTen = async () => {
        setDSDV([])
        if (tenDV != '') {
            axios.get('http://localhost:8080/services/tenDV/' + tenDV)
                .then((res) => setDSDV(res.data))
                .catch((e) => console.log(e.message))
        }
        else {

        }
    }

    const dongModalThem = () => setHienModalThem(false)

    const moModalThem = () => setHienModalThem(true)

    const them = (dv) => {
        setDichVu(dv)
        setSoLuong(0)
        setTongTien(0)
        moModalThem()
    }

    const tinhTongTien = (e) => {
        let soLuong = e.target.value
        setSoLuong(soLuong)
        setTongTien(dichVu.giaDV * soLuong)
    }

    const luu = async () => {
        try {
            await axios.put('http://localhost:8080/services/' + dichVu.maDV + '/' + soLuong + '/Giam')
            await axios.post('http://localhost:8080/service_order_details', {
                hoaDon: { 'maHD': hd[0].maHD },
                dichVu: { 'maDV': dichVu.maDV },
                phong: { 'maPhong': hd[1].maPhong },
                soLuong: soLuong,
                donGia: dichVu.giaDV
            })
            dongModalThem()
            setTaiLai(true)
            setTaiLaiDVDD(true)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (taiLai || taiLaiDVDD) {
            axios.get('http://localhost:8080/service_categories')
                .then((res) => {
                    setDSLoaiDV(res.data)
                    setMaLoaiDV(res.data[0].maLoaiDV)
                })
                .catch((e) => console.log(e.message))

            axios.get('http://localhost:8080/services')
                .then((res) => setDSDV(res.data))
                .catch((e) => console.log(e.message))

            setTaiLai(false)
        }
    }, [taiLai, taiLaiDVDD])

    return (
        <div>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col input-group">
                            <select className="form-select" value={maLoaiDV} onChange={e => setMaLoaiDV(e.target.value)}>
                                {dsLoaiDV.map((loaiDV, i) =>
                                    <option key={i} value={loaiDV.maLoaiDV}>{loaiDV.ten}</option>
                                )}
                            </select>
                            <button class="btn btn-success" type="button" onClick={timDVTheoLoai}><GoSearch /></button>
                        </div>
                        <div className="col input-group">
                            <input type='text' id='ten_dv' className="form-control" placeholder="Nhập tên dịch vụ" value={tenDV} onChange={e => setTenDV(e.target.value)} />
                            <button class="btn btn-success" type="button" onClick={timDVTheoTen}><GoSearch /></button>
                        </div>
                        <div className="col-1">
                            <button type="button" className="btn btn-warning" onClick={e => setTaiLai(true)}><FiRefreshCw/></button>
                        </div>
                    </div>
                    <div className="row table-responsive" style={{ marginTop: '2%', borderRadius: 30, borderWidth: 100 }}>
                        <table className="table table-hover">
                            <thead className="table-info">
                                <tr>
                                    <th>Mã dịch vụ</th>
                                    <th>Tên dịch vụ</th>
                                    <th>Giá dịch vụ</th>
                                    <th>Đơn vị</th>
                                    <th>Số lượng</th>
                                    <th>Loại dịch vụ</th>
                                    <th>Thêm</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dsdv.map((dv, i) =>
                                    <tr key={i}>
                                        <td>{dv.maDV}</td>
                                        <td>{dv.tenDV}</td>
                                        <td>{dv.giaDV}</td>
                                        <td>{dv.donVi}</td>
                                        <td>{dv.soLuong}</td>
                                        <td>{dv.loaiDichVu.ten}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning" onClick={e => them(dv)}><GrAdd /></button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={hienModalThem} onHide={dongModalThem} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>DỊCH VỤ</Modal.Title>
                </Modal.Header>
                {dichVu != null &&
                    <Modal.Body>
                        <div className="row" style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%' }}>
                            <div className="row" style={{ marginBottom: '1%' }}>
                                <span>Tên dịch vụ: <span>{dichVu.tenDV}</span></span>
                            </div>
                            <label htmlFor="so-luong" className="col-2">Số lượng</label>
                            <input type="number" className="col form-control" id="so-luong" value={soLuong} onChange={e => tinhTongTien(e)} />
                            <div className="row" style={{ marginTop: '2%' }}>
                                <h5>THÀNH TIỀN: <h5 style={{ color: 'red' }}>{tongTien} đ</h5></h5>
                                <input type='button' value='LƯU' className='btn btn-success' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={luu} />
                            </div>
                        </div>
                    </Modal.Body>}
            </Modal>
        </div>
    )
}