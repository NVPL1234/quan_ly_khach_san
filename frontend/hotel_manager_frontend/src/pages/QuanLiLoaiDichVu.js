import React, { useState, useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function QuanLiLoaiDichVu() {

    const [maLoaiDV, setMaLoaiDV] = useState(0)
    const [ten, setTen] = useState('')
    const [taiLai, setTaiLai] = useState(true)
    const [dsLoaiDV, setDSLoaiDV] = useState([])
    const [hienModalLoaiDV, setHienModalLoaiDV] = useState(false)

    const khoiPhucMacDinh = () => {
        setMaLoaiDV(0)
        setTen('')
    }

    const capNhat = (loaiDV) => {
        setMaLoaiDV(loaiDV.maLoaiDV)
        setTen(loaiDV.ten)
        moModalLoaiDV()
    }

    const xoa = async (loaiDV) => {
        if (!(window.confirm('Bạn có chắc muốn xoá?')))
            return false
        try {
            await axios.delete('http://localhost:8080/service_categories/' + loaiDV.maLoaiDV)
            setTaiLai(true)
        } catch (error) {
            console.log(error.message);
        }
    }

    const dongModalLoaiDV = () => {
        khoiPhucMacDinh()
        setHienModalLoaiDV(false)
    }

    const moModalLoaiDV = () => {
        setHienModalLoaiDV(true)
    }

    const luu = async () => {
        try {
            await axios.post('http://localhost:8080/service_categories', {
                maLoaiDV: maLoaiDV,
                ten: ten
            })
        } catch (error) {
            console.log(error.message);
        }
        dongModalLoaiDV()
        setTaiLai(true)
    }

    useEffect(() => {

        async function layDuLieu() {
            try {
                var res = await axios.get('http://localhost:8080/service_categories')
                setDSLoaiDV(res.data)
                setTaiLai(false)
            } catch (error) {
                console.log(error.message);
            }
        }

        if (taiLai == true)
            layDuLieu()
    }, [taiLai])

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <input type="button" className='btn btn-primary col-2' value='THÊM LOẠI DỊCH VỤ' onClick={moModalLoaiDV} />

                <Modal show={hienModalLoaiDV} onHide={dongModalLoaiDV} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>LOẠI DỊCH VỤ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form>
                                <div className="row" style={{ marginTop: '2%' }}>
                                    <label htmlFor='ten' className="form-label col-4">Nhập tên loại dịch vụ</label>
                                    <input type='text' placeholder="Nhập tên loại dịch vụ" className="form-control col" id='ten' value={ten} onChange={event => setTen(event.target.value)} />
                                </div>
                                <input type='button' value='LƯU' className='btn btn-primary' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={luu} />
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' className="btn btn-danger" onClick={dongModalLoaiDV}>
                            Đóng
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <table id="myTable" className="table table-hover">
                    <thead className="table-info">
                        <tr>
                            <th>Mã loại dịch vụ</th>
                            <th>Tên loại dịch vụ</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsLoaiDV.map((loaiDV) =>
                            <tr key={loaiDV.maLoaiDV}>
                                <td>{loaiDV.maLoaiDV}</td>
                                <td>{loaiDV.ten}</td>
                                <td>
                                    <input type="button" className="btn btn-warning" value="CẬP NHẬT" onClick={e => capNhat(loaiDV)} /> | &nbsp;
                                    <input type="button" className="btn btn-danger" value="XOÁ" onClick={e => xoa(loaiDV)}/>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}