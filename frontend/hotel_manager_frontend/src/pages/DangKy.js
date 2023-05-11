import React, { useState } from 'react'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app, auth } from '../config'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function DangKy() {

  const [tenKH, setTenKH] = useState('')
  const [diaChi, setDiaChi] = useState('')
  const [soCMND, setSoCMND] = useState('')
  const [sDT, setSDT] = useState('')
  const [matKhau, setMatKhau] = useState('')
  const [matKhauLapLai, setMatKhauLapLai] = useState('')

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

  let setupRecapcha = () => {

    console.log('register')

    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log('callback')
        this.dangKy();
      }
    }, auth);
  }

  let luu = async () => {
    if (ktdiachi() && kttenkhachhang() && kTsdt() && kTso_cmnd()) {
      try {
        let res = await axios.post('http://localhost:8080/register', {
          tenDangNhap: sDT,
          matKhau: matKhau,
        })
        let maTK = res.data.maTK
        await axios.post('http://localhost:8080/customers', {
          tenKH: tenKH,
          diaChi: diaChi,
          soCMND: soCMND,
          sDT: sDT,
          taiKhoan: {
            maTK: maTK
          }
        })
        await axios.post('http://localhost:8080/tk_quyen', {
          taiKhoan: {
            maTK: maTK
          },
          quyen: {
            maQuyen: 1
          }
        })
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  let dangKy = (event) => {

    event.preventDefault()

    setupRecapcha()

    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();

    let sdt = '+84' + sDT.slice(1,10)

    signInWithPhoneNumber(auth, sdt, appVerifier)
      .then((confirmationResult) => {
        console.log(sdt);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;

        const code = window.prompt("Nhập OTP: ")
        confirmationResult.confirm(code).then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log('Thành công!')
          // document.getElementById('messeage').style.visibility = "visible";
          luu()
          // ...
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error)
        });
        // ...
      }).catch((error) => {
        console.log(sdt);
        // Error; SMS not sent
        // ...
        console.log(error)
      });
  }

  return (
    <div className="container-fluid" style={{ marginTop: '2%' }}>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>ĐĂNG KÝ</h1>
      <div>
        <form action='#'>
          <div className="row">
            <label htmlFor='ten_kh' className="form-label col-2">Nhập tên khách hàng</label>
            <input type='text' className="form-control col" id='ten_kh' placeholder="Nhập tên khách hàng" value={tenKH} onChange={event => setTenKH(event.target.value)} onBlur={e => { kttenkhachhang() }} />
          </div>
          <div className="row" style={{ marginTop: '1%' }}>
            <p style={{ color: 'red' }} id='loiten_kh'>*</p>
          </div>
          <div className="row" style={{ marginTop: '2%' }}>
            <label htmlFor='dia_chi' className="form-label col-2">Nhập địa chỉ</label>
            <input type='text' className="form-control col" placeholder='Nhập địa chỉ' id='dia_chi' value={diaChi} onChange={event => setDiaChi(event.target.value)} onBlur={e => { ktdiachi() }} />
          </div>
          <div className="row" style={{ marginTop: '1%' }}>
            <p style={{ color: 'red' }} id='loidia_chi'>*</p>
          </div>
          <div className="row" style={{ marginTop: '2%' }}>
            <label htmlFor='so_cmnd' className="form-label col-2">Nhập số CMND/CCCD</label>
            <input type='number' className="form-control col" placeholder='Nhập số CMND/CCCD' id='so_cmnd' value={soCMND} onChange={event => setSoCMND(event.target.value)} onBlur={e => { kTso_cmnd() }} />
          </div>
          <div className="row" style={{ marginTop: '1%' }}>
            <p style={{ color: 'red' }} id='loiso_cmnd'>*</p>
          </div>
          <div className="row" style={{ marginTop: '2%' }}>
            <label htmlFor='sdt' className="form-label col-2">Nhập số điện thoại</label>
            <input type='number' className="form-control col" id='sdt' placeholder="Nhập số điện thoại" value={sDT} onChange={event => setSDT(event.target.value)} onBlur={e => kTsdt()} />
          </div>
          <div id="sign-in-button"></div>
          <div className="row" style={{ marginTop: '1%' }}>
            <p style={{ color: 'red' }} id='loisdt'>*</p>
          </div>

          <label for='mat-khau' className="form-label">Nhập mật khẩu</label>
          <input type='password' className="form-control" placeholder='Nhập mật khẩu' id='mat-khau' name='mat-khau' onChange={event => setMatKhau(event.target.value)} />

          <label for='mat-khau-lap-lai' className="form-label">Nhập lại mật khẩu</label>
          <input type='password' className="form-control" placeholder='Nhập mật khẩu' id='mat-khau-lap-lai' name='mat-khau-lap-lai' onChange={event => setMatKhauLapLai(event.target.value)} />

          <input type='button' value='ĐĂNG KÝ' className='btn btn-primary' style={{ marginLeft: '47%', marginTop: '5%' }} onClick={dangKy} />
        </form>
      </div>
    </div>
  );
}
