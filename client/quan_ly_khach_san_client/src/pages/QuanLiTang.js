import React, { useState, useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import { GoSearch } from 'react-icons/go'
import { FiRefreshCw } from 'react-icons/fi'
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function QuanLiTang() {

    const [maTang, setMaTang] = useState(0)
    const [tenTang, setTenTang] = useState('')
    const [taiLai, setTaiLai] = useState(true)
    const [dsTang, setDSTang] = useState([])
    const [hienModalTang, setHienModalTang] = useState(false)

    const tim = () => {
        setDSTang([])
        axios.get('http://localhost:8080/floor/' + maTang)
            .then((res) => {
                let tang = res.data
                if (tang != '')
                    setDSTang(tangCu => [...tangCu, tang])
                else
                    alert('Không tìm thấy!')
            })
    }

    const khoiPhucMacDinh = () => {
        setMaTang(0)
        setTenTang('')
    }

    const capNhat = (tang) => {
        setMaTang(tang.maTang)
        setTenTang(tang.tenTang)
        moModalTang()
    }

    const xoa = async (tang) => {
        if (!(window.confirm('Bạn có chắc muốn xoá?')))
            return false
        try {
            await axios.delete('http://localhost:8080/floor/' + tang.maTang)
            setTaiLai(true)
        } catch (error) {
            console.log(error.message);
        }
    }

    const dongModalTang = () => {
        khoiPhucMacDinh()
        setHienModalTang(false)
    }

    const moModalTang = () => setHienModalTang(true)

    const luu = async () => {
        try {
            await axios.post('http://localhost:8080/floor', {
                maTang: maTang,
                tenTang: tenTang
            })
            dongModalTang()
            setTaiLai(true)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {

        async function layDuLieu() {
            try {
                var res = await axios.get('http://localhost:8080/floor')
                setDSTang(res.data)
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
                <input type="button" className='btn btn-primary col-2' value='THÊM TẦNG' onClick={moModalTang} />
                <Modal show={hienModalTang} onHide={dongModalTang} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>TẦNG</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="row">
                                <label htmlFor='ten_tang' className="form-label col-4">Nhập tên tầng</label>
                                <input type='text' className="form-control col" placeholder='Nhập tên tầng' id='ten_tang' value={tenTang} onChange={event => setTenTang(event.target.value)} />
                            </div>
                            <input type='button' value='LƯU' className='btn btn-primary' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={luu} />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' className="btn btn-danger" onClick={dongModalTang}>
                            Đóng
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <div className="col input-group">
                    <span className="input-group-text">Nhập mã</span>
                    <input type='text' className="form-control" placeholder="Nhập mã" onChange={e => setMaTang(e.target.value)} />
                    <button className="btn btn-success" type="button" onClick={tim}><GoSearch /></button>
                    <button className="btn btn-warning" type="button" onClick={e => setTaiLai(true)}><FiRefreshCw /></button>
                </div>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <table className="table table-hover">
                    <thead className="table-info">
                        <tr>
                            <th>Mã tầng</th>
                            <th>Tên tầng</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dsTang.length > 0 && dsTang.map((tang) =>
                                <tr key={tang.maTang}>
                                    <td>{tang.maTang}</td>
                                    <td>{tang.tenTang}</td>
                                    <td>
                                        <input type="button" className="btn btn-warning" value="CẬP NHẬT" onClick={e => capNhat(tang)} /> | &nbsp;
                                        <input type="button" className="btn btn-danger" value="XOÁ" onClick={e => xoa(tang)} />
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}