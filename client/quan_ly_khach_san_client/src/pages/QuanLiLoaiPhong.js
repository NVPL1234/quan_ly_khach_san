import React, { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { FcCheckmark } from 'react-icons/fc'
import { GoSearch } from 'react-icons/go'
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function QuanLiLoaiPhong() {

    const [maLoaiPhong, setMaLoaiPhong] = useState(0)
    const [ten, setTen] = useState('')
    const [taiLai, setTaiLai] = useState(true)
    const [dsLoaiPhong, setDSLoaiPhong] = useState([])
    const [hienModalLoaiPhong, setHienModalLoaiPhong] = useState(false)
    const [hienModalTBThanhCong, setHienModalTBThanhCong] = useState(false)

    const tim = () => {
        axios.get('http://localhost:8080/room_categories/' + maLoaiPhong)
            .then((res) => setDSLoaiPhong(res.data))
    }

    const moModalTBThanhCong = () => setHienModalTBThanhCong(true)

    const dongModalTBThanhCong = () => setHienModalTBThanhCong(false)

    const khoiPhucMacDinh = () => {
        setMaLoaiPhong(0)
        setTen('')
    }

    const capNhat = (loaiPhong) => {
        setMaLoaiPhong(loaiPhong.maLoaiPhong)
        setTen(loaiPhong.ten)
        moModalLoaiPhong()
    }

    const xoa = async (loaiPhong) => {
        if (!(window.confirm('Bạn có chắc muốn xoá?')))
            return false
        try {
            await axios.delete('http://localhost:8080/room_categories/' + loaiPhong.maLoaiPhong)
            setTaiLai(true)
        } catch (error) {
            console.log(error.message);
        }
    }

    const dongModalLoaiPhong = () => {
        khoiPhucMacDinh()
        setHienModalLoaiPhong(false)
    }

    const moModalLoaiPhong = () => setHienModalLoaiPhong(true)

    const luu = async () => {
        try {
            await axios.post('http://localhost:8080/room_categories', {
                maLoaiPhong: maLoaiPhong,
                ten: ten
            })
            moModalTBThanhCong()
            dongModalLoaiPhong()
            setTaiLai(true)
        } catch (error) {
            console.log(error.message);
        }

    }

    useEffect(() => {

        async function layDuLieu() {
            try {
                let res = await axios.get('http://localhost:8080/room_categories')
                setDSLoaiPhong(res.data)
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
                <input type="button" className='btn btn-primary col-2' value='THÊM LOẠI PHÒNG' onClick={moModalLoaiPhong} />
                <Modal show={hienModalLoaiPhong} onHide={dongModalLoaiPhong} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>LOẠI PHÒNG</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="row">
                                <label htmlFor='ten' className="form-label col-4">Nhập tên loại phòng</label>
                                <input type='text' className="form-control col" placeholder='Nhập tên loại phòng' id='ten' value={ten} onChange={event => setTen(event.target.value)} />
                            </div>
                            <input type='button' value='LƯU' className='btn btn-primary' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={luu} />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' className="btn btn-danger" onClick={dongModalLoaiPhong}>
                            Đóng
                        </button>
                    </Modal.Footer>
                </Modal>
                <Modal show={hienModalTBThanhCong} onHide={dongModalTBThanhCong} size="sm" style={{ marginTop: '20%' }}>
                    <Modal.Body>
                        <div className="row" style={{ marginTop: '2%' }}>
                            <FcCheckmark size={60} />
                        </div>
                        <div className="row" style={{ marginTop: '2%', textAlign: 'center', fontWeight: 'bold' }}>
                            <span>ĐÃ LƯU!</span>
                        </div>
                        <div className="row" style={{ marginTop: '2%' }}>
                            <input type="button" className="btn btn-primary" value="OK" onClick={dongModalTBThanhCong} />
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <div className="col input-group">
                    <span className="input-group-text">Nhập mã</span>
                    <input type='text' className="form-control" placeholder="Nhập mã" onChange={e => setMaLoaiPhong(e.target.value)} />
                    <button className="btn btn-success" type="button" onClick={tim}><GoSearch /></button>
                </div>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <table className="table table-hover">
                    <thead className="table-info">
                        <tr>
                            <th>Mã loại phòng</th>
                            <th>Tên loại phòng</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsLoaiPhong.map((loaiPhong) =>
                            <tr key={loaiPhong.maLoaiPhong}>
                                <td>{loaiPhong.maLoaiPhong}</td>
                                <td>{loaiPhong.ten}</td>
                                <td>
                                    <input type="button" className="btn btn-warning" value="CẬP NHẬT" onClick={e => capNhat(loaiPhong)} /> | &nbsp;
                                    <input type="button" className="btn btn-danger" value="XOÁ" onClick={e => xoa(loaiPhong)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}