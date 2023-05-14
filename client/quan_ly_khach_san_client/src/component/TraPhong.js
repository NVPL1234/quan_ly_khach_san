import React, { useState, useRef, useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import { GoSearch } from 'react-icons/go'
import {FcPrint} from 'react-icons/fc'
import { useReactToPrint } from 'react-to-print'
import axios from 'axios'
import moment from 'moment';
import { HoaDon } from "./HoaDon";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function TraPhong() {

    const componentRef = useRef()
    const [maHD, setMaHD] = useState(0)
    const [ngayLapHD, setNgayLapHD] = useState('')
    const [ngayNhanPhong, setNgayNhanPhong] = useState('')
    const [ngayTraPhong, setNgayTraPhong] = useState('')
    const [loaiThue, setLoaiThue] = useState('')
    const [tienCoc, setTienCoc] = useState(0)
    const [maHang, setMaHang] = useState(0)
    const [maNV, setMaNV] = useState(1)
    const [maKH, setMaKH] = useState(0)
    const [tenKH, setTenKH] = useState(0)
    const [soCMND, setSoCMND] = useState('')
    const [sDT, setSDT] = useState('')
    const [hienModalCTHD, setHienModalCTHD] = useState(false)
    const [hienModalXacNhanIn, setHienModalXacNhanIn] = useState(false)
    const [tienThua, setTienThua] = useState(0)
    const [maDV, setMaDV] = useState([])
    const [dscthdp, setDSCTHDP] = useState([])
    const [dscthddv, setDSCTHDDV] = useState([])

    const timKHTheoCCCD = async () => {
        let tbody = document.getElementById('hoa_don_3').getElementsByTagName('tbody')[0];
        var rowCount = tbody.rows.length;
        for (var i = rowCount - 1; i >= 0; i--) {
            tbody.deleteRow(i);
        }

        let res1 = await axios.get('http://localhost:8080/customers/cccd/' + soCMND)
        let maKH = res1.data.maKH

        var res2 = await axios.get('http://localhost:8080/orders/' + maKH + '/Đã nhận')
        let dshd = res2.data

        themDSHDVaoBang(dshd)
    }


    const timKHTheoSDT = async () => {

        let tbody = document.getElementById('hoa_don_3').getElementsByTagName('tbody')[0];
        var rowCount = tbody.rows.length;
        for (var i = rowCount - 1; i >= 0; i--) {
            tbody.deleteRow(i);
        }

        let res1 = await axios.get('http://localhost:8080/customers/sdt/' + sDT)
        let maKH = res1.data.maKH

        var res2 = await axios.get('http://localhost:8080/orders/' + maKH + '/Đã nhận')
        let dshd = res2.data

        themDSHDVaoBang(dshd)
    }

    const themDSHDVaoBang = (dshd) => {

        var tbody = document.getElementById('hoa_don_3').getElementsByTagName('tbody')[0];
        for (let i = 0; i < dshd.length; i++) {
            var hang = tbody.insertRow();

            // var oMaHD = hang.insertCell();
            // var oNgayLapHD = hang.insertCell();
            var oNgayNhanPhong = hang.insertCell();
            var oNgayTraPhong = hang.insertCell();
            var oTenKhachHang = hang.insertCell();
            var oChon = hang.insertCell();

            // var maHD = document.createTextNode(dshd[i].maHD);
            // oMaHD.appendChild(maHD);
            // var ngayLapHD = document.createTextNode(moment(dshd[i].ngayLapHD).format('DD-MM-YYYY HH:mm:ss'));
            // oNgayLapHD.appendChild(ngayLapHD);
            var ngayNhanPhong = document.createTextNode(moment(dshd[i].ngayNhanPhong).format('DD-MM-YYYY HH:mm:ss'));
            oNgayNhanPhong.appendChild(ngayNhanPhong);
            var ngayTraPhong = document.createTextNode(moment(dshd[i].ngayTraPhong).format('DD-MM-YYYY HH:mm:ss'));
            oNgayTraPhong.appendChild(ngayTraPhong);
            var tenKH = document.createTextNode(dshd[i].khachHang.tenKH);
            oTenKhachHang.appendChild(tenKH);
            var button = document.createElement('button')
            button.setAttribute('class', 'btn btn-primary')
            button.type = 'button'
            button.value = dshd[i].maHD
            button.textContent = 'XEM CHI TIẾT'
            button.addEventListener('click', function () {
                let maHD = parseInt(this.value)
                setMaHD(maHD)
                setTienCoc(dshd[i].tienCoc)
                moModalCTHD(maHD)
            })
            oChon.appendChild(button);
        }
    }

    const themDSPhongDaNhanVaoBang = (dscthdp) => {

        var tbody = document.getElementById('phong_da_nhan').getElementsByTagName('tbody')[0];
        var rowCount = tbody.rows.length;
        for (var i = rowCount - 1; i >= 0; i--) {
            tbody.deleteRow(i);
        }

        for (let i = 0; i < dscthdp.length; i++) {
            var hang = tbody.insertRow();

            var oMaPhong = hang.insertCell();
            oMaPhong.className = 'o_ma_phong'

            var maPhong = document.createTextNode(dscthdp[i].phong.maPhong);
            oMaPhong.appendChild(maPhong);
            if (dscthdp[i].hoaDon.loaiThue == 'Thuê theo giờ') {
                var oGioDau = hang.insertCell();
                var oGiaGioDau = hang.insertCell();
                var oGiaGioTiepTheo = hang.insertCell();
                var oTongGioThue = hang.insertCell();
                var oThanhTien = hang.insertCell();
                oThanhTien.className = 'o_thanh_tien'
                var tgioDau = document.createTextNode(dscthdp[i].phong.gioDau);
                oGioDau.appendChild(tgioDau);
                var giaGioDau = document.createTextNode(dscthdp[i].phong.giaGioDau);
                oGiaGioDau.appendChild(giaGioDau);
                var giaGioTiepTheo = document.createTextNode(dscthdp[i].phong.giaGioTiepTheo);
                oGiaGioTiepTheo.appendChild(giaGioTiepTheo);
                let soGioThue = moment(ngayTraPhong).diff(ngayNhanPhong, 'hours')
                var tongGioThue = document.createTextNode(soGioThue);
                oTongGioThue.appendChild(tongGioThue);
                let gioDau = dscthdp[i].phong.gioDau
                let gioTiepTheo = soGioThue - gioDau
                if (soGioThue > gioDau) {
                    let thanhTienGioDau = dscthdp[i].phong.giaGioDau
                    let thanhTienGioTiepTheo = gioTiepTheo * dscthdp[i].phong.giaGioTiepTheo
                    var thanhTien = document.createTextNode(thanhTienGioDau + thanhTienGioTiepTheo);
                    oThanhTien.appendChild(thanhTien);
                }
                else {
                    var thanhTien = document.createTextNode(soGioThue * dscthdp[i].phong.giaGioDau);
                    oThanhTien.appendChild(thanhTien);
                }
            }
            else if (dscthdp[i].hoaDon.loaiThue == 'Thuê theo ngày') {
                var oGiaTheoNgay = hang.insertCell();
                var oTongNgayThue = hang.insertCell();
                var oThanhTien = hang.insertCell();
                oThanhTien.className = 'o_thanh_tien'
                var giaTheoNgay = document.createTextNode(dscthdp[i].phong.giaTheoNgay);
                oGiaTheoNgay.appendChild(giaTheoNgay);
                let soNgayThue = moment(ngayTraPhong).diff(ngayNhanPhong, 'days')
                var tongNgayThue = document.createTextNode(soNgayThue);
                oTongNgayThue.appendChild(tongNgayThue);
                var thanhTien = document.createTextNode(soNgayThue * dscthdp[i].phong.giaTheoNgay);
                oThanhTien.appendChild(thanhTien);
            }
            else if (dscthdp[i].hoaDon.loaiThue == 'Thuê qua đêm') {
                var oGiaQuaDem = hang.insertCell();
                var oTongDemThue = hang.insertCell();
                var oThanhTien = hang.insertCell();
                oThanhTien.className = 'o_thanh_tien'
                var giaQuaDem = document.createTextNode(dscthdp[i].phong.giaQuaDem);
                oGiaQuaDem.appendChild(giaQuaDem);
                var tongDemThue = document.createTextNode(1);
                oTongDemThue.appendChild(tongDemThue);
                var thanhTien = document.createTextNode(dscthdp[i].phong.giaQuaDem);
                oThanhTien.appendChild(thanhTien);
            }
        }

        var ttPhongVaDV = document.getElementsByClassName('o_thanh_tien');
        var len = ttPhongVaDV.length;
        let tongThanhTien = 0
        for (var i = 0; i < len; i++) {
            tongThanhTien = tongThanhTien + parseFloat(ttPhongVaDV[i].textContent)
        }
        document.getElementById('thanh_tien3').innerHTML = tongThanhTien - tienCoc + ' đ'
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

    const themDSDVDaNhanVaoBang = (dscthddv) => {

        var tbody = document.getElementById('dv_da_nhan').getElementsByTagName('tbody')[0];
        var rowCount = tbody.rows.length;
        for (var i = rowCount - 1; i >= 0; i--) {
            tbody.deleteRow(i);
        }
        for (let i = 0; i < dscthddv.length; i++) {
            var hang = tbody.insertRow();

            var oTenDV = hang.insertCell();
            var oGiaDV = hang.insertCell();
            var oDonVi = hang.insertCell();
            var oSoLuong = hang.insertCell();
            oSoLuong.className = 'o_so_luong'
            var oThanhTien = hang.insertCell();
            oThanhTien.className = 'o_thanh_tien'
            oThanhTien.id = 'o_thanh_tien ' + i

            var tenDV = document.createTextNode(dscthddv[i].dichVu.tenDV);
            oTenDV.appendChild(tenDV);
            var giaDV = document.createTextNode(dscthddv[i].dichVu.giaDV);
            oGiaDV.appendChild(giaDV);
            var donVi = document.createTextNode(dscthddv[i].dichVu.donVi);
            oDonVi.appendChild(donVi);
            // let soLuongCu = dscthddv[i].soLuong
            var selectSL = document.createTextNode(dscthddv[i].soLuong);
            // selectSL.className = 'form-select'
            // selectSL.id = dscthddv[i].dichVu.maDV
            oSoLuong.appendChild(selectSL);
            // for (let j = soLuongCu; j > 0; j--) {
            //     var option = document.createElement("option");
            //     option.text = j
            //     option.value = j
            //     selectSL.add(option);
            // }
            // selectSL.addEventListener('change', (e) => {
            //     document.getElementById('o_thanh_tien ' + i).innerHTML = e.target.value * dscthddv[i].dichVu.giaDV
            //     var ttPhongVaDV = document.getElementsByClassName('o_thanh_tien');
            //     var len = ttPhongVaDV.length;
            //     let tongThanhTien = 0
            //     for (let k = 0; k < len; k++) {
            //         tongThanhTien = tongThanhTien + parseFloat(ttPhongVaDV[k].textContent)
            //     }
            //     document.getElementById('thanh_tien3').innerHTML = tongThanhTien + ' đ'
            //     setMaDV(maDV => [...maDV, dscthddv[i].dichVu.maDV])
            // })
            var thanhTien = document.createTextNode(dscthddv[i].soLuong * dscthddv[i].dichVu.giaDV);
            oThanhTien.appendChild(thanhTien)
        }
        var ttPhongVaDV = document.getElementsByClassName('o_thanh_tien');
        var len = ttPhongVaDV.length;
        let tongThanhTien = 0
        for (var i = 0; i < len; i++) {
            tongThanhTien = tongThanhTien + parseFloat(ttPhongVaDV[i].textContent)
        }
        document.getElementById('thanh_tien3').innerHTML = tongThanhTien - tienCoc + ' đ'
    }

    const dongModalCTHD = () => setHienModalCTHD(false);

    const moModalCTHD = async (maHD) => {

        try {
            const res1 = await axios.get('http://localhost:8080/room_order_details/' + maHD)
            let dscthdp = res1.data
            setNgayLapHD(moment(dscthdp[0].hoaDon.ngayLapHD).format('YYYY-MM-DD HH:mm:ss'))
            setNgayNhanPhong(moment(dscthdp[0].hoaDon.ngayNhanPhong).format('YYYY-MM-DD HH:mm:ss'))
            setNgayTraPhong(moment(dscthdp[0].hoaDon.ngayTraPhong).format('YYYY-MM-DD HH:mm:ss'))
            setLoaiThue(dscthdp[0].hoaDon.loaiThue)
            setTenKH(dscthdp[0].hoaDon.khachHang.tenKH)
            setSoCMND(dscthdp[0].hoaDon.khachHang.soCMND)
            setSDT(dscthdp[0].hoaDon.khachHang.sDT)

            var res2 = await axios.get('http://localhost:8080/service_order_details/' + maHD)
            let dscthddv = res2.data

            setDSCTHDP(dscthdp)
            setDSCTHDDV(dscthddv)

            setHienModalCTHD(true)
        } catch (error) {
            console.log(error.message);
        }
    };

    const dongModalXacNhanIn = () => setHienModalXacNhanIn(false)

    const moModalXacNhanIn = () => setHienModalXacNhanIn(true)

    const handlePrint = useReactToPrint({
        onBeforeGetContent: () => {
            document.getElementById('in_hoa_don').hidden = false
        },
        content: () => componentRef.current,
        documentTitle: 'hoa_don',
        onAfterPrint: () => {
            document.getElementById('in_hoa_don').hidden = true
            dongModalXacNhanIn()
            dongModalCTHD()
        }
    })

    const tinhTienThua = (e) => {
        if (e.target.value != '') {
            let tienKhachDua = parseInt(e.target.value)
            let thanhTien = parseInt(document.getElementById('thanh_tien3').textContent)
            setTienThua(tienKhachDua - thanhTien)
        }
    }

    const thanhToan = async (e) => {
        try {
            await axios.put('http://localhost:8080/orders/maHD/' + maHD + '/trangThai/Đã thanh toán')
            var oMaPhong = document.getElementsByClassName('o_ma_phong');
            var len = oMaPhong.length;
            for (var i = 0; i < len; i++) {
                var maPhong = oMaPhong[i].textContent
                await axios.put('http://localhost:8080/rooms/' + maPhong + '/' + 'Trống')
            }

            let maDV2 = unique(maDV)
            for (let j = 0; j < maDV2.length; j++) {
                let soLuongCu = parseInt(document.getElementById(maDV2[j]).options[0].text)
                let soLuongMoi = parseInt(document.getElementById(maDV2[j]).value)
                let soLuong = soLuongCu - soLuongMoi
                await axios.put('http://localhost:8080/service_order_details/' + maHD + '/' + maDV2[j] + '/' + soLuongMoi)
                await axios.put('http://localhost:8080/services/' + maDV2[j] + '/' + soLuong + '/Tang')
            }
            // alert('Đã thanh toán');
            if(e.target.value == 'In')
                handlePrint()
            else{
                dongModalXacNhanIn()
                dongModalCTHD()
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (hienModalCTHD == true) {
            themDSPhongDaNhanVaoBang(dscthdp)
            themDSDVDaNhanVaoBang(dscthddv)
            return
        }

        async function layDuLieu() {
            let tbody = document.getElementById('hoa_don_3').getElementsByTagName('tbody')[0];
            var rowCount = tbody.rows.length;
            for (var i = rowCount - 1; i >= 0; i--) {
                tbody.deleteRow(i);
            }

            let res = await axios.get('http://localhost:8080/orders/Đã nhận')
            let dshd = res.data
            themDSHDVaoBang(dshd)
        }
        layDuLieu()

    }, [hienModalCTHD])

    return (
        <div className="row" style={{ marginTop: '2%' }}>
            <div className="row">
                <div className="col input-group">
                    <input type="number" className="form-control" placeholder="Nhập số CMND/CCCD cần tìm..." value={soCMND} onChange={e => setSoCMND(e.target.value)} />
                    <button className="btn btn-success" type="button" onClick={timKHTheoCCCD}><GoSearch /></button>
                </div>
                <div className="col input-group">
                    <input type="text" className="form-control" placeholder="Nhập số điện thoại cần tìm..." value={sDT} onChange={e => setSDT(e.target.value)} />
                    <button className="btn btn-success" type="button" onClick={timKHTheoSDT}><GoSearch /></button>
                </div>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <h5 className="row" style={{ marginLeft: '1%' }}>PHÒNG ĐÃ NHẬN</h5>
                <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100 }}>
                    <table id="hoa_don_3" className="table table-hover">
                        <thead className="table-info">
                            <tr>
                                {/* <th>Mã hoá đơn</th> */}
                                {/* <th>Ngày lập hoá đơn</th> */}
                                <th>Ngày nhận phòng</th>
                                <th>Ngày trả phòng</th>
                                <th>Tên khách hàng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <Modal show={hienModalCTHD} onHide={dongModalCTHD} fullscreen={true}>
                        <Modal.Header closeButton>
                            <Modal.Title>CHI TIẾT</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <span className="col">Ngày lập hoá đơn: {moment(ngayLapHD).format('DD-MM-YYYY HH:mm:ss')}</span>
                                <span className="col">Ngày nhận phòng: {moment(ngayNhanPhong).format('DD-MM-YYYY HH:mm:ss')}</span>
                                <span className="col">Ngày trả phòng: {moment(ngayTraPhong).format('DD-MM-YYYY HH:mm:ss')}</span>
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <span className="col">Tên khách hàng: {tenKH}</span>
                                <span className="col">Số CMND/CCCD: {soCMND}</span>
                                <span className="col">Số điện thoại: {sDT}</span>
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <div className="col-7">
                                    <div className="row">
                                        <h4>PHÒNG</h4>
                                    </div>
                                    <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100, marginTop: '1%' }}>
                                        <table id="phong_da_nhan" className="table table-hover">
                                            <thead className="table-info">
                                                <tr>
                                                    <th>Mã phòng</th>
                                                    {loaiThue == 'Thuê theo giờ' && <th>Giờ đầu</th>}
                                                    {loaiThue == 'Thuê theo giờ' && <th>Giá giờ đầu</th>}
                                                    {loaiThue == 'Thuê theo giờ' && <th>Giá giờ tiếp theo</th>}
                                                    {loaiThue == 'Thuê theo giờ' && <th>Tổng giờ thuê</th>}
                                                    {loaiThue == 'Thuê theo ngày' && <th>Giá theo ngày</th>}
                                                    {loaiThue == 'Thuê theo ngày' && <th>Tổng ngày thuê</th>}
                                                    {loaiThue == 'Thuê qua đêm' && <th>Giá qua đêm</th>}
                                                    {loaiThue == 'Thuê qua đêm' && <th>Tổng đêm thuê</th>}
                                                    <th>Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row" style={{ marginTop: '1%' }}>
                                        <h4>DỊCH VỤ</h4>
                                    </div>
                                    <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100 }}>
                                        <table id="dv_da_nhan" className="table table-hover">
                                            <thead className="table-info">
                                                <tr>
                                                    <th>Tên dịch vụ</th>
                                                    <th>Giá dịch vụ</th>
                                                    <th>Đơn vị</th>
                                                    <th>Số lượng</th>
                                                    <th>Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row" style={{ marginLeft: '1%' }}>
                                        <label htmlFor="tien_cua_khach" className="col-4">Số tiền khách đưa</label>
                                        <input id="tien_cua_khach" type="number" className="form-control col" placeholder="Số tiền khách đưa" onChange={e => tinhTienThua(e)} />
                                    </div>
                                    <div className="row" style={{ marginLeft: '1%', marginTop: '1%' }}>
                                        <label htmlFor="tien_tra_lai" className="col-4">Số tiền thừa</label>
                                        <input id="tien_tra_lai" type="number" className="form-control col" value={tienThua} disabled />
                                    </div>
                                    <div className='row' style={{ marginLeft: '1%', marginTop: '2%' }}>
                                        <span style={{ fontSize: 20 }}>TIỀN CỌC: {tienCoc}</span>
                                    </div>
                                    <div className='row' style={{ marginLeft: '1%', marginTop: '2%' }}>
                                        <h5>TỔNG TIỀN THANH TOÁN: <h5 id='thanh_tien3' style={{ color: 'red' }}>0 đ</h5></h5>
                                    </div>
                                    <div className="row" style={{ marginTop: '2%', marginLeft: '1%' }}>
                                        <input type='button' value='THANH TOÁN' className='btn btn-primary col' style={{ marginLeft: '10%', marginRight: '10%' }} onClick={moModalXacNhanIn} />
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    <Modal show={hienModalXacNhanIn} onHide={dongModalXacNhanIn}>
                        <Modal.Header closeButton>
                            
                        </Modal.Header>
                        <Modal.Body>
                           <div className="row">
                                <p><FcPrint size={100} style={{marginLeft: '40%'}}/></p>
                                <h5>Bạn có muốn in hoá đơn?</h5>
                                <input type="button" className='btn btn-warning col' value="In" onClick={e => thanhToan(e)} style={{marginRight: '2%'}}/>
                                <input type="button" className='btn btn-danger col' value="Không" onClick={e => thanhToan(e)}/>
                           </div>
                        </Modal.Body>
                    </Modal>
                    {(dscthdp.length > 0 || dscthddv.length > 0) && <HoaDon ref={componentRef} ngayLapHD={ngayLapHD} ngayNhanPhong={ngayNhanPhong} ngayTraPhong={ngayTraPhong} tienCoc={tienCoc} tenKH={tenKH} sDT={sDT} soCMND={soCMND} dscthdp={dscthdp} dscthddv={dscthddv} />}
                </div>
            </div>
        </div>
    )
}