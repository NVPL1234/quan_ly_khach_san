import React, { useState, useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { GoSearch } from 'react-icons/go'
import { TiDeleteOutline } from 'react-icons/ti'
import axios from 'axios'
import moment from 'moment';
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.js"

export default function FormPhieuDatDichVu() {

    const [maHD, setMaHD] = useState(0)
    const [maPhong, setMaPhong] = useState('')
    const [maLoaiDV, setMaLoaiDV] = useState('')
    const [tenDV, setTenDV] = useState('')
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    let dsDichVu
    const [dsMaDV, setDSMaDV] = useState([])

    function themDSHDVaoBang(dshd) {
        var tbody = document.getElementById('hd').getElementsByTagName('tbody')[0];
        for (let i = 0; i < dshd.length; i++) {

            var hang = tbody.insertRow();

            // var oMaHD = hang.insertCell();
            var oMaPhong = hang.insertCell();
            var oNgayNhan = hang.insertCell();
            var oNgayTra = hang.insertCell();
            var oTenKH = hang.insertCell();
            var oChucNang = hang.insertCell();

            // var maHD = document.createTextNode(dshd[i][0].maHD)
            // oMaHD.appendChild(maHD);
            var maPhong = document.createTextNode(dshd[i][1].maPhong)
            oMaPhong.appendChild(maPhong);
            var ngayNhanPhong = document.createTextNode(moment(dshd[i][0].ngayNhanPhong).format('DD-MM-YYYY HH:mm:ss'));
            oNgayNhan.appendChild(ngayNhanPhong);
            var ngayTraPhong = document.createTextNode(moment(dshd[i][0].ngayTraPhong).format('DD-MM-YYYY HH:mm:ss'));
            oNgayTra.appendChild(ngayTraPhong);
            var tenKH = document.createTextNode(dshd[i][2].tenKH);
            oTenKH.appendChild(tenKH);
            var btnDatDV = document.createElement('button')
            btnDatDV.type = 'button'
            btnDatDV.className = 'btn btn-primary'
            btnDatDV.textContent = 'ĐẶT DỊCH VỤ'
            btnDatDV.addEventListener('click', () => {
                setMaHD(dshd[i][0].maHD)
                handleShow(dshd[i][0].maHD)
            })
            oChucNang.appendChild(btnDatDV)
        }
    }

    const handleClose = () => setShow(false);

    const handleClose2 = () => setShow2(false);

    const handleShow = (maHD) => {
        async function layDuLieu() {
            try {
                let res2 = await axios.get('http://localhost:8080/service_order_details/' + maHD)
                let dsDichVuDaDat = res2.data
                themDSDichVuDaDatVaoBang(dsDichVuDaDat, maHD)
            } catch (error) {
                console.log(error.message);
            }
        }

        layDuLieu()

        setShow(true)
    };

    const handleShow2 = () => {

        handleClose()

        async function layDuLieu() {
            try {
                let loaiDVRes = await axios.get('http://localhost:8080/service_categories')
                let dsLoaiDV = loaiDVRes.data
                themDSLoaiDVVaoSelect(dsLoaiDV)

                let res1 = await axios.get('http://localhost:8080/services')
                dsDichVu = res1.data
                themDSDichVuVaoBang(dsDichVu)
            } catch (error) {
                console.log(error.message);
            }
        }

        function themDSLoaiDVVaoSelect(dsLoaiDV) {
            var select = document.getElementById("loai_dich_vu");
            for (var i = 0; i < dsLoaiDV.length; i++) {
                var option = document.createElement("option");
                option.text = dsLoaiDV[i].ten
                option.value = dsLoaiDV[i].maLoaiDV
                select.add(option);
            }
            setMaLoaiDV(dsLoaiDV[0].maLoaiDV)
        }

        layDuLieu()

        setShow2(true)
    };

    const themDSDichVuDaDatVaoBang = (dsDichVuDaDat, maHD) => {
        var tbody = document.getElementById('dv_da_dat').getElementsByTagName('tbody')[0];
        for (let i = 0; i < dsDichVuDaDat.length; i++) {

            var hang = tbody.insertRow();

            var oMaDV = hang.insertCell();
            var oTenDV = hang.insertCell();
            var oGiaDV = hang.insertCell();
            var oDonVi = hang.insertCell();
            var oSoLuong = hang.insertCell();
            var oTenLoaiDV = hang.insertCell();
            var oChucNang = hang.insertCell();

            var maDV = document.createTextNode(dsDichVuDaDat[i].dichVu.maDV);
            oMaDV.appendChild(maDV);
            var tenDV = document.createTextNode(dsDichVuDaDat[i].dichVu.tenDV);
            oTenDV.appendChild(tenDV);
            var giaDV = document.createTextNode(dsDichVuDaDat[i].dichVu.giaDV);
            oGiaDV.appendChild(giaDV);
            var donVi = document.createTextNode(dsDichVuDaDat[i].dichVu.donVi);
            oDonVi.appendChild(donVi);
            document.getElementById('thanh_tien').textContent = parseInt(document.getElementById('thanh_tien').textContent) + (dsDichVuDaDat[i].dichVu.giaDV * dsDichVuDaDat[i].soLuong) + ' đ'
            var inputSoLuong = document.createElement('input')
            inputSoLuong.setAttribute('class', 'form-control')
            inputSoLuong.id = dsDichVuDaDat[i].dichVu.maDV
            inputSoLuong.placeholder = "Nhập số lượng"
            inputSoLuong.type = 'number'
            inputSoLuong.value = dsDichVuDaDat[i].soLuong
            inputSoLuong.addEventListener('change', (e) => {
                document.getElementById('thanh_tien').textContent = 0
                var oSL = document.getElementsByClassName('o_so_luong');
                var len = oSL.length;
                for (let i = 0; i < len; i++) {
                    let soLuong = parseInt(oSL[i].children[0].value)
                    document.getElementById('thanh_tien').textContent = parseInt(document.getElementById('thanh_tien').textContent) + (dsDichVuDaDat[i].dichVu.giaDV * soLuong) + ' đ'
                }

                console.log(dsMaDV);
                setDSMaDV(dsMaDV => [...dsMaDV, dsDichVuDaDat[i].dichVu.maDV])
                console.log(dsMaDV);
            })
            oSoLuong.appendChild(inputSoLuong);
            oSoLuong.className = 'o_so_luong'
            oSoLuong.style = 'width: 15%'
            var tenLoaiDV = document.createTextNode(dsDichVuDaDat[i].dichVu.loaiDichVu.ten);
            oTenLoaiDV.appendChild(tenLoaiDV);
            var btnXoa = document.createElement('button')
            btnXoa.setAttribute('class', 'btn btn-danger')
            btnXoa.innerHTML = 'XOÁ'
            btnXoa.type = 'button'
            btnXoa.addEventListener('click', async function () {
                if (!(window.confirm('Bạn có chắc muốn xoá?')))
                    return false
                try {
                    await axios.delete('http://localhost:8080/service_order_details/' + maHD + '/' + dsDichVuDaDat[i].dichVu.maDV)
                    await axios.put('http://localhost:8080/services/' + dsDichVuDaDat[i].dichVu.maDV + '/' + dsDichVuDaDat[i].soLuong + '/Tang')
                    var tbody = document.getElementById('dv_da_dat').getElementsByTagName('tbody')[0];
                    var rowCount = tbody.rows.length;
                    for (let i = rowCount - 1; i >= 0; i--) {
                        tbody.deleteRow(i);
                    }
                    document.getElementById('thanh_tien').textContent = 0
                    handleShow(maHD)
                } catch (error) {
                    console.log(error.message);
                }
            })
            oChucNang.appendChild(btnXoa);
        }
    }

    const themDSDichVuVaoBang = (dsDichVu) => {
        var tbody = document.getElementById('dv').getElementsByTagName('tbody')[0];
        for (let i = 0; i < dsDichVu.length; i++) {

            var hang = tbody.insertRow();

            var oMaDV = hang.insertCell();
            var oTenDV = hang.insertCell();
            var oGiaDV = hang.insertCell();
            var oDonVi = hang.insertCell();
            var oSoLuong = hang.insertCell();
            var oTenLoaiDV = hang.insertCell();
            var oChon = hang.insertCell();

            var maDV = document.createTextNode(dsDichVu[i].maDV);
            oMaDV.appendChild(maDV);
            var tenDV = document.createTextNode(dsDichVu[i].tenDV);
            oTenDV.appendChild(tenDV);
            var giaDV = document.createTextNode(dsDichVu[i].giaDV);
            oGiaDV.appendChild(giaDV);
            var donVi = document.createTextNode(dsDichVu[i].donVi);
            oDonVi.appendChild(donVi);
            var inputSoLuong = document.createElement('input')
            inputSoLuong.setAttribute('class', 'form-control')
            inputSoLuong.placeholder = "Nhập số lượng"
            inputSoLuong.type = 'number'
            inputSoLuong.value = dsDichVu[i].soLuong
            inputSoLuong.setAttribute('id', 'i_so_luong ' + i)
            oSoLuong.appendChild(inputSoLuong);
            oSoLuong.id = 'o_so_luong' + i
            var tenLoaiDV = document.createTextNode(dsDichVu[i].loaiDichVu.ten);
            oTenLoaiDV.appendChild(tenLoaiDV);
            var input = document.createElement('input')
            input.type = 'checkbox'
            input.setAttribute('class', 'form-check-input')
            input.value = dsDichVu[i].maDV
            input.addEventListener('change', function () {
                let soLuong = document.getElementById('o_so_luong' + i).children[0].value
                if (this.checked) {
                    document.getElementById('thanh_tien2').textContent = parseInt(document.getElementById('thanh_tien2').textContent) + (dsDichVu[i].giaDV * soLuong) + ' đ'
                }
                else {
                    document.getElementById('thanh_tien2').textContent = parseInt(document.getElementById('thanh_tien2').textContent) - (dsDichVu[i].giaDV * soLuong) + ' đ'
                }
            })
            oChon.appendChild(input);
        }
    }

    const timDVTheoLoai = async () => {
        let tbody = document.getElementById('dv').getElementsByTagName('tbody')[0];
        var rowCount = tbody.rows.length;
        for (var i = rowCount - 1; i >= 0; i--) {
            tbody.deleteRow(i);
        }
        document.getElementById('thanh_tien2').textContent = '0 đ'
        if (maLoaiDV != '') {
            var res = await axios.get('http://localhost:8080/services/maLoaiDV/' + maLoaiDV)
            dsDichVu = res.data
            themDSDichVuVaoBang(dsDichVu)
        }
        else {

        }
    }

    const timDVTheoTen = async () => {
        let tbody = document.getElementById('dv').getElementsByTagName('tbody')[0];
        var rowCount = tbody.rows.length;
        for (var i = rowCount - 1; i >= 0; i--) {
            tbody.deleteRow(i);
        }
        document.getElementById('thanh_tien2').textContent = '0 đ'
        if (tenDV != '') {
            var res = await axios.get('http://localhost:8080/services/tenDV/' + tenDV)
            dsDichVu = res.data
            themDSDichVuVaoBang(dsDichVu)
        }
        else {

        }
    }

    const timPhong = async () => {
        var tbody = document.getElementById('hd').getElementsByTagName('tbody')[0];
        var rowCount = tbody.rows.length;
        for (var i = rowCount - 1; i >= 0; i--) {
            tbody.deleteRow(i);
        }
        try {
            var res = await axios.get('http://localhost:8080/rooms/maPhong/' + maPhong + '/trangThai/Đã nhận')
            var dshd = res.data
            themDSHDVaoBang(dshd)
        } catch (error) {
            console.log(error.message);
        }
    }

    const luuHDDV = async () => {
        var cboxes = document.getElementsByClassName('form-check-input');
        var len = cboxes.length;
        for (var i = 0; i < len; i++) {
            if (cboxes[i].checked) {
                let maDV = cboxes[i].value
                let soLuong = document.getElementById('o_so_luong' + i).children[0].value
                try {
                    let res1 = await axios.get('http://localhost:8080/services/maDV/' + maDV)
                    let dv = res1.data
                    await axios.put('http://localhost:8080/services/' + maDV + '/' + soLuong + '/Giam')
                    const res2 = await axios.post('http://localhost:8080/service_order_details', {
                        hoaDon: { 'maHD': maHD },
                        dichVu: { 'maDV': maDV },
                        soLuong: soLuong,
                        donGia: dv.giaDV
                    })
                    console.log(res2.data)
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
        handleClose2()
        handleShow(maHD)
    }

    const unique = (arr) => {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) === -1) {
                newArr.push(arr[i])
            }
        }
        return newArr
    }

    const capNhatHDDV = async () => {
        let dsMaDVMoi = unique(dsMaDV)

        for (let i = 0; i < dsMaDVMoi.length; i++) {
            let soLuong = parseInt(document.getElementById(dsMaDVMoi[i]).value)
            console.log('madv ' + dsMaDV[i]);
            console.log('sl ' + soLuong);

            try {
                let res = await axios.get('http://localhost:8080/service_order_details/' + maHD + '/' + dsMaDVMoi[i])
                let cthddv = res.data
                await axios.put('http://localhost:8080/service_order_details/' + maHD + '/' + dsMaDVMoi[i] + '/' + soLuong)
                let soLuongCu = cthddv.soLuong
                soLuong = soLuong - soLuongCu
                await axios.put('http://localhost:8080/services/' + dsMaDVMoi[i] + '/' + soLuong)
            } catch (error) {
                console.log(error.message);
            }
        }

        var tbody = document.getElementById('dv_da_dat').getElementsByTagName('tbody')[0];
        var rowCount = tbody.rows.length;
        for (let i = rowCount - 1; i >= 0; i--) {
            tbody.deleteRow(i);
        }
        document.getElementById('thanh_tien').textContent = 0
        setDSMaDV([])
        handleShow(maHD)
    }

    useEffect(() => {

        async function layDuLieu() {
            try {
                var res = await axios.get('http://localhost:8080/rooms/maPhong/-1/trangThai/Đã nhận')
                let dshd = res.data
                themDSHDVaoBang(dshd)
            } catch (error) {
                console.log(error.message);
            }
        }

        layDuLieu()
    }, [])

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
            <div className="row" style={{ marginTop: '1%' }}>
                <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100 }}>
                    <table id="hd" className="table table-hover">
                        <thead className="table-info">
                            <tr>
                                {/* <th>Mã hoá đơn</th> */}
                                <th>Mã phòng</th>
                                <th>Ngày nhận phòng</th>
                                <th>Ngày trả phòng</th>
                                <th>Tên khách hàng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>

                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>DỊCH VỤ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <button type="button" className="btn btn-primary" onClick={handleShow2}>THÊM DỊCH VỤ</button>
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <div className="col">
                                    <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100 }}>
                                        <table id="dv_da_dat" className="table table-hover">
                                            <thead className="table-info">
                                                <tr>
                                                    <th>Mã dịch vụ</th>
                                                    <th>Tên dịch vụ</th>
                                                    <th>Giá dịch vụ</th>
                                                    <th>Đơn vị</th>
                                                    <th>Số lượng</th>
                                                    <th>Loại dịch vụ</th>
                                                    <th>Chọn</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <h5>THÀNH TIỀN: <h5 id='thanh_tien' style={{ color: 'red' }}>0 đ</h5></h5>
                                <input type='button' value='CẬP NHẬT' className='btn btn-success' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={capNhatHDDV} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={show2} onHide={handleClose2} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>DỊCH VỤ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <div className="col input-group">
                                            <select id='loai_dich_vu' className="form-select" value={maLoaiDV} onChange={e => setMaLoaiDV(e.target.value)}>
                                            </select>
                                            <button class="btn btn-success" type="button" onClick={timDVTheoLoai}><GoSearch /></button>
                                        </div>
                                        <div className="col input-group">
                                            <input type='text' id='ten_dv' className="form-control" placeholder="Nhập tên dịch vụ" value={tenDV} onChange={e => setTenDV(e.target.value)} />
                                            <button class="btn btn-success" type="button" onClick={timDVTheoTen}><GoSearch /></button>
                                        </div>
                                    </div>
                                    <div className="row table-responsive" style={{ marginTop: '2%', borderRadius: 30, borderWidth: 100 }}>
                                        <table id="dv" className="table table-hover">
                                            <thead className="table-info">
                                                <tr>
                                                    <th>Mã dịch vụ</th>
                                                    <th>Tên dịch vụ</th>
                                                    <th>Giá dịch vụ</th>
                                                    <th>Đơn vị</th>
                                                    <th>Số lượng</th>
                                                    <th>Loại dịch vụ</th>
                                                    <th>Chọn</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <h5>THÀNH TIỀN: <h5 id='thanh_tien2' style={{ color: 'red' }}>0 đ</h5></h5>
                                <input type='button' value='THÊM' className='btn btn-primary' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={luuHDDV} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose2}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}