import React, { useState } from "react"
import { useParams } from "react-router-dom";
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function ProfileForm() {

    let params = useParams();
    let id = params.id
    const [name, setName] = useState(params.name)

    const save = async () => {
        try {
            const res = await axios.post('http://localhost:8080/room_categories', {
                idRoomCategory: id,
                name: name,
            })
            console.log(res.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div style={{marginTop: '2%'}}>
                <form>
                    <div className="row">
                        <label htmlFor='name' className="form-label col-2">Nhập họ và tên</label>
                        <input type='text' className="form-control col" placeholder='Nhập họ và tên' id='name' value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <div className="row" style={{marginTop: '2%'}}>
                        <label htmlFor='address' className="form-label col-2">Nhập địa chỉ</label>
                        <input type='text' className="form-control col" placeholder='Nhập địa chỉ' id='address' value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <div className="row" style={{marginTop: '2%'}}>
                        <label htmlFor='phoneNumber' className="form-label col-2">Nhập số điện thoại</label>
                        <input type='number' className="form-control col" placeholder='Nhập số điện thoại' id='phoneNumber' value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <div className="row" style={{marginTop: '2%'}}>
                        <label htmlFor='cardIdNumber' className="form-label col-2">Nhập số CMND/CCCD</label>
                        <input type='number' className="form-control col" placeholder='Nhập số CMND/CCCD' id='cardIdNumber' value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <div className="row" style={{marginTop: '2%'}}>
                        <label htmlFor='picture' className="form-label col-2">Chọn hình</label>
                        <input type='file' className="form-control col" id='picture' value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <input type='button' value='LƯU' className='btn btn-primary' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={save} />
                </form>
            </div>
        </div>
    )
}