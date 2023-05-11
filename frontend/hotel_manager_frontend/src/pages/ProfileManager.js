import React, { useEffect } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function ProfileManager() {

    // useEffect(() => {

    //     var roomCategories = null

    //     async function getData() {
    //         try {
    //             var res = await axios.get('http://localhost:8080/room_categories')
    //             roomCategories = res.data
    //             addRoomCategoriesToTable(roomCategories)
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     }

    //     function addRoomCategoriesToTable(roomCategories) {
    //         var tbody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    //         for (let i = 0; i < roomCategories.length; i++) {

    //             var newRow = tbody.insertRow();

    //             var idRoomCategoryCell = newRow.insertCell();
    //             var nameCell = newRow.insertCell();
    //             var functionCell = newRow.insertCell();

    //             var idRoomCategory = document.createTextNode(roomCategories[i].idRoomCategory);
    //             idRoomCategoryCell.appendChild(idRoomCategory);
    //             var name = document.createTextNode(roomCategories[i].name);
    //             nameCell.appendChild(name);
    //             var aUpdate = document.createElement('a')
    //             aUpdate.href = '/roomCategoryForm/' + roomCategories[i].idRoomCategory + '/' + roomCategories[i].name
    //             aUpdate.innerHTML = 'Cập nhật'
    //             functionCell.appendChild(aUpdate);
    //             functionCell.appendChild(document.createTextNode(' | '))
    //             var btnDelete = document.createElement('button')
    //             btnDelete.innerHTML = 'Xoá'
    //             btnDelete.addEventListener('click', async function () {
    //                 try {
    //                     var res = await axios.delete('http://localhost:8080/room_categories/' + roomCategories[i].idRoomCategory)
    //                     console.log(res.data);
    //                     window.location.reload()
    //                 } catch (error) {
    //                     console.log(error.message);
    //                 }
    //             })
    //             functionCell.appendChild(btnDelete);
    //         }
    //     }

    //     getData()
    // }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div style={{textAlign: 'center', marginTop: '5%'}}>
                <img src={'https://res.cloudinary.com/dffvo3nnd/image/upload/v1678013457/6386976_ht8v3e.png'} alt="" style={{width: 70, height:70, marginBottom: '2%'}}/>
                <h5>Mã: 1</h5>
                <h5>Họ và tên: An</h5>
                <h5>Địa chỉ: HCM</h5>
                <h5>Số điện thoại: 0906953700</h5>
                <h5>Số CMND/CCCD: 301791522</h5>
            </div>
            <div style={{marginTop: '2%', textAlign: 'center'}}>
                <Link className='btn btn-primary' to='/profileForm'>Cập nhật thông tin</Link> | &nbsp;
                <Link className='btn btn-primary' to='/changePasswordForm'>Đổi mật khẩu</Link>
            </div>
        </div>
    )
}