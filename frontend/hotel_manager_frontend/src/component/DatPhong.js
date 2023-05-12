import React, { useState, useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import { GoSearch } from 'react-icons/go'
import { AiOutlineUserAdd } from 'react-icons/ai'
import axios from 'axios'
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function DatPhong() {

    const [maHD, setMaHD] = useState(0)
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    const [ngayLapHD, setNgayLapHD] = useState(new Date())
    const [ngayNhan, setNgayNhan] = useState('')
    const [ngayTra, setNgayTra] = useState('')
    const [tienCoc, setTienCoc] = useState(0)
    const [trangThai, setTrangThai] = useState('Đã đặt')
    const [loaiThue, setLoaiThue] = useState('Thuê theo giờ')
    const [maKH, setMaKH] = useState(0)
    const [tenKH, setTenKH] = useState('')
    const [gioiTinh, setGioiTinh] = useState('Nam')
    const [diaChi, setDiaChi] = useState('')
    const [soCMND, setSoCMND] = useState('')
    const [sDT, setSDT] = useState('')
    const [maNV, setMaNV] = useState(parseInt(localStorage.getItem('maTK')))
    const [maLoaiPhong, setMaLoaiPhong] = useState('')
    const [hienModalCTHD, setHienModalCTHD] = useState(false)
    const [hienModalDatPhong, setHienModalDatPhong] = useState(false)
    const [hienModalCapNhat, setHienModalCapNhat] = useState(false)
    const [hienModalThemPhong, setHienModalThemPhong] = useState(false)
    const [tongTien, setTongTien] = useState(0)
    let dsphong
    let dskh

    const themDSHDVaoBang = (dshd) => {
        var tbody = document.getElementById('hoa_don').getElementsByTagName('tbody')[0];
        for (let i = 0; i < dshd.length; i++) {
            var hang = tbody.insertRow();

            var oMaHD = hang.insertCell();
            var oNgayLapHD = hang.insertCell();
            var oNgayNhanPhong = hang.insertCell();
            var oNgayTraPhong = hang.insertCell();
            var oTienCoc = hang.insertCell();
            var oTenKhachHang = hang.insertCell();
            var oChon = hang.insertCell();

            var maHD = document.createTextNode(dshd[i].maHD);
            oMaHD.appendChild(maHD);
            var ngayLapHD = document.createTextNode(moment(dshd[i].ngayLapHD).format('YYYY-MM-DD HH:mm:ss'));
            oNgayLapHD.appendChild(ngayLapHD);
            var ngayNhanPhong = document.createTextNode(moment(dshd[i].ngayNhanPhong).format('YYYY-MM-DD HH:mm:ss'));
            oNgayNhanPhong.appendChild(ngayNhanPhong);
            var ngayTraPhong = document.createTextNode(moment(dshd[i].ngayTraPhong).format('YYYY-MM-DD HH:mm:ss'));
            oNgayTraPhong.appendChild(ngayTraPhong);
            var tienCoc = document.createTextNode(dshd[i].tienCoc);
            oTienCoc.appendChild(tienCoc);
            var tenKH = document.createTextNode(dshd[i].khachHang.tenKH);
            oTenKhachHang.appendChild(tenKH);
            var buttonCT = document.createElement('button')
            buttonCT.setAttribute('class', 'btn btn-primary')
            buttonCT.type = 'button'
            buttonCT.value = dshd[i].maHD
            buttonCT.textContent = 'XEM CHI TIẾT'
            buttonCT.addEventListener('click', function () {
                let maHD = parseInt(this.value)
                setMaHD(maHD)
                setNgayNhan(moment(dshd[i].ngayNhanPhong).format('YYYY-MM-DD HH:mm:ss'))
                setNgayTra(moment(dshd[i].ngayTraPhong).format('YYYY-MM-DD HH:mm:ss'))
                localStorage.setItem('loaiThue', dshd[i].loaiThue)
                moModalCTHD(maHD)
            })
            var btnCapNhat = document.createElement('button')
            btnCapNhat.setAttribute('class', 'btn btn-warning')
            btnCapNhat.type = 'button'
            btnCapNhat.value = dshd[i].maHD
            btnCapNhat.textContent = 'CẬP NHẬT'
            btnCapNhat.addEventListener('click', async function () {
                let maHD = parseInt(this.value)
                setMaHD(maHD)
                let res = await axios.get('http://localhost:8080/orders/maHD/' + maHD)
                setNgayLapHD(moment(res.data.ngayLapHD).format('YYYY-MM-DD HH:mm:ss'))
                setNgayNhan(moment(res.data.ngayNhanPhong).format('YYYY-MM-DD HH:mm:ss'))
                setNgayTra(moment(res.data.ngayTraPhong).format('YYYY-MM-DD HH:mm:ss'))
                setLoaiThue(res.data.loaiThue)
                moModalCapNhat()
            })
            var btnXoa = document.createElement('button')
            btnXoa.setAttribute('class', 'btn btn-danger')
            btnXoa.type = 'button'
            btnXoa.value = dshd[i].maHD
            btnXoa.textContent = 'HUỶ ĐẶT PHÒNG'
            btnXoa.addEventListener('click', async function () {
                if (!(window.confirm('Bạn có chắc muốn xoá?')))
                    return false
                else {
                    let maHD = parseInt(this.value)
                    setMaHD(maHD)
                    const res1 = await axios.get('http://localhost:8080/room_order_details/' + maHD)
                    let dscthd = res1.data
                    for (let j = 0; j < dscthd.length; j++)
                        await axios.put('http://localhost:8080/rooms/' + dscthd[j].phong.maPhong + '/Trống')
                    await axios.delete('http://localhost:8080/orders/' + maHD)
                    alert('Đã xoá!')
                    window.location.reload()
                }
            })
            oChon.appendChild(btnCapNhat);
            oChon.appendChild(document.createTextNode(' | '));
            oChon.appendChild(btnXoa);
            oChon.appendChild(document.createTextNode(' | '));
            oChon.appendChild(buttonCT);
        }
    }

    const themDSPhongDatTruocVaoBang = (dsphong, maHD) => {
        var tbody = document.getElementById('dsphong_da_dat_1').getElementsByTagName('tbody')[0];
        for (let i = 0; i < dsphong.length; i++) {
            var hang = tbody.insertRow();

            var oMaPhong = hang.insertCell();
            oMaPhong.className = 'o_ma_phong'
            var oTenTang = hang.insertCell();
            var oTenLoaiPhong = hang.insertCell();
            var oSoGiuong = hang.insertCell();
            var oDienTich = hang.insertCell();
            var oGioDau = hang.insertCell();
            var oGiaGioDau = hang.insertCell();
            var oGiaGioTiepTheo = hang.insertCell();
            var oGiaTheoNgay = hang.insertCell();
            // var oChon = hang.insertCell();

            var maPhong = document.createTextNode(dsphong[i].phong.maPhong);
            oMaPhong.appendChild(maPhong);
            var soGiuong = document.createTextNode(dsphong[i].phong.soGiuong);
            oSoGiuong.appendChild(soGiuong);
            var dienTich = document.createTextNode(dsphong[i].phong.dienTich);
            oDienTich.appendChild(dienTich);
            var gioDau = document.createTextNode(dsphong[i].phong.gioDau);
            oGioDau.appendChild(gioDau);
            var giaGioDau = document.createTextNode(dsphong[i].phong.giaGioDau);
            oGiaGioDau.appendChild(giaGioDau);
            oGiaGioDau.id = 'o_gia_gio_dau ' + i
            var giaGioTiepTheo = document.createTextNode(dsphong[i].phong.giaGioTiepTheo);
            oGiaGioTiepTheo.appendChild(giaGioTiepTheo);
            var giaTheoNgay = document.createTextNode(dsphong[i].phong.giaTheoNgay);
            oGiaTheoNgay.appendChild(giaTheoNgay);
            var tenLoaiPhong = document.createTextNode(dsphong[i].phong.loaiPhong.ten);
            oTenLoaiPhong.appendChild(tenLoaiPhong);
            var tenTang = document.createTextNode(dsphong[i].phong.tang.tenTang);
            oTenTang.appendChild(tenTang);
            let giaGioDau2 = document.getElementById('o_gia_gio_dau ' + i).textContent
            // document.getElementById('thanh_tien').textContent = parseInt(document.getElementById('thanh_tien').textContent) + parseInt(giaGioDau2) + ' đ'
            // var btnXoa = document.createElement('button')
            // btnXoa.setAttribute('class', 'btn btn-danger')
            // btnXoa.innerHTML = 'XOÁ'
            // btnXoa.type = 'button'
            // btnXoa.value = dsphong[i].phong.maPhong
            // if (dsphong.length <= 1)
            //     btnXoa.disabled = true
            // btnXoa.addEventListener('click', async function () {
            //     if (!(window.confirm('Bạn có chắc muốn xoá?')))
            //         return false
            //     else if (dsphong.length > 1) {
            //         try {
            //             await axios.delete('http://localhost:8080/room_order_details/' + maHD + '/' + this.value)
            //             await axios.put('http://localhost:8080/rooms/' + this.value + '/Trống')
            //             let tbody = document.getElementById('dsphong_da_dat_1').getElementsByTagName('tbody')[0];
            //             var rowCount = tbody.rows.length;
            //             for (var i = rowCount - 1; i >= 0; i--) {
            //                 tbody.deleteRow(i);
            //             }
            //             document.getElementById('thanh_tien').textContent = '0 đ'
            //             moModalCTHD(maHD)
            //         } catch (error) {
            //             console.log(error.message);
            //         }
            //     }
            // })
            // oChon.appendChild(btnXoa);
        }
    }

    const timKHTheoCCCD = async () => {
        let tbody = document.getElementById('hoa_don').getElementsByTagName('tbody')[0];
        var rowCount = tbody.rows.length;
        for (var i = rowCount - 1; i >= 0; i--) {
            tbody.deleteRow(i);
        }
        if (soCMND != '') {
            let res1 = await axios.get('http://localhost:8080/customers/cccd/' + soCMND)
            let maKH = res1.data.maKH

            var res2 = await axios.get('http://localhost:8080/orders/' + maKH + '/Đã đặt')
            let dshd = res2.data
            themDSHDVaoBang(dshd)
        }
        else {

        }
    }

    const timKHTheoSDT = async () => {
        let tbody = document.getElementById('hoa_don').getElementsByTagName('tbody')[0];
        var rowCount = tbody.rows.length;
        for (var i = rowCount - 1; i >= 0; i--) {
            tbody.deleteRow(i);
        }
        if (sDT != '') {
            let res1 = await axios.get('http://localhost:8080/customers/sdt/' + sDT)
            let maKH = res1.data.maKH

            var res2 = await axios.get('http://localhost:8080/orders/' + maKH + '/Đã đặt')
            let dshd = res2.data
            themDSHDVaoBang(dshd)
        }
        else {

        }
    }

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

    const luuKH = async () => {

        if (ktdiachi() && kttenkhachhang() && kTsdt() && kTso_cmnd()) {
            try {
                let res1 = await axios.post('http://localhost:8080/tai_khoan', {
                    maTK: 0,
                    tenDangNhap: sDT,
                    matKhau: '12345678'
                })
                let taiKhoan = res1.data
                let res2 = await axios.post('http://localhost:8080/customers', {
                    taiKhoan: {
                        maTK: taiKhoan.maTK
                    },
                    tenKH: tenKH,
                    gioiTinh: gioiTinh,
                    diaChi: diaChi,
                    soCMND: soCMND,
                    sDT: sDT
                })
                let kh = res2.data
                var datalist = document.getElementById("dskh");
                var option = document.createElement("option");
                option.value = kh.maKH + ' - ' + kh.tenKH + ' - ' + kh.sDT + ' - ' + kh.soCMND
                datalist.appendChild(option);
                setTenKH('')
                setGioiTinh('Nam')
                setDiaChi('')
                setSoCMND('')
                setSDT('')
                alert('Lưu thành công!')
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const themCTHDPhong = async () => {
        var cboxes = document.getElementsByClassName('form-check-input');
        var len = cboxes.length;
        for (var i = 0; i < len; i++) {
            if (cboxes[i].checked) {
                let maPhong = cboxes[i].value
                try {
                    let res1 = await axios.get('http://localhost:8080/rooms/' + maPhong)
                    let phong = res1.data
                    await axios.put('http://localhost:8080/rooms/' + maPhong + '/' + 'Đã đặt')
                    const res2 = await axios.post('http://localhost:8080/room_order_details', {
                        hoaDon: { 'maHD': maHD },
                        phong: { 'maPhong': maPhong },
                        gioDau: phong.gioDau,
                        giaGioDau: phong.giaGioDau,
                        giaGioTiepTheo: phong.giaGioTiepTheo,
                        giaTheoNgay: phong.giaTheoNgay,
                    })
                    setHienModalThemPhong(false)
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
        alert("Thêm phòng thành công!")
    }

    const datPhong = async () => {
        let maHD
        try {
            let maKHf = parseInt(maKH)
            const res = await axios.post('http://localhost:8080/orders', {
                ngayLapHD: moment().format(),
                ngayTraPhong: moment(ngayTra).format(),
                ngayNhanPhong: moment(ngayNhan).format(),
                loaiThue: loaiThue,
                trangThaiHD: trangThai,
                khachHang: { 'maKH': maKHf },
                nhanVien: { 'maNV': maNV }
            })
            maHD = res.data.maHD
        } catch (error) {
            console.log(error.message);
        }
        var cboxes = document.getElementsByClassName('form-check-input');
        var len = cboxes.length;
        for (var i = 0; i < len; i++) {
            if (cboxes[i].checked) {
                let maPhong = cboxes[i].value
                try {
                    let res2 = await axios.get('http://localhost:8080/rooms/' + maPhong)
                    let phong = res2.data
                    await axios.put('http://localhost:8080/rooms/' + maPhong + '/' + 'Đã đặt')
                    await axios.post('http://localhost:8080/room_order_details', {
                        hoaDon: { 'maHD': maHD },
                        phong: { 'maPhong': maPhong },
                        gioDau: phong.gioDau,
                        giaGioDau: phong.giaGioDau,
                        giaGioTiepTheo: phong.giaGioTiepTheo,
                        giaTheoNgay: phong.giaTheoNgay,
                    })
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
        setNgayNhan('')
        setNgayTra('')
        setMaKH('')
        document.getElementById('thanh_tien').textContent = '0 đ'
        let tbody = document.getElementById('dsphong').getElementsByTagName('tbody')[0];
        var rowCount = tbody.rows.length;
        for (var i = rowCount - 1; i >= 0; i--) {
            tbody.deleteRow(i);
        }
        alert("Đặt phòng thành công!")
    }

    const nhanPhong = async () => {
        let maHD
        try {
            let maKHf = parseInt(maKH)
            const res = await axios.post('http://localhost:8080/orders', {
                ngayLapHD: moment().format(),
                ngayTraPhong: moment(ngayTra).format(),
                ngayNhanPhong: moment(ngayNhan).format(),
                loaiThue: loaiThue,
                trangThaiHD: 'Đã nhận',
                khachHang: { 'maKH': maKHf },
                nhanVien: { 'maNV': maNV }
            })
            maHD = res.data.maHD
        } catch (error) {
            console.log(error.message);
        }
        var cboxes = document.getElementsByClassName('form-check-input');
        var len = cboxes.length;
        for (var i = 0; i < len; i++) {
            if (cboxes[i].checked) {
                let maPhong = cboxes[i].value
                try {
                    let res2 = await axios.get('http://localhost:8080/rooms/' + maPhong)
                    let phong = res2.data
                    await axios.put('http://localhost:8080/rooms/' + maPhong + '/' + 'Đã nhận')
                    await axios.post('http://localhost:8080/room_order_details', {
                        hoaDon: { 'maHD': maHD },
                        phong: { 'maPhong': maPhong },
                        gioDau: phong.gioDau,
                        giaGioDau: phong.giaGioDau,
                        giaGioTiepTheo: phong.giaGioTiepTheo,
                        giaTheoNgay: phong.giaTheoNgay,
                    })
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
        setNgayNhan('')
        setNgayTra('')
        setMaKH('')
        document.getElementById('thanh_tien').textContent = '0 đ'
        let tbody = document.getElementById('dsphong').getElementsByTagName('tbody')[0];
        var rowCount = tbody.rows.length;
        for (var i = rowCount - 1; i >= 0; i--) {
            tbody.deleteRow(i);
        }
        alert('Nhận phòng thành công!')
    }

    const nhanPhongDatTruoc = async () => {
        // let date = new Date()
        // let ngayNhan = moment(date).format('YYYY-MM-DD HH:mm:ss')
        try {
            // await axios({ url: 'http://localhost:8080/orders/' + maHD, method: 'put', params: { ngayNhanPhong: ngayNhan } })
            await axios.put('http://localhost:8080/orders/maHD/' + maHD + '/trangThai/Đã nhận')
        } catch (error) {
            console.log(error.message);
        }
        var dsMaPhong = document.getElementsByClassName('o_ma_phong');
        for (var i = 0; i < dsMaPhong.length; i++) {
            let maPhong = dsMaPhong[i].textContent
            try {
                await axios.put('http://localhost:8080/rooms/' + maPhong + '/Đã nhận')
            } catch (error) {
                console.log(error.message);
            }
        }
        setHienModalCTHD(false)
        alert('Nhận phòng thành công!')
    }

    const timPhong = async () => {
        let ngayNhanf = moment(ngayNhan).format('YYYY-MM-DD HH:mm:ss');
        let ngayTraf = moment(ngayTra).format('YYYY-MM-DD HH:mm:ss');
        if (moment(ngayTra).diff(moment(ngayNhan), 'hours') < 24) {
            setLoaiThue('Thuê theo giờ')
            localStorage.setItem('loaiThue', 'Thuê theo giờ')
        }
        else if (moment(ngayTra).diff(moment(ngayNhan), 'hours') >= 24) {
            setLoaiThue('Thuê theo ngày')
            localStorage.setItem('loaiThue', 'Thuê theo ngày')
        }
        let tbody = document.getElementById('dsphong').getElementsByTagName('tbody')[0];
        var rowCount = tbody.rows.length;
        for (var i = rowCount - 1; i >= 0; i--) {
            tbody.deleteRow(i);
        }
        document.getElementById('thanh_tien').textContent = '0 đ'
        var res = await axios.get('http://localhost:8080/rooms/ngayNhanPhong/' + ngayNhanf + '/ngayTraPhong/' + ngayTraf)
        dsphong = res.data
        themDSPhongVaoBang(dsphong)
    }

    const themDSPhongVaoBang = (dsphong) => {
        let loaiThue = localStorage.getItem('loaiThue')
        var tbody = document.getElementById('dsphong').getElementsByTagName('tbody')[0];
        for (let i = 0; i < dsphong.length; i++) {
            var hang = tbody.insertRow();

            var oMaPhong = hang.insertCell();
            var oTenTang = hang.insertCell();
            var oTenLoaiPhong = hang.insertCell();
            var oSoGiuong = hang.insertCell();
            var oDienTich = hang.insertCell();
            if (loaiThue == 'Thuê theo giờ') {
                var oGioDau = hang.insertCell();
                var oGiaGioDau = hang.insertCell();
                var oGiaGioTiepTheo = hang.insertCell();

                var gioDau = document.createTextNode(dsphong[i].gioDau);
                oGioDau.appendChild(gioDau);
                var giaGioDau = document.createTextNode(dsphong[i].giaGioDau);
                oGiaGioDau.appendChild(giaGioDau);
                oGiaGioDau.id = 'o_gia_gio_dau ' + i
                var giaGioTiepTheo = document.createTextNode(dsphong[i].giaGioTiepTheo);
                oGiaGioTiepTheo.appendChild(giaGioTiepTheo);
            }
            else {
                var oGiaTheoNgay = hang.insertCell();

                var giaTheoNgay = document.createTextNode(dsphong[i].giaTheoNgay);
                oGiaTheoNgay.appendChild(giaTheoNgay);
            }
            var oChon = hang.insertCell();

            var maPhong = document.createTextNode(dsphong[i].maPhong);
            oMaPhong.appendChild(maPhong);
            var soGiuong = document.createTextNode(dsphong[i].soGiuong);
            oSoGiuong.appendChild(soGiuong);
            var dienTich = document.createTextNode(dsphong[i].dienTich);
            oDienTich.appendChild(dienTich);
            var tenLoaiPhong = document.createTextNode(dsphong[i].loaiPhong.ten);
            oTenLoaiPhong.appendChild(tenLoaiPhong);
            var tenTang = document.createTextNode(dsphong[i].tang.tenTang);
            oTenTang.appendChild(tenTang);
            var input = document.createElement('input')
            input.type = 'checkbox'
            input.setAttribute('class', 'form-check-input')
            input.value = dsphong[i].maPhong
            input.addEventListener('change', function () {
                let tongTienCu = parseFloat(document.getElementById('thanh_tien').textContent)
                if (this.checked) {
                    if (loaiThue == 'Thuê theo giờ') {
                        let soGioThue = moment(ngayTra).diff(moment(ngayNhan), 'hours')
                        let gioDau = dsphong[i].gioDau
                        let gioTiepTheo = soGioThue - gioDau
                        if (soGioThue > gioDau) {
                            let thanhTienGioDau = dsphong[i].giaGioDau
                            let thanhTienGioTiepTheo = gioTiepTheo * dsphong[i].giaGioTiepTheo
                            let thanhTien = thanhTienGioDau + thanhTienGioTiepTheo
                            document.getElementById('thanh_tien').textContent = tongTienCu + thanhTien + 'đ'
                        }
                        else {
                            let thanhTien = dsphong[i].giaGioDau
                            document.getElementById('thanh_tien').textContent = tongTienCu + thanhTien + 'đ'
                        }
                    }
                    else if (loaiThue == 'Thuê theo ngày') {
                        let soNgayThue = moment(ngayTra).diff(moment(ngayNhan), 'days')
                        let thanhTien = soNgayThue * dsphong[i].giaTheoNgay
                        document.getElementById('thanh_tien').textContent = tongTienCu + thanhTien + 'đ'
                    }
                }
                else {
                    if (loaiThue == 'Thuê theo giờ') {
                        let soGioThue = moment(ngayTra).diff(moment(ngayNhan), 'hours')
                        let gioDau = dsphong[i].gioDau
                        let gioTiepTheo = soGioThue - gioDau
                        if (soGioThue > gioDau) {
                            let thanhTienGioDau = dsphong[i].giaGioDau
                            let thanhTienGioTiepTheo = gioTiepTheo * dsphong[i].giaGioTiepTheo
                            let thanhTien = thanhTienGioDau + thanhTienGioTiepTheo
                            document.getElementById('thanh_tien').textContent = tongTienCu - thanhTien + 'đ'
                        }
                        else {
                            let thanhTien = dsphong[i].giaGioDau
                            document.getElementById('thanh_tien').textContent = tongTienCu - thanhTien + 'đ'
                        }
                    }
                    else if (loaiThue == 'Thuê theo ngày') {
                        let soNgayThue = moment(ngayTra).diff(moment(ngayNhan), 'days')
                        let thanhTien = soNgayThue * dsphong[i].giaTheoNgay
                        document.getElementById('thanh_tien').textContent = tongTienCu - thanhTien + 'đ'
                    }
                }
            })
            oChon.appendChild(input);
        }
    }

    const dongModalCTHD = () => setHienModalCTHD(false);

    const moModalCTHD = async (maHD) => {

        setHienModalCTHD(true)

        try {
            const res1 = await axios.get('http://localhost:8080/room_order_details/' + maHD)
            let dscthd = res1.data
            themDSPhongDatTruocVaoBang(dscthd, maHD)

            // var res2 = await axios.get('http://localhost:8080/rooms/ngayNhanPhong/' + ngayNhanf + '/ngayTraPhong/' + ngayTra)
            // dsphong = res2.data
            // themDSPhongVaoBang(dsphong)
        } catch (error) {
            console.log(error.message);
        }
    };

    const dongModalDatPhong = () => setHienModalDatPhong(false);

    const moModalDatPhong = () => {

        setHienModalDatPhong(true)
        layDuLieu()

        async function layDuLieu() {
            try {
                var res1 = await axios.get('http://localhost:8080/customers')
                dskh = res1.data
                themDSKHVaoDatalist(dskh)

                // const res2 = await axios.get('http://localhost:8080/room_categories')
                // const dsLoaiPhong = res2.data
                // themDSLoaiPhongVaoSelect(dsLoaiPhong)
            } catch (error) {
                console.log(error.message);
            }
        }

        function themDSKHVaoDatalist(dskh) {
            var datalist = document.getElementById("dskh");
            for (var i = 0; i < dskh.length; i++) {
                var option = document.createElement("option");
                option.value = dskh[i].maKH + ' - ' + dskh[i].tenKH + ' - ' + dskh[i].sDT + ' - ' + dskh[i].soCMND
                datalist.appendChild(option);
            }
        }

        // function themDSLoaiPhongVaoSelect(dsLoaiPhong) {
        //     var select = document.getElementById("loai_phong");
        //     for (var i = 0; i < dsLoaiPhong.length; i++) {
        //         var option = document.createElement("option");
        //         option.text = dsLoaiPhong[i].ten
        //         option.value = dsLoaiPhong[i].maLoaiPhong
        //         select.add(option);
        //     }
        //     setMaLoaiPhong(dsLoaiPhong[0].maLoaiPhong)
        // }
    }

    const dongModalCapNhat = () => setHienModalCapNhat(false);

    const moModalCapNhat = () => {
        setHienModalCapNhat(true)
    }

    const dongModalThemPhong = () => setHienModalThemPhong(false);

    const moModalThemPhong = () => {
        setHienModalCTHD(false)
        setHienModalThemPhong(true)
        async function layPhong() {
            try {
                var res = await axios.get('http://localhost:8080/rooms/ngayNhanPhong/' + ngayNhan + '/ngayTraPhong/' + ngayTra)
                dsphong = res.data
                themDSPhongVaoBang(dsphong)
            } catch (error) {
                console.log(error.message);
            }
        }

        layPhong()
    }

    const capNhatHD = async () => {
        try {
            await axios.put('http://localhost:8080/orders/' + maHD + '/' + tienCoc)
            alert('Đã cập nhật!')
        }
        catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (hienModalCTHD == false || hienModalDatPhong == false || hienModalCapNhat == false || hienModalThemPhong == false) {
            async function layDuLieu() {

                let tbody = document.getElementById('hoa_don').getElementsByTagName('tbody')[0];
                var rowCount = tbody.rows.length;
                for (var i = rowCount - 1; i >= 0; i--) {
                    tbody.deleteRow(i);
                }
                try {
                    let res1 = await axios.get('http://localhost:8080/orders/Đã đặt')
                    let dshd = res1.data
                    themDSHDVaoBang(dshd)
                } catch (error) {
                    console.log(error.message);
                }
            }

            layDuLieu()
        }
    }, [hienModalCTHD, hienModalDatPhong, hienModalCapNhat, hienModalThemPhong])

    return (
        <div className="row" style={{ marginTop: '2%' }}>
            <div className="row">
                <div className="col">
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
                        <button type="button" className="col-3 btn btn-primary" onClick={moModalDatPhong}>ĐẶT PHÒNG</button>
                        <Modal show={hienModalDatPhong} onHide={dongModalDatPhong} fullscreen={true}>
                            <Modal.Header closeButton>
                                <Modal.Title>ĐẶT PHÒNG</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-9">
                                        <div className="row" style={{ marginRight: '1%' }}>
                                            <div className="col input-group">
                                                <span className="input-group-text">Ngày nhận phòng</span>
                                                <input type='datetime-local' className="form-control" id='ngayNhan' value={ngayNhan} onChange={e => setNgayNhan(e.target.value)} />
                                                <span className="input-group-text">Ngày trả phòng</span>
                                                <input type='datetime-local' className="form-control" id='ngay_tra' value={ngayTra} onChange={e => setNgayTra(e.target.value)} />
                                                <button className="btn btn-success" type="button" onClick={timPhong}><GoSearch /></button>
                                            </div>
                                        </div>
                                        {/* <div className="row" style={{ marginRight: '1%', marginTop: '2%' }}>
                    <div className="col input-group">
                        <span class="input-group-text">Loại phòng</span>
                        <select className="form-select" id='loai_phong' value={maLoaiPhong} onChange={event => setMaLoaiPhong(event.target.value)}>
                        </select>
                        <span class="input-group-text">Số giường</span>
                        <input type="number" className="form-control" placeholder="Số giường..." style={{ fontSize: 16 }} value={soGiuong} onChange={e => setSoGiuong(e.target.value)} />
                        <button class="btn btn-success" type="button" onClick={timPhong}><GoSearch /></button>
                    </div>
                </div> */}
                                        <div className="row table-responsive" style={{ marginTop: '2%', borderRadius: 30, borderWidth: 100, marginRight: '1%' }}>
                                            <table id="dsphong" className="table table-hover">
                                                <thead className="table-info">
                                                    <tr>
                                                        <th>Mã phòng</th>
                                                        <th>Tầng</th>
                                                        <th>Loại phòng</th>
                                                        <th>Số giường</th>
                                                        <th>Diện tích</th>
                                                        {loaiThue == 'Thuê theo giờ' && <th>Giờ đầu</th>}
                                                        {loaiThue == 'Thuê theo giờ' && <th>Giá giờ đầu</th>}
                                                        {loaiThue == 'Thuê theo giờ' && <th>Giá giờ tiếp theo</th>}
                                                        {loaiThue == 'Thuê theo ngày' && <th>Giá theo ngày</th>}
                                                        <th>Chọn</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="row" style={{ marginTop: '2%' }}>
                                            <label htmlFor="kh" className="form-label">Mã - Tên - Số điện thoại - CCCD khách hàng</label>
                                            <input className="form-control col" list="dskh" name="kh" id="kh" placeholder="Mã - Tên - Số điện thoại - CCCD khách hàng..." onChange={e => setMaKH(e.target.value.split('-')[0])} />
                                            <datalist id="dskh">
                                            </datalist>

                                            <button type='button' className='btn btn-primary col-2' style={{ marginLeft: '1%' }} data-bs-toggle="modal" data-bs-target="#myModal"><AiOutlineUserAdd /></button>
                                            <div className="modal" id="myModal">
                                                <div className="modal-dialog modal-fullscreen">
                                                    <div className="modal-content">

                                                        <div className="modal-header">
                                                            <h4 className="modal-title">THÊM KHÁCH HÀNG</h4>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                        </div>

                                                        <div className="modal-body">
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
                                                                <input type='button' value='LƯU' className='btn btn-success' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={luuKH} />
                                                            </form>
                                                        </div>

                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '5%' }} className='row'>
                                            <h5>THÀNH TIỀN: <h5 id='thanh_tien' style={{ color: 'red' }}>0 đ</h5></h5>
                                        </div>
                                        <div className="row" style={{ marginTop: '5%' }}>
                                            <input type='button' value='ĐẶT PHÒNG' className='btn btn-primary col' style={{ marginRight: '2%' }} onClick={datPhong} />
                                            <input type='button' value='NHẬN PHÒNG' className='btn btn-primary col' onClick={nhanPhong} />
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                    <h5 className="row" style={{ marginBottom: '2%', marginTop: '2%' }}>PHÒNG ĐÃ ĐẶT</h5>
                    <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100 }}>
                        <table id="hoa_don" className="table table-hover">
                            <thead className="table-info">
                                <tr>
                                    <th>Mã hoá đơn phòng</th>
                                    <th>Ngày lập hoá đơn</th>
                                    <th>Ngày nhận phòng</th>
                                    <th>Ngày trả phòng</th>
                                    <th>Tiền cọc</th>
                                    <th>Tên khách hàng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <Modal show={hienModalCapNhat} onHide={dongModalCapNhat} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>HOÁ ĐƠN</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="row" style={{ marginTop: '2%' }}>
                                    <div className="row">
                                        <label htmlFor='tien-coc' className="form-label col-5">Nhập tiền cọc</label>
                                        <input type='number' className="form-control col" placeholder='Nhập tiền cọc' id='tien-coc' value={tienCoc} onChange={event => setTienCoc(event.target.value)} />
                                    </div>
                                    <div className="row" style={{ marginTop: '5%' }}>
                                        <input type='button' className="btn btn-success col" value='CẬP NHẬT' onClick={capNhatHD} />
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type='button' className="btn btn-danger" onClick={dongModalCapNhat}>
                                Đóng
                            </button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={hienModalCTHD} onHide={dongModalCTHD} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>PHÒNG</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="row">
                                    <button type="button" className="btn btn-primary" onClick={moModalThemPhong}>THÊM PHÒNG</button>
                                </div>
                                <div className="row" style={{ marginTop: '2%' }}>
                                    <div className="col">
                                        <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100 }}>
                                            <table id="dsphong_da_dat_1" className="table table-hover">
                                                <thead className="table-info">
                                                    <tr>
                                                        <th>Mã phòng</th>
                                                        <th>Tầng</th>
                                                        <th>Loại phòng</th>
                                                        <th>Số giường</th>
                                                        <th>Diện tích</th>
                                                        <th>Giờ đầu</th>
                                                        <th>Giá giờ đầu</th>
                                                        <th>Giá giờ tiếp theo</th>
                                                        <th>Giá theo ngày</th>
                                                        {/* <th>Chọn</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: '2%' }}>
                                    {/* <h5>THÀNH TIỀN: <h5 id='thanh_tien' style={{ color: 'red' }}>0 đ</h5></h5> */}
                                    <input type="button" className="btn btn-success" value='NHẬN PHÒNG' onClick={nhanPhongDatTruoc} />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type='button' className="btn btn-danger" onClick={dongModalCTHD}>
                                Đóng
                            </button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={hienModalThemPhong} onHide={dongModalThemPhong} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>PHÒNG</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="row">
                                    <div className="col">
                                        <div className="row table-responsive" style={{ borderRadius: 30, borderWidth: 100 }}>
                                            <table id="dsphong" className="table table-hover">
                                                <thead className="table-info">
                                                    <tr>
                                                        <th>Mã phòng</th>
                                                        <th>Tầng</th>
                                                        <th>Loại phòng</th>
                                                        <th>Số giường</th>
                                                        <th>Diện tích</th>
                                                        {localStorage.getItem('loaiThue') == 'Thuê theo giờ' && <th>Giờ đầu</th>}
                                                        {localStorage.getItem('loaiThue') == 'Thuê theo giờ' && <th>Giá giờ đầu</th>}
                                                        {localStorage.getItem('loaiThue') == 'Thuê theo giờ' && <th>Giá giờ tiếp theo</th>}
                                                        {localStorage.getItem('loaiThue') == 'Thuê theo ngày' && <th>Giá theo ngày</th>}
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
                                    {/* <h5>THÀNH TIỀN: <h5 id='thanh_tien' style={{ color: 'red' }}>0 đ</h5></h5> */}
                                    <input type='button' value='THÊM' className='btn btn-success' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={themCTHDPhong} />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type='button' className="btn btn-danger" onClick={dongModalThemPhong}>
                                Đóng
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}