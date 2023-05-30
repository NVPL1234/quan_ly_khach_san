import React, { useState, useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import { TiDeleteOutline } from 'react-icons/ti'
import { GoSearch } from 'react-icons/go'
import { FiRefreshCw } from 'react-icons/fi'
import axios from 'axios'
import DanhSachDichVu from "./DanhSachDichVu";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function DichVuDaDat(props) {

    const hd = props.hd
    const [tongTien, setTongTien] = useState(0)
    const [dsCTHDDV, setDSCTHDDV] = useState([])
    const [cthddv, setCTHDDV] = useState(null)
    const [soLuong, setSoLuong] = useState(0)
    const [hienModalCapNhat, setHienModalCapNhat] = useState(false)
    const [dsMaDV, setDSMaDV] = useState([])
    const [maLoaiDV, setMaLoaiDV] = useState(0)
    const [tenDV, setTenDV] = useState('')
    const [taiLai, setTaiLai] = useState(true)

    const dongModalCapNhat = () => setHienModalCapNhat(false);

    const moModalCapNhat = () => {
        setHienModalCapNhat(true)
    };

    const capNhat = (cthddv) => {
        setCTHDDV(cthddv)
        setSoLuong(cthddv.soLuong)
        moModalCapNhat()
    }

    const capNhatSoLuong = async () => {
        let soLuongCu = cthddv.soLuong
        let soLuongMoi = soLuong - soLuongCu
        if (soLuongMoi == 0)
            return
        else {
            try {
                let res = await axios.get('http://localhost:8080/services/maDV/' + cthddv.dichVu.maDV)
                let dichVu = res.data
                await axios.put('http://localhost:8080/service_order_details/' + hd[0].maHD + '/' + hd[1].maPhong + '/' + cthddv.dichVu.maDV + '/' + soLuong)
                soLuongMoi = dichVu.soLuong - soLuongMoi
                await axios.put('http://localhost:8080/services/' + cthddv.dichVu.maDV + '/' + soLuongMoi)
                dongModalCapNhat()
                setTaiLai(true)
                return
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const xoa = async (cthddv) => {
        if (!(window.confirm('Bạn có chắc muốn xoá?')))
            return false
        try {
            await axios.delete('http://localhost:8080/service_order_details/' + hd[0].maHD + '/' + cthddv.dichVu.maDV + '/' + hd[1].maPhong)
            await axios.put('http://localhost:8080/services/' + cthddv.dichVu.maDV + '/' + cthddv.soLuong + '/Tang')
            setTaiLai(true)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (taiLai)
            axios.get('http://localhost:8080/service_order_details/maHD/' + hd[0].maHD + '/maPhong/' + hd[1].maPhong)
                .then((res) => {
                    let dscthddv = res.data
                    setDSCTHDDV(dscthddv)
                    let tongTienTam = 0
                    for (let i = 0; i < dscthddv.length; i++)
                        tongTienTam = tongTienTam + (dscthddv[i].soLuong * dscthddv[i].donGia)
                    setTongTien(tongTienTam.toLocaleString({ style: "currency", currency: "vnd" }))
                    setTaiLai(false)
                })
                .catch((e) => console.log(e.message))
    }, [taiLai])

    return (
        <form>
            <div className="row">
                <div className="col-7" style={{ marginRight: '1%', marginTop: '1.2%' }}>
                    <h5>DỊCH VỤ ĐÃ ĐẶT</h5>
                    <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100 }}>
                        <table className="table table-hover">
                            <thead className="table-info">
                                <tr>
                                    <th>Mã dịch vụ</th>
                                    <th>Tên dịch vụ</th>
                                    <th>Giá dịch vụ</th>
                                    <th>Đơn vị</th>
                                    <th>Số lượng</th>
                                    <th>Loại dịch vụ</th>
                                    <th>Thành tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dsCTHDDV.map((cthddv, i) =>
                                    <tr key={i}>
                                        <td>{cthddv.dichVu.maDV}</td>
                                        <td>{cthddv.dichVu.tenDV}</td>
                                        <td>{cthddv.donGia.toLocaleString({ style: "currency", currency: "vnd" })}</td>
                                        <td>{cthddv.dichVu.donVi}</td>
                                        <td>{cthddv.soLuong}</td>
                                        <td>{cthddv.dichVu.loaiDichVu.ten}</td>
                                        <td>{(cthddv.soLuong * cthddv.donGia).toLocaleString({ style: "currency", currency: "vnd" })}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning" onClick={e => capNhat(cthddv)}>Sửa số lượng</button> | &nbsp;
                                            <button type="button" className="btn btn-danger" onClick={e => xoa(cthddv)}><TiDeleteOutline size={22} /></button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col">
                    <DanhSachDichVu hd={hd} setTaiLai={setTaiLai} taiLai={taiLai} />
                </div>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <h5>TỔNG TIỀN: <h5 style={{ color: 'red' }}>{tongTien.toLocaleString({ style: "currency", currency: "vnd" })} đ</h5></h5>
            </div>

            <Modal show={hienModalCapNhat} onHide={dongModalCapNhat} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>DỊCH VỤ</Modal.Title>
                </Modal.Header>
                {cthddv != null &&
                    <Modal.Body>
                        <div className="row" style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%' }}>
                            <div className="row" style={{ marginBottom: '1%' }}>
                                <span>Tên dịch vụ: <span>{cthddv.dichVu.tenDV}</span></span>
                            </div>
                            <label htmlFor="so-luong" className="col-2">Số lượng</label>
                            <input type="number" className="col form-control" id="so-luong" value={soLuong} onChange={e => setSoLuong(e.target.value)} />
                            <div className="row" style={{ marginTop: '2%' }}>
                                <button type="button" className="btn btn-success" onClick={e => capNhatSoLuong()} style={{ width: '20%', marginLeft: '40%' }}>LƯU</button>
                            </div>
                        </div>
                    </Modal.Body>}
            </Modal>
        </form>
    )
}