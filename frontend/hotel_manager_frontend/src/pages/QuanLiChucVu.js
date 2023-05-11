import React, { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function QuanLiChucVu() {

    const [maCV, setMaCV] = useState(0)
    const [tenCV, setTenCV] = useState('')
    const [taiLai, setTaiLai] = useState(true)
    const [dsCV, setDSCV] = useState([])
    const [hienModalCV, setHienModalCV] = useState(false)

    const khoiPhucMacDinh = () => {
        setMaCV(0)
        setTenCV('')
    }

    const capNhat = (cv) => {
        setMaCV(cv.maCV)
        setTenCV(cv.tenCV)
        moModalCV()
    }

    const xoa = async (cv) => {
        if (!(window.confirm('Bạn có chắc muốn xoá?')))
            return false
        try {
            await axios.delete('http://localhost:8080/positions/' + cv.maCV)
            setTaiLai(true)
        } catch (error) {
            console.log(error.message);
        }
    }

    const dongModalCV = () => {
        khoiPhucMacDinh()
        setHienModalCV(false)
    }

    const moModalCV = () => {
        setHienModalCV(true)
    }

    const ktTenChucVu = () => {
        var ten_cv = document.getElementById("ten_cv").value;
        if (ten_cv == '') {
            document.getElementById("loiten_cv").innerHTML = 'Tên chức vụ không được để trống';
            return false;
        }
        document.getElementById('loiten_cv').innerHTML = '*';
        return true;
    }

    const luu = async () => {
        if (ktTenChucVu()) {
            try {
                await axios.post('http://localhost:8080/positions', {
                    maCV: maCV,
                    tenCV: tenCV
                })
                dongModalCV()
                setTaiLai(true)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {

        async function layDuLieu() {
            try {
                var res = await axios.get('http://localhost:8080/positions')
                setDSCV(res.data)
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
                <input type="button" className='btn btn-primary col-2' value='THÊM CHỨC VỤ' onClick={moModalCV} />

                <Modal show={hienModalCV} onHide={dongModalCV} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>CHỨC VỤ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form>
                                <div className="row" style={{ marginTop: '2%' }}>
                                    <label htmlFor='ten_cv' className="form-label col-2">Nhập tên chức vụ</label>
                                    <input type='text' placeholder="Nhập tên chức vụ" className="form-control col" id='ten_cv' value={tenCV} onChange={event => setTenCV(event.target.value)} onBlur={e => ktTenChucVu()} />
                                </div>
                                <div className="row" style={{ marginTop: '1%' }}>
                                    <p style={{ color: 'red' }} id='loiten_cv'>*</p>
                                </div>
                                <input type='button' value='LƯU' className='btn btn-primary' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={luu} />
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' className="btn btn-danger" onClick={dongModalCV}>
                            Đóng
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <table className="table table-hover">
                    <thead className="table-info">
                        <tr>
                            <th>Mã chức vụ</th>
                            <th>Tên chức vụ</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsCV.map((cv) =>
                            <tr key={cv.maCV}>
                                <td>{cv.maCV}</td>
                                <td>{cv.tenCV}</td>
                                <td>
                                    <input type="button" className="btn btn-warning" value="CẬP NHẬT" onClick={e => capNhat(cv)} /> | &nbsp;
                                    <input type="button" className="btn btn-danger" value="XOÁ" onClick={e => xoa(cv)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}