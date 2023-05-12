import React, { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function QuanLiNhanVien() {

    const [maNV, setMaNV] = useState(0)
    const [tenNV, setTenNV] = useState('')
    const [gioiTinh, setGioiTinh] = useState('Nam')
    const [diaChi, setDiaChi] = useState('')
    const [soCMND, setSoCMND] = useState('')
    const [sDT, setSDT] = useState('')
    const [hinh, setHinh] = useState(null)
    const [duongDanHinh, setDuongDanHinh] = useState('')
    const [maCV, setMaCV] = useState(0)
    const [matKhau, setMatKhau] = useState('12345678')
    const [taiLai, setTaiLai] = useState(true)
    const [dsNV, setDSNV] = useState([])
    const [hienModalNV, setHienModalNV] = useState(false)
    const [dsCV, setDSCV] = useState([])
    const [maQuyen, setMaQuyen] = useState('1')
    const storage = getStorage();

    const khoiPhucMacDinh = () => {
        setMaNV(0)
        setTenNV('')
        setGioiTinh('Nam')
        setDiaChi('')
        setSoCMND('')
        setSDT('')
        setHinh(null)
        setDuongDanHinh('')
        setMatKhau('12345678')
    }

    const capNhat = (nv) => {
        setMaNV(nv.maNV)
        setTenNV(nv.tenNV)
        setGioiTinh(nv.gioiTinh)
        setDiaChi(nv.diaChi)
        setSoCMND(nv.soCMND)
        setSDT(nv.sDT)
        setDuongDanHinh(nv.duongDanHinh)
        setMaCV(nv.chucVu.maCV)
        setMaQuyen(nv.taiKhoan.quyen.maQuyen)
        setMatKhau(nv.taiKhoan.matKhau)
        moModalNV()
    }

    const xoa = async (nv) => {
        if (!(window.confirm('Bạn có chắc muốn xoá?')))
            return false
        try {
            await axios.delete('http://localhost:8080/employees/' + nv.maNV)
            const desertRef = ref(storage, nv.duongDanHinh);
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

    const dongModalNV = () => {
        khoiPhucMacDinh()
        setHienModalNV(false)
    }

    const moModalNV = () => setHienModalNV(true)

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
                    let res1
                    res1 = await axios.post('http://localhost:8080/tai_khoan', {
                        maTK: maNV,
                        tenDangNhap: sDT,
                        matKhau: '12345678',
                        quyen: {
                            maQuyen: parseInt(maQuyen)
                        }
                    })
                    let taiKhoan = res1.data
                    if (maNV != taiKhoan.maTK)
                        await axios.post('http://localhost:8080/employees', {
                            taiKhoan: {
                                maTK: taiKhoan.maTK
                            },
                            tenNV: tenNV,
                            gioiTinh: gioiTinh,
                            duongDanHinh: url,
                            diaChi: diaChi,
                            soCMND: soCMND,
                            sDT: sDT,
                            chucVu: { 'maCV': maCV }
                        })
                    else
                        await axios.post('http://localhost:8080/employees', {
                            maNV: taiKhoan.maTK,
                            taiKhoan: {
                                maTK: taiKhoan.maTK
                            },
                            tenNV: tenNV,
                            gioiTinh: gioiTinh,
                            duongDanHinh: url,
                            diaChi: diaChi,
                            soCMND: soCMND,
                            sDT: sDT,
                            chucVu: { 'maCV': maCV }
                        })
                    dongModalNV()
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
        document.getElementById("loiso_cmnd").innerHTML = "Chứng minh nhân dân phải là 9 hoặc 12 số!";
        return false;
    }

    const kttenNV = () => {
        var ten_nv = document.getElementById("ten_nv").value;
        if (ten_nv == '') {
            document.getElementById("loiten_nv").innerHTML = "Tên nhân viên không được để trống";
            return false;
        }
        document.getElementById('loiten_nv').innerHTML = '*';
        return true;
    }

    const luu = async () => {
        if (ktdiachi() && kttenNV() && kTsdt() && kTso_cmnd()) {
            if (hinh != null) {
                await luuHinhVaoFirebase()
            }
            else {
                try {
                    let res1
                    res1 = await axios.post('http://localhost:8080/tai_khoan', {
                        maTK: maNV,
                        tenDangNhap: sDT,
                        matKhau: '12345678',
                        quyen: {
                            maQuyen: parseInt(maQuyen)
                        }
                    })
                    let taiKhoan = res1.data
                    if (maNV != taiKhoan.maTK)
                        await axios.post('http://localhost:8080/employees', {
                            taiKhoan: {
                                maTK: taiKhoan.maTK
                            },
                            tenNV: tenNV,
                            gioiTinh: gioiTinh,
                            duongDanHinh: duongDanHinh,
                            diaChi: diaChi,
                            soCMND: soCMND,
                            sDT: sDT,
                            chucVu: { 'maCV': maCV }
                        })
                    else
                        await axios.post('http://localhost:8080/employees', {
                            maNV: taiKhoan.maTK,
                            taiKhoan: {
                                maTK: taiKhoan.maTK
                            },
                            tenNV: tenNV,
                            gioiTinh: gioiTinh,
                            duongDanHinh: duongDanHinh,
                            diaChi: diaChi,
                            soCMND: soCMND,
                            sDT: sDT,
                            chucVu: { 'maCV': maCV }
                        })
                    dongModalNV()
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
                let res1 = await axios.get('http://localhost:8080/employees')
                setDSNV(res1.data)
                let res2 = await axios.get('http://localhost:8080/positions')
                let dsCV = res2.data
                setDSCV(dsCV)
                setMaCV(dsCV[0].maCV)
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
                <input type="button" className='btn btn-primary col-2' value='THÊM NHÂN VIÊN' onClick={moModalNV} />

                <Modal show={hienModalNV} onHide={dongModalNV} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>NHÂN VIÊN</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="row">
                                <div className="row" style={{ marginLeft: '30%', marginBottom: '2%' }}>
                                    <img src={duongDanHinh} alt="" style={{ width: '30%' }} />
                                </div>
                                <label htmlFor='hinh' className="col-4 form-label">Chọn hình</label>
                                <input type='file' className="col form-control" id='hinh' onChange={e => doiHinh(e)} />
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='ten_nv' className="form-label col-4">Nhập tên nhân viên</label>
                                <input type='text' className="form-control col" id='ten_nv' placeholder="Nhập tên nhân viên" value={tenNV} onChange={event => setTenNV(event.target.value)} onBlur={e => kttenNV()} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loiten_nv'>*</p>
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
                                <input type='text' className="form-control col" placeholder='Nhập địa chỉ' id='dia_chi' value={diaChi} onChange={event => setDiaChi(event.target.value)} onBlur={e => ktdiachi()} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loidia_chi'>*</p>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='so_cmnd' className="form-label col-4">Nhập số CMND/CCCD</label>
                                <input type='number' className="form-control col" placeholder='Nhập số CMND/CCCD' id='so_cmnd' value={soCMND} onChange={event => setSoCMND(event.target.value)} onBlur={e => kTso_cmnd()} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loiso_cmnd'>*</p>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='sdt' className="form-label col-4">Nhập số điện thoại</label>
                                <input type='text' className="form-control col" id='sdt' placeholder="Nhập số điện thoại" value={sDT} onChange={event => setSDT(event.target.value)} onBlur={e => kTsdt()} />
                            </div>
                            <div className="row" style={{ marginTop: '1%' }}>
                                <p style={{ color: 'red' }} id='loisdt'>*</p>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='chuc_vu' className="form-label col-4">Chọn chức vụ</label>
                                <select className="form-select col" id='chuc_vu' value={maCV} onChange={event => setMaCV(event.target.value)}>
                                    {dsCV.map(cv =>
                                        <option key={cv.maCV} value={cv.maCV}>{cv.tenCV}</option>
                                    )}
                                </select>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <label htmlFor='quyen' className="form-label col-4">Chọn quyền</label>
                                <select className="form-select col" id='quyen' value={maQuyen} onChange={event => setMaQuyen(event.target.value)}>
                                    <option value='1'>Quản lý</option>
                                    <option value='2'>Lễ tân</option>
                                </select>
                            </div>
                            <input type='button' value='LƯU' className='btn btn-primary' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={luu} />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' className="btn btn-danger" onClick={dongModalNV}>
                            Đóng
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="row" style={{ marginTop: '2%' }}>
                <table className="table table-hover">
                    <thead className="table-info">
                        <tr>
                            <th>Hình</th>
                            <th>Mã nhân viên</th>
                            <th>Tên nhân viên</th>
                            <th>Địa chỉ</th>
                            <th>Số CMND/CCCD</th>
                            <th>Số điện thoại</th>
                            <th>Chức vụ</th>
                            <th>Quyền</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsNV.map((nv) =>
                            <tr key={nv.maNV}>
                                <td style={{ width: '10%' }}><img src={nv.duongDanHinh} width='100%' height='100%' /></td>
                                <td>{nv.maNV}</td>
                                <td>{nv.tenNV}</td>
                                <td>{nv.diaChi}</td>
                                <td>{nv.soCMND}</td>
                                <td>{nv.sDT}</td>
                                <td>{nv.chucVu.tenCV}</td>
                                <td>{nv.taiKhoan.quyen.tenQuyen}</td>
                                <td>
                                    <input type="button" className="btn btn-warning" value="CẬP NHẬT" onClick={e => capNhat(nv)} /> | &nbsp;
                                    <input type="button" className="btn btn-danger" value="XOÁ" onClick={e => xoa(nv)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}