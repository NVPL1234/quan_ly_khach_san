import React, { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function QuanLiDichVu() {

    const [maDV, setMaDV] = useState(0)
    const [tenDV, setTenDV] = useState('')
    const [giaDV, setGiaDV] = useState(0)
    const [donVi, setDonVi] = useState('')
    const [soLuong, setSoLuong] = useState(0)
    const [maLoaiDV, setMaLoaiDV] = useState(0)
    const [taiLai, setTaiLai] = useState(true)
    const [dsDV, setDSDV] = useState([])
    const [hienModalDV, setHienModalDV] = useState(false)
    const [dsLoaiDV, setDSLoaiDV] = useState([])

    const khoiPhucMacDinh = () => {
        setMaDV(0)
        setTenDV('')
        setGiaDV(0)
        setDonVi('')
        setSoLuong(0)
    }

    const capNhat = (dv) => {
        setMaDV(dv.maDV)
        setTenDV(dv.tenDV)
        setGiaDV(dv.giaDV)
        setDonVi(dv.donVi)
        setSoLuong(dv.soLuong)
        setMaLoaiDV(dv.loaiDichVu.maLoaiDV)
        moModalDV()
    }

    const xoa = async (dv) => {
        if (!(window.confirm('Bạn có chắc muốn xoá?')))
            return false
        try {
            await axios.delete('http://localhost:8080/services/' + dv.maDV)
            setTaiLai(true)
        } catch (error) {
            console.log(error.message);
        }
    }

    const dongModalDV = () => {
        khoiPhucMacDinh()
        setHienModalDV(false)
    }

    const moModalDV = () => {
        setHienModalDV(true)
    }

    const kTGiaDV = () => {
        var gia_dv = document.getElementById("gia_dv").value;
        var regGiadv = /^[0-9]{1,}$/;
        if (regGiadv.test(gia_dv) && parseInt(gia_dv) > 0) {
            document.getElementById("loigia_dv").innerHTML = "*";
            return true;
        }
        else {
            if (gia_dv == "") {
                document.getElementById("loigia_dv").innerHTML = "Bạn chưa nhập giá dịch vụ!";
                return false;
            }
            document.getElementById("loigia_dv").innerHTML = "Giá dịch vụ là số lớn hơn 0!";
            return false;
        }
    }

    const ktSoLuong = () => {
        var so_luong = document.getElementById("so_luong").value;
        var regsoLuong = /[0-9]{1,2}/;
        if (regsoLuong.test(so_luong) && parseInt(so_luong) > 0) {
            document.getElementById("loiso_luong").innerHTML = "*";
            return true;
        }
        else {
            if (so_luong == "") {
                document.getElementById("loiso_luong").innerHTML = "Bạn chưa nhập số lượng dịch vụ!";
                return false;
            }
            document.getElementById("loiso_luong").innerHTML = "Số lượng dịch vụ là số lớn hơn 0!";
            return false;
        }
    }

    const kttendichvu = () => {
        var ten_dich_vu = document.getElementById("ten_dv").value;
        if (ten_dich_vu == '') {
            document.getElementById("loiten_dich_vu").innerHTML = "Tên dịch vụ không được để trống";
            return false;
        }
        document.getElementById('loiten_dich_vu').innerHTML = '*';
        return true;
    }

    const luu = async () => {
        if (kTGiaDV() && ktSoLuong() && kttendichvu()) {
            try {
                await axios.post('http://localhost:8080/services', {
                    maDV: maDV,
                    tenDV: tenDV,
                    giaDV: giaDV,
                    donVi: donVi,
                    soLuong: soLuong,
                    loaiDichVu: { 'maLoaiDV': maLoaiDV }
                })
                dongModalDV()
                setTaiLai(true)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {

        async function layDuLieu() {
            try {
                let res = await axios.get('http://localhost:8080/services')
                setDSDV(res.data)
                let res2 = await axios.get('http://localhost:8080/service_categories')
                setDSLoaiDV(res2.data)
                setMaLoaiDV(res2.data[0].maLoaiDV)
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
                <input type="button" className='btn btn-primary col-2' value='THÊM DỊCH VỤ' onClick={moModalDV}/>

                <Modal show={hienModalDV} onHide={dongModalDV} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>DỊCH VỤ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form>
                                <div className="row" style={{ marginTop: '2%' }}>
                                    <label htmlFor='ten_dv' className="form-label col-2">Nhập tên dịch vụ</label>
                                    <input type='text' placeholder="Nhập tên dịch vụ" className="form-control col" id='ten_dv' value={tenDV} onChange={event => setTenDV(event.target.value)} onBlur={e => kttendichvu()} />
                                </div>
                                <div className="row" style={{ marginTop: '1%' }}>
                                    <p style={{ color: 'red' }} id='loiten_dich_vu'>*</p>
                                </div>
                                <div className="row" style={{ marginTop: '2%' }}>
                                    <label htmlFor='gia_dv' className="form-label col-2">Nhập giá dịch vụ</label>
                                    <input type='number' className="form-control col" placeholder='Nhập giá dịch vụ' id='gia_dv' value={giaDV} onChange={event => setGiaDV(event.target.value)} onBlur={e => kTGiaDV()} />
                                </div>
                                <div className="row" style={{ marginTop: '1%' }}>
                                    <p style={{ color: 'red' }} id='loigia_dv'>*</p>
                                </div>
                                <div className="row" style={{ marginTop: '2%' }}>
                                    <label htmlFor='don_vi' className="form-label col-2">Nhập đơn vị</label>
                                    <input type='text' placeholder="Nhập đơn vị" className="form-control col" id='don_vi' value={donVi} onChange={event => setDonVi(event.target.value)} />
                                </div>
                                <div className="row" style={{ marginTop: '2%' }}>
                                    <label htmlFor='so_luong' className="form-label col-2">Nhập số lượng</label>
                                    <input type='number' className="form-control col" placeholder='Nhập số lượng' id='so_luong' value={soLuong} onChange={event => setSoLuong(event.target.value)} onBlur={e => ktSoLuong()} />
                                </div>
                                <div className="row" style={{ marginTop: '1%' }}>
                                    <p style={{ color: 'red' }} id='loiso_luong'>*</p>
                                </div>
                                <div className="row" style={{ marginTop: '2%' }}>
                                    <label htmlFor='loai_dich_vu' className="form-label col-2">Chọn loại dịch vụ</label>
                                    <select className="form-select col" value={maLoaiDV} onChange={event => setMaLoaiDV(event.target.value)}>
                                        {dsLoaiDV.map((loaiDV) => 
                                            <option key={loaiDV.maLoaiDV} value={loaiDV.maLoaiDV}>{loaiDV.ten}</option>
                                        )}
                                    </select>
                                </div>
                                <input type='button' value='LƯU' className='btn btn-primary' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={luu} />
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' className="btn btn-danger" onClick={dongModalDV}>
                            Đóng
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <table className="table table-hover">
                    <thead className="table-info">
                        <tr>
                            <th>Mã dịch vụ</th>
                            <th>Tên dịch vụ</th>
                            <th>Giá dịch vụ</th>
                            <th>Đơn vị</th>
                            <th>Số lượng</th>
                            <th>Loại dịch vụ</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsDV.map((dv) =>
                            <tr key={dv.maDV}>
                                <td>{dv.maDV}</td>
                                <td>{dv.tenDV}</td>
                                <td>{dv.giaDV}</td>
                                <td>{dv.donVi}</td>
                                <td>{dv.soLuong}</td>
                                <td>{dv.loaiDichVu.ten}</td>
                                <td>
                                    <input type="button" className="btn btn-warning" value="CẬP NHẬT" onClick={e => capNhat(dv)} /> | &nbsp;
                                    <input type="button" className="btn btn-danger" value="XOÁ" onClick={e => xoa(dv)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}