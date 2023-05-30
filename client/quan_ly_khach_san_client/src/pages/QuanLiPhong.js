import React, { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { GoSearch } from 'react-icons/go'
import { FiRefreshCw } from 'react-icons/fi'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function QuanLiPhong() {

    const [maPhong, setMaPhong] = useState('')
    const [trangThai, setTrangThai] = useState('Trống')
    const [soGiuong, setSoGiuong] = useState(0)
    const [dienTich, setDienTich] = useState(0)
    const [sucChua, setSucChua] = useState(0)
    const [gioDau, setGioDau] = useState(0)
    const [giaGioDau, setGiaGioDau] = useState(0)
    const [giaGioTiepTheo, setGiaGioTiepTheo] = useState(0)
    const [giaTheoNgay, setGiaTheoNgay] = useState(0)
    const [maLoaiPhong, setMaLoaiPhong] = useState(0)
    const [maTang, setMaTang] = useState(0)
    const [hinh, setHinh] = useState(null)
    const [duongDanHinh, setDuongDanHinh] = useState('')
    const [taiLai, setTaiLai] = useState(true)
    const [dsPhong, setDSPhong] = useState([])
    const [hienModalPhong, setHienModalPhong] = useState(false)
    const [dsLoaiPhong, setDSLoaiPhong] = useState([])
    const [dsTang, setDSTang] = useState([])
    const [anMaPhong, setAnMaPhong] = useState(false)
    const storage = getStorage();

    const tim = () => {
        setDSPhong([])
        axios.get('http://localhost:8080/rooms/' + maPhong)
            .then((res) => {
                let phong = res.data
                if (phong != '')
                    setDSPhong(phongCu => [...phongCu, phong])
                else
                    alert('Không tìm thấy!')
            })
    }

    const khoiPhucMacDinh = () => {
        setMaPhong('')
        setTrangThai('Trống')
        setSoGiuong(0)
        setDienTich(0)
        setSucChua(0)
        setGioDau(0)
        setGiaGioDau(0)
        setGiaGioTiepTheo(0)
        setGiaTheoNgay(0)
        setHinh(null)
        setDuongDanHinh('')
    }

    const them = () => {
        setAnMaPhong(false)
        moModalPhong()
    }

    const capNhat = (phong) => {
        setMaPhong(phong.maPhong)
        setTrangThai(phong.trangThaiPhong)
        setSoGiuong(phong.soGiuong)
        setDienTich(phong.dienTich)
        setSucChua(phong.sucChua)
        setGioDau(phong.gioDau)
        setGiaGioDau(phong.giaGioDau)
        setGiaGioTiepTheo(phong.giaGioTiepTheo)
        setGiaTheoNgay(phong.giaTheoNgay)
        setMaLoaiPhong(phong.loaiPhong.maLoaiPhong)
        setMaTang(phong.tang.maTang)
        setDuongDanHinh(phong.duongDanHinh)
        setAnMaPhong(true)
        moModalPhong()
    }

    const xoa = async (phong) => {
        if (!(window.confirm('Bạn có chắc muốn xoá?')))
            return false
        try {
            await axios.delete('http://localhost:8080/rooms/' + phong.maPhong)
            const desertRef = ref(storage, phong.duongDanHinh);
            deleteObject(desertRef).then(() => {
                console.log('Đã xoá!');
            }).catch((error) => {
                console.log(error);
            });
            setTaiLai(true)
        } catch (error) {
            console.log(error.message);
        }
    }

    const dongModalPhong = () => {
        khoiPhucMacDinh()
        setHienModalPhong(false)
    }

    const moModalPhong = () => setHienModalPhong(true)

    const kTdientich = () => {
        var dien_tich = document.getElementById("dien_tich").value;
        var regdientich = /^[0-9]{1,}$/;
        if (regdientich.test(dien_tich) && parseInt(dien_tich) > 0) {
            document.getElementById("loidien_tich").innerHTML = "*";
            return true;
        }
        else {
            if (dien_tich == "") {
                document.getElementById("loidien_tich").innerHTML = "Bạn chưa nhập diện tích phòng!";
                return false;
            }
            document.getElementById("loidien_tich").innerHTML = "Diện tích phòng phải là số lớn hơn 20!";
            return false;
        }
    }

    const kTgiagiodau = () => {
        var gia_gio_dau = document.getElementById("gia_gio_dau").value;
        var reggiagiodau = /^[0-9]{1,}$/;
        if (reggiagiodau.test(gia_gio_dau) && parseInt(gia_gio_dau) > 0) {
            document.getElementById("loigia_gio_dau").innerHTML = "*";
            return true;
        }
        else {
            if (gia_gio_dau == "") {
                document.getElementById("loigia_gio_dau").innerHTML = "Bạn chưa nhập giá giờ đầu phòng!";
                return false;
            }
            document.getElementById("loigia_gio_dau").innerHTML = "Giá giờ đầu là số lớn hơn 0!";
            return false;
        }
    }

    const kTgiagiotieptheo = () => {
        var gia_gio_tiep_theo = document.getElementById("gia_gio_tiep_theo").value;
        var reggiagiotieptheo = /^[0-9]{1,}$/;
        if (reggiagiotieptheo.test(gia_gio_tiep_theo) && parseInt(gia_gio_tiep_theo) > 0) {
            document.getElementById("loigia_gio_tiep_theo").innerHTML = "*";
            return true;
        }
        else {
            if (gia_gio_tiep_theo == "") {
                document.getElementById("loigia_gio_tiep_theo").innerHTML = "Bạn chưa nhập giá giờ tiếp theo của phòng!";
                return false;
            }
            document.getElementById("loigia_gio_tiep_theo").innerHTML = "Giá giờ tiếp theo là số lớn hơn 0!";
            return false;
        }
    }

    const kTgiatheongay = () => {
        var gia_theo_ngay = document.getElementById("gia_theo_ngay").value;
        var reggiatheongay = /^[0-9]{1,}$/;
        if (reggiatheongay.test(gia_theo_ngay) && parseInt(gia_theo_ngay) > 0) {
            document.getElementById("loigia_theo_ngay").innerHTML = "*";
            return true;
        }
        else {
            if (gia_theo_ngay == "") {
                document.getElementById("loigia_theo_ngay").innerHTML = "Bạn chưa nhập giá theo ngày phòng!";
                return false;
            }
            document.getElementById("loigia_theo_ngay").innerHTML = "Giá theo ngày là số lớn hơn 0!";
            return false;
        }
    }

    const kTgiodau = () => {
        var gio_dau = document.getElementById("gio_dau").value;
        var reggiodau = /^[0-9]{1,}$/;
        if (reggiodau.test(gio_dau) && parseInt(gio_dau) > 0) {
            document.getElementById("loigio_dau").innerHTML = "*";
            return true;
        }
        else {
            if (gio_dau == "") {
                document.getElementById("loigio_dau").innerHTML = "Bạn chưa nhập giờ đầu phòng!";
                return false;
            }
            document.getElementById("loigio_dau").innerHTML = "Giờ đầu là số lớn hơn 0!";
            return false;
        }
    }

    const kTsogiuong = () => {
        var so_giuong = document.getElementById("so_giuong").value;
        var regso_giuong = /^[0-9]{1,}$/;
        if (regso_giuong.test(so_giuong) && parseInt(so_giuong) > 0) {
            document.getElementById("loiso_giuong").innerHTML = "*";
            return true;
        }
        else {
            if (so_giuong == "") {
                document.getElementById("loiso_giuong").innerHTML = "Bạn chưa nhập số giường phòng!";
                return false;
            }
            document.getElementById("loiso_giuong").innerHTML = "Số giường là số lớn hơn 0!";
            return false;
        }
    }

    const doiHinh = (e) => {
        let hinh = e.target.files[0]
        if (hinh != null) {
            setHinh(hinh)
            setDuongDanHinh(URL.createObjectURL(hinh))
        }
        else {
            setHinh(null)
            setDuongDanHinh('')
        }
    }

    const luuHinhVaoFirebase = async () => {
        const storageRef = ref(storage, 'img/' + hinh.name);
        await uploadBytes(storageRef, hinh, { contentType: hinh.type }).then((snapshot) => {
            console.log('Đã upload firebase!');
        });
        getDownloadURL(storageRef)
            .then(async (url) => {
                try {
                    await axios.post('http://localhost:8080/rooms', {
                        maPhong: maPhong,
                        trangThaiPhong: trangThai,
                        soGiuong: soGiuong,
                        dienTich: dienTich,
                        sucChua: sucChua,
                        gioDau: gioDau,
                        giaGioDau: giaGioDau,
                        giaGioTiepTheo: giaGioTiepTheo,
                        giaTheoNgay: giaTheoNgay,
                        duongDanHinh: url,
                        loaiPhong: { 'maLoaiPhong': maLoaiPhong },
                        tang: { 'maTang': maTang }
                    })
                    dongModalPhong()
                    setTaiLai(true)
                } catch (error) {
                    console.log(error.message);
                }
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            });
    }

    const luu = async () => {
        if (kTdientich() && kTgiagiodau() && kTgiagiotieptheo() && kTgiatheongay() && kTgiodau() && kTsogiuong()) {
            if (hinh != null) {
                await luuHinhVaoFirebase()
            }
            else {
                try {
                    await axios.post('http://localhost:8080/rooms', {
                        maPhong: maPhong,
                        trangThaiPhong: trangThai,
                        soGiuong: soGiuong,
                        dienTich: dienTich,
                        sucChua: sucChua,
                        duongDanHinh: duongDanHinh,
                        gioDau: gioDau,
                        giaGioDau: giaGioDau,
                        giaGioTiepTheo: giaGioTiepTheo,
                        giaTheoNgay: giaTheoNgay,
                        loaiPhong: { 'maLoaiPhong': maLoaiPhong },
                        tang: { 'maTang': maTang }
                    })
                    dongModalPhong()
                    setTaiLai(true)
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
    }

    useEffect(() => {

        async function layDuLieu() {
            try {
                let res1 = await axios.get('http://localhost:8080/rooms')
                setDSPhong(res1.data)
                let res2 = await axios.get('http://localhost:8080/room_categories')
                let dsLoaiPhong = res2.data
                setDSLoaiPhong(dsLoaiPhong)
                setMaLoaiPhong(dsLoaiPhong[0].maLoaiPhong)
                let res3 = await axios.get('http://localhost:8080/floor')
                let dsTang = res3.data
                setDSTang(dsTang)
                setMaTang(dsTang[0].maTang)
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
                <input type="button" className='btn btn-primary col-2' value='THÊM PHÒNG' onClick={them} />

                <Modal show={hienModalPhong} onHide={dongModalPhong} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>PHÒNG</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="row">
                                <div className="row" style={{ marginLeft: '20%', marginBottom: '2%' }}>
                                    <img src={duongDanHinh} alt="" style={{ width: '60%' }} />
                                </div>
                                <label htmlFor='hinh' className="col-4 form-label">Chọn hình</label>
                                <input type='file' className="col form-control" id='hinh' onChange={e => doiHinh(e)} />
                            </div>
                            {anMaPhong == false && <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='ma_phong' className="form-label col-4">Nhập mã phòng</label>
                                <input type='text' className="form-control col" placeholder='Nhập mã phòng' id='ma_phong' value={maPhong} onChange={event => setMaPhong(event.target.value)} />
                            </div>}
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='loai_phong' className="form-label col-4">Chọn loại phòng</label>
                                <select className="form-select col" id='loai_phong' value={maLoaiPhong} onChange={event => setMaLoaiPhong(event.target.value)}>
                                    {dsLoaiPhong.map((loaiPhong) =>
                                        <option key={loaiPhong.maLoaiPhong} value={loaiPhong.maLoaiPhong}>{loaiPhong.ten}</option>
                                    )}
                                </select>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='tang' className="form-label col-4">Chọn tầng</label>
                                <select className="form-select col" id='tang' value={maTang} onChange={event => setMaTang(event.target.value)}>
                                    {dsTang.map((tang) =>
                                        <option key={tang.maTang} value={tang.maTang}>{tang.tenTang}</option>
                                    )}
                                </select>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='trang_thai' className="form-label col-4">Chọn trạng thái</label>
                                <select className="form-select col" id='trang_thai' value={trangThai} onChange={event => setTrangThai(event.target.value)}>
                                    <option value="Trống">Trống</option>
                                    <option value="Đã đặt">Đã đặt</option>
                                    <option value="Đã nhận">Đã nhận</option>
                                    <option value="Chưa dọn dẹp">Chưa dọn dẹp</option>
                                </select>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='so_giuong' className="form-label col-4">Nhập số giường</label>
                                <input type='number' className="form-control col" placeholder='Nhập số giường' id='so_giuong' value={soGiuong} onChange={event => setSoGiuong(event.target.value)} onBlur={e => kTsogiuong()} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loiso_giuong'>*</p>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='dien_tich' className="form-label col-4">Nhập diện tích</label>
                                <input type='number' className="form-control col" placeholder='Nhập diện tích' id='dien_tich' value={dienTich} onChange={event => setDienTich(event.target.value)} onBlur={e => kTdientich()} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loidien_tich'>*</p>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='suc_chua' className="form-label col-4">Nhập sức chứa</label>
                                <input type='number' className="form-control col" placeholder='Nhập sức chứa' id='suc_chua' value={sucChua} onChange={event => setSucChua(event.target.value)} />
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='gio_dau' className="form-label col-4">Nhập giờ đầu</label>
                                <input type='number' className="form-control col" placeholder='Nhập giờ đầu' id='gio_dau' value={gioDau} onChange={event => setGioDau(event.target.value)} onBlur={e => kTgiodau()} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loigio_dau'>*</p>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='gia_gio_dau' className="form-label col-4">Nhập giá giờ đầu</label>
                                <input type='number' className="form-control col" placeholder='Nhập giá giờ đầu' id='gia_gio_dau' value={giaGioDau} onChange={event => setGiaGioDau(event.target.value)} onBlur={e => kTgiagiodau()} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loigia_gio_dau'>*</p>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='gia_gio_tiep_theo' className="form-label col-4">Nhập giá giờ tiếp theo</label>
                                <input type='number' className="form-control col" placeholder='Nhập giá giờ tiếp theo' id='gia_gio_tiep_theo' value={giaGioTiepTheo} onChange={event => setGiaGioTiepTheo(event.target.value)} onBlur={e => kTgiagiotieptheo()} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loigia_gio_tiep_theo'>*</p>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='gia_theo_ngay' className="form-label col-4">Nhập giá theo ngày</label>
                                <input type='number' className="form-control col" placeholder='Nhập giá theo ngày' id='gia_theo_ngay' value={giaTheoNgay} onChange={event => setGiaTheoNgay(event.target.value)} onBlur={e => kTgiatheongay()} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loigia_theo_ngay'>*</p>
                            </div>
                            <input type='button' value='LƯU' className='btn btn-primary' style={{ marginLeft: '40%', marginTop: '3%', width: '20%' }} onClick={luu} />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' className="btn btn-danger" onClick={dongModalPhong}>
                            Đóng
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <div className="col input-group">
                    <span className="input-group-text">Nhập mã</span>
                    <input type='text' className="form-control" placeholder="Nhập mã" onChange={e => setMaPhong(e.target.value)} />
                    <button className="btn btn-success" type="button" onClick={tim}><GoSearch /></button>
                    <button className="btn btn-warning" type="button" onClick={e => setTaiLai(true)}><FiRefreshCw /></button>
                </div>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <table className="table table-hover">
                    <thead className="table-info">
                        <tr>
                            <th>Mã phòng</th>
                            <th>Hình</th>
                            <th>Trạng thái</th>
                            <th>Số giường</th>
                            <th>Diện tích</th>
                            <th>Giờ đầu</th>
                            <th>Giá giờ đầu</th>
                            <th>Giá giờ tiếp theo</th>
                            <th>Giá theo ngày</th>
                            <th>Loại phòng</th>
                            <th>Tầng</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsPhong.length > 0 && dsPhong.map((phong) =>
                            <tr key={phong.maPhong}>
                                <td>{phong.maPhong}</td>
                                <td style={{ width: '24%' }}><img src={phong.duongDanHinh} alt="" width='100%' height='100%' /></td>
                                <td>{phong.trangThaiPhong}</td>
                                <td>{phong.soGiuong}</td>
                                <td>{phong.dienTich}</td>
                                <td>{phong.gioDau}</td>
                                <td>{phong.giaGioDau.toLocaleString({ style: "currency", currency: "vnd" })}</td>
                                <td>{phong.giaGioTiepTheo.toLocaleString({ style: "currency", currency: "vnd" })}</td>
                                <td>{phong.giaTheoNgay.toLocaleString({ style: "currency", currency: "vnd" })}</td>
                                <td>{phong.loaiPhong.ten}</td>
                                <td>{phong.tang.tenTang}</td>
                                <td>
                                    <input type="button" className="btn btn-warning" value="CẬP NHẬT" onClick={e => capNhat(phong)} /> | &nbsp;
                                    <input type="button" className="btn btn-danger" value="XOÁ" onClick={e => xoa(phong)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}