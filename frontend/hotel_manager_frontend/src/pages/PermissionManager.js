import React, { useEffect } from "react"
import { createSearchParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function PermissionManager() {

    const navigate = useNavigate();

    useEffect(() => {

        var rooms = null

        async function getData() {
            try {
                var res = await axios.get('http://localhost:8080/rooms')
                rooms = res.data
                addRoomsToTable(rooms)
            } catch (error) {
                console.log(error.message);
            }
        }

        function addRoomsToTable(rooms) {
            var tbody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
            for (let i = 0; i < rooms.length; i++) {

                var newRow = tbody.insertRow();

                var idRoomCell = newRow.insertCell();
                var roomCategoryCell = newRow.insertCell();
                var describeCell = newRow.insertCell();
                var statusCell = newRow.insertCell();
                var priceCell = newRow.insertCell();
                var functionCell = newRow.insertCell();

                var idRoom = document.createTextNode(rooms[i].idRoom);
                idRoomCell.appendChild(idRoom);
                var roomCategory = document.createTextNode(rooms[i].roomCategory.name);
                roomCategoryCell.appendChild(roomCategory);
                var describe = document.createTextNode(rooms[i].describe);
                describeCell.appendChild(describe);
                var status = document.createTextNode(rooms[i].status);
                statusCell.appendChild(status);
                var price = document.createTextNode(rooms[i].price.name);
                priceCell.appendChild(price);
                var btnUpdate = document.createElement('button')
                btnUpdate.innerHTML = 'Cập nhật'
                btnUpdate.addEventListener('click', function () {
                    navigate({
                        pathname: "/roomForm",
                        search: createSearchParams({
                            idRoom: rooms[i].idRoom,
                            idRoomCategory: rooms[i].roomCategory.idRoomCategory,
                            describe: rooms[i].describe,
                            status: rooms[i].status,
                            idPrice: rooms[i].price.idPrice
                        }).toString()
                    });
                })
                functionCell.appendChild(btnUpdate);
                functionCell.appendChild(document.createTextNode(' | '))
                var btnDelete = document.createElement('button')
                btnDelete.innerHTML = 'Xoá'
                btnDelete.addEventListener('click', async function () {
                    try {
                        var res = await axios.delete('http://localhost:8080/rooms/' + rooms[i].idRoom)
                        console.log(res.data);
                        window.location.reload()
                    } catch (error) {
                        console.log(error.message);
                    }
                })
                functionCell.appendChild(btnDelete);
            }
        }

        getData()
    }, [])

    return (
        <div>
            <div>
                <Nav />
            </div>
            <div>
                <Link to="/employeeForm">Thêm quyền</Link>
            </div>
            <div>
                <table id="myTable">
                    <thead>
                        <tr>
                            <th>Mã quyền</th>
                            <th>Tên quyền</th>
                            <th>Địa chỉ</th>
                            <th>Số CMND/CCCD</th>
                            <th>Số điện thoại</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
}