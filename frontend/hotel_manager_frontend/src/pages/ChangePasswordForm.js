import React, { useState } from "react"
import { useParams } from "react-router-dom";
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function ChangePasswordForm() {

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
                        <label htmlFor='passwordOld' className="form-label col-2">Nhập mật khẩu hiện tại</label>
                        <input type='password' className="form-control col" placeholder='Nhập mật khẩu hiện tại' id='passwordOld' value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <div className="row" style={{marginTop: '2%'}}>
                        <label htmlFor='passwordNew' className="form-label col-2">Nhập mật khẩu mới</label>
                        <input type='password' className="form-control col" placeholder='Nhập mật khẩu mới' id='passwordNew' value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <div className="row" style={{marginTop: '2%'}}>
                        <label htmlFor='passwordAgain' className="form-label col-2">Nhập lại mật khẩu mới</label>
                        <input type='password' className="form-control col" placeholder='Nhập lại mật khẩu mới' id='passwordAgain' value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <input type='button' value='LƯU' className='btn btn-primary' style={{ marginLeft: '40%', marginTop: '5%', width: '20%' }} onClick={save} />
                </form>
            </div>
        </div>
    )
}