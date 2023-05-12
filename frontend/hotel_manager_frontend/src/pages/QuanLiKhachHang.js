import React, { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function QuanLiKhachHang() {

    const [maKH, setMaKH] = useState(0)
    const [tenKH, setTenKH] = useState('')
    const [gioiTinh, setGioiTinh] = useState('Nam')
    const [diaChi, setDiaChi] = useState('')
    const [soCMND, setSoCMND] = useState('')
    const [sDT, setSDT] = useState('')
    const [taiLai, setTaiLai] = useState(true)
    const [dsKH, setDSKH] = useState([])
    const [hienModalKH, setHienModalKH] = useState(false)

    const khoiPhucMacDinh = () => {
        setMaKH(0)
        setTenKH('')
        setGioiTinh('Nam')
        setDiaChi('')
        setSoCMND('')
        setSDT('')
    }

    const capNhat = (kh) => {
        setMaKH(kh.maKH)
        setTenKH(kh.tenKH)
        setGioiTinh(kh.gioiTinh)
        setDiaChi(kh.diaChi)
        setSoCMND(kh.soCMND)
        setSDT(kh.sDT)
        moModalKH()
    }

    const xoa = async (kh) => {
        if (!(window.confirm('Bạn có chắc muốn xoá?')))
            return false
        try {
            await axios.delete('http://localhost:8080/customers/' + kh.maKH)
            setTaiLai(true)
        } catch (error) {
            console.log(error.message);
        }
    }

    const dongModalKH = () => {
        khoiPhucMacDinh()
        setHienModalKH(false)
    }

    const moModalKH = () => setHienModalKH(true)

    const ktdiachi = () => {
        var dia_chi = document.getElementById("dia_chi").value;
        if (dia_chi == '') {
            document.getElementById("loidia_chi").innerHTML = "Địa chỉ không được để trống";
            return false;
        }
        else {
            document.getElementById('loidia_chi').innerHTML = '*';
            return true;
        }
    }

    const kTsdt = () => {
        var sdt = document.getElementById("sdt").value;
        var regsdt = /^[0-9]{10}$/;
        if (regsdt.test(sdt) && parseInt(sdt) > 0) {
            document.getElementById("loisdt").innerHTML = "*";
            return true;
        }
        else {
            if (sdt == "") {
                document.getElementById("loisdt").innerHTML = "Bạn chưa số điện thoại vui lòng nhập!";
                return false;
            }
        }
        document.getElementById("loisdt").innerHTML = "Số điện thoại phải đủ 10 số!";
        return false;
    }

    const kTso_cmnd = () => {
        var so_cmnd = document.getElementById("so_cmnd").value;
        var regsocmnd = /^[0-9]{9,12}$/;
        if (regsocmnd.test(so_cmnd) && parseInt(so_cmnd) > 0) {
            document.getElementById("loiso_cmnd").innerHTML = "*";
            return true;
        }
        else {
            if (so_cmnd == "") {
                document.getElementById("loiso_cmnd").innerHTML = "Bạn chưa nhập số CMND!";
                return false;
            }
        }
        document.getElementById("loiso_cmnd").innerHTML = "Chứng minh nhân dân phải 9 hoặc 12 số!";
        return false;
    }

    const kttenkhachhang = () => {
        var ten_kh = document.getElementById("ten_kh").value;
        if (ten_kh == '') {
            document.getElementById("loiten_kh").innerHTML = "Tên khách hàng không được để trống";
            return false;
        }
        document.getElementById('loiten_kh').innerHTML = '*';
        return true;
    }

    const luu = async () => {
        if (ktdiachi() && kttenkhachhang() && kTsdt() && kTso_cmnd()) {
            try {
                let res1 = await axios.post('http://localhost:8080/tai_khoan', {
                    maTK: maKH, 
                    tenDangNhap: sDT,
                    matKhau: '12345678'
                })
                let taiKhoan = res1.data
                if (maKH != taiKhoan.maTK)
                    await axios.post('http://localhost:8080/customers', {
                        taiKhoan: {
                            maTK: taiKhoan.maTK
                        },
                        tenKH: tenKH,
                        gioiTinh: gioiTinh,
                        diaChi: diaChi,
                        soCMND: soCMND,
                        sDT: sDT
                    })
                else
                    await axios.post('http://localhost:8080/customers', {
                        maKH: maKH,
                        tenKH: tenKH,
                        gioiTinh: gioiTinh,
                        diaChi: diaChi,
                        soCMND: soCMND,
                        sDT: sDT,
                        taiKhoan: {
                            maTK: taiKhoan.maTK
                        },
                    })
                dongModalKH()
                setTaiLai(true)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {

        async function layDuLieu() {
            try {
                let res = await axios.get('http://localhost:8080/customers')
                setDSKH(res.data)
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
                <input type="button" className='btn btn-primary col-2' value='THÊM KHÁCH HÀNG' onClick={moModalKH} />

                <Modal show={hienModalKH} onHide={dongModalKH} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>KHÁCH HÀNG</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="row">
                                <label htmlFor='ten_kh' className="form-label col-4">Nhập tên khách hàng</label>
                                <input type='text' className="form-control col" id='ten_kh' placeholder="Nhập tên khách hàng" value={tenKH} onChange={event => setTenKH(event.target.value)} onBlur={e => { kttenkhachhang() }} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loiten_kh'>*</p>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='gioi_tinh' className="form-label col-4">Chọn giới tính</label>
                                <select className="form-select col" id='gioi_tinh' value={gioiTinh} onChange={event => setGioiTinh(event.target.value)}>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='dia_chi' className="form-label col-4">Nhập địa chỉ</label>
                                <input type='text' className="form-control col" placeholder='Nhập địa chỉ' id='dia_chi' value={diaChi} onChange={event => setDiaChi(event.target.value)} onBlur={e => { ktdiachi() }} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loidia_chi'>*</p>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='so_cmnd' className="form-label col-4">Nhập số CMND/CCCD</label>
                                <input type='number' className="form-control col" placeholder='Nhập số CMND/CCCD' id='so_cmnd' value={soCMND} onChange={event => setSoCMND(event.target.value)} onBlur={e => { kTso_cmnd() }} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loiso_cmnd'>*</p>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='sdt' className="form-label col-4">Nhập số điện thoại</label>
                                <input type='number' className="form-control col" id='sdt' placeholder="Nhập số điện thoại" value={sDT} onChange={event => setSDT(event.target.value)} onBlur={e => kTsdt()} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loisdt'>*</p>
                            </div>
                            <input type='button' value='LƯU' className='btn btn-primary' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={luu} />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' className="btn btn-danger" onClick={dongModalKH}>
                            Đóng
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <table className="table table-hover">
                    <thead className="table-info">
                        <tr>
                            <th>Mã khách hàng</th>
                            <th>Tên khách hàng</th>
                            <th>Địa chỉ</th>
                            <th>Số CMND/CCCD</th>
                            <th>Số điện thoại</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsKH.map((kh) =>
                            <tr key={kh.maKH}>
                                <td>{kh.maKH}</td>
                                <td>{kh.tenKH}</td>
                                <td>{kh.diaChi}</td>
                                <td>{kh.soCMND}</td>
                                <td>{kh.sDT}</td>
                                <td>
                                    <input type="button" className="btn btn-warning" value="CẬP NHẬT" onClick={e => capNhat(kh)} /> | &nbsp;
                                    <input type="button" className="btn btn-danger" value="XOÁ" onClick={e => xoa(kh)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}