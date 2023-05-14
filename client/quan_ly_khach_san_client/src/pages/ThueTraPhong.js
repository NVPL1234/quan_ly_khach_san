import React, { useEffect } from "react"
import { createSearchParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function ThueTraPhong() {

    const navigate = useNavigate();

    // const pay = () => {
    //     navigate({
    //         pathname: "/billForm",
    //         search: createSearchParams({
    //             name: rooms[i].idRoom,
    //             invoiceDate: rooms[i].roomCategory.idRoomCategory,
    //             checkoutDate: rooms[i].describe,
    //             rentType: rooms[i].status,
    //             room: rooms[i].price.idPrice,
    //             hoursFirst,
    //             priceHoursFirst,
    //             priceForDay,
    //             priceForNight,
    //             surcharge
    //         }).toString()
    //     });
    // }

    useEffect(() => {

        var roomCategories = null

        async function getData() {
            try {
                var res = await axios.get('http://localhost:8080/room_categories')
                roomCategories = res.data
                addRoomCategoriesToTable(roomCategories)
            } catch (error) {
                console.log(error.message);
            }
        }

        function addRoomCategoriesToTable(roomCategories) {
            var tbody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
            for (let i = 0; i < roomCategories.length; i++) {

                var newRow = tbody.insertRow();

                var idRoomCategoryCell = newRow.insertCell();
                var nameCell = newRow.insertCell();
                var functionCell = newRow.insertCell();

                var idRoomCategory = document.createTextNode(roomCategories[i].idRoomCategory);
                idRoomCategoryCell.appendChild(idRoomCategory);
                var name = document.createTextNode(roomCategories[i].name);
                nameCell.appendChild(name);
                var aUpdate = document.createElement('a')
                aUpdate.href = '/roomCategoryForm/' + roomCategories[i].idRoomCategory + '/' + roomCategories[i].name
                aUpdate.innerHTML = 'Cập nhật'
                functionCell.appendChild(aUpdate);
                functionCell.appendChild(document.createTextNode(' | '))
                var btnDelete = document.createElement('button')
                btnDelete.innerHTML = 'Xoá'
                btnDelete.addEventListener('click', async function () {
                    try {
                        var res = await axios.delete('http://localhost:8080/room_categories/' + roomCategories[i].idRoomCategory)
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
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div style={{ marginTop: '2%' }}>
                <h5>DANH SÁCH PHÒNG ĐẶT TRƯỚC</h5>
                <div className="row" style={{ marginBottom: '2%', marginTop: '2%' }}>
                    <input type="number" className="form-control col" placeholder="Nhập số CMND/CCCD cần tìm..." onKeyUp={e => { if (e.key == 'Enter') alert(e.target.value) }} />
                    <input type="text" className="form-control col" placeholder="Nhập số điện thoại cần tìm..." onKeyUp={e => { if (e.key == 'Enter') alert(e.target.value) }} />
                </div>
                <table id="myTable" className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Mã phòng</th>
                            <th>Loại phòng</th>
                            <th>Trạng thái</th>
                            <th>Số giường</th>
                            <th>Mô tả</th>
                            <th>Giờ đầu</th>
                            <th>Giá giờ đầu</th>
                            <th>Giá theo ngày</th>
                            <th>Giá theo đêm</th>
                            <th>Phụ thu</th>
                            <th>Mã khách hàng</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>VIP</td>
                            <td>Đã được đặt</td>
                            <td>2</td>
                            <td>VIP</td>
                            <td>2</td>
                            <td>200000</td>
                            <td>100000</td>
                            <td>300000</td>
                            <td>100000</td>
                            <td>1</td>
                            <td><Link className='btn btn-primary'>NHẬN PHÒNG</Link></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Thường</td>
                            <td>Đã được đặt</td>
                            <td>2</td>
                            <td>Thường</td>
                            <td>2</td>
                            <td>300000</td>
                            <td>100000</td>
                            <td>300000</td>
                            <td>100000</td>
                            <td>2</td>
                            <td><Link className='btn btn-primary'>NHẬN PHÒNG</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: '5%' }}>
                <h5>DANH SÁCH PHÒNG TRỐNG</h5>
                <table id="myTable" className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Mã phòng</th>
                            <th>Loại phòng</th>
                            <th>Trạng thái</th>
                            <th>Số giường</th>
                            <th>Mô tả</th>
                            <th>Giờ đầu</th>
                            <th>Giá giờ đầu</th>
                            <th>Giá theo ngày</th>
                            <th>Giá theo đêm</th>
                            <th>Phụ thu</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3</td>
                            <td>VIP</td>
                            <td>Trống</td>
                            <td>2</td>
                            <td>VIP</td>
                            <td>2</td>
                            <td>200000</td>
                            <td>100000</td>
                            <td>300000</td>
                            <td>100000</td>
                            <td><Link to='/nv/form_phieu_dat_phong' className='btn btn-primary'>ĐẶT PHÒNG</Link></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Thường</td>
                            <td>Trống</td>
                            <td>2</td>
                            <td>Thường</td>
                            <td>2</td>
                            <td>400000</td>
                            <td>100000</td>
                            <td>300000</td>
                            <td>100000</td>
                            <td><Link to='/roomInvoiceForm' className='btn btn-primary'>ĐẶT PHÒNG</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: '5%' }}>
                <h5>DANH SÁCH PHÒNG ĐANG CHO THUÊ</h5>
                <div className="row" style={{ marginBottom: '2%', marginTop: '2%' }}>
                    <input type="number" className="form-control col" placeholder="Nhập số CMND/CCCD cần tìm..." onKeyUp={e => { if (e.key == 'Enter') alert(e.target.value) }} />
                    <input type="text" className="form-control col" placeholder="Nhập số điện thoại cần tìm..." onKeyUp={e => { if (e.key == 'Enter') alert(e.target.value) }} />
                </div>
                <table id="myTable" className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Mã phòng</th>
                            <th>Loại phòng</th>
                            <th>Trạng thái</th>
                            <th>Số giường</th>
                            <th>Mô tả</th>
                            <th>Giờ đầu</th>
                            <th>Giá giờ đầu</th>
                            <th>Giá theo ngày</th>
                            <th>Giá theo đêm</th>
                            <th>Phụ thu</th>
                            <th>Mã khách hàng</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>6</td>
                            <td>VIP</td>
                            <td>Đang thuê</td>
                            <td>2</td>
                            <td>VIP</td>
                            <td>2</td>
                            <td>200000</td>
                            <td>100000</td>
                            <td>300000</td>
                            <td>100000</td>
                            <td>1</td>
                            <td><Link to='/nv/form_hoa_don' className='btn btn-primary'>THANH TOÁN</Link></td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Thường</td>
                            <td>Đang thuê</td>
                            <td>2</td>
                            <td>Thường</td>
                            <td>1</td>
                            <td>100000</td>
                            <td>100000</td>
                            <td>300000</td>
                            <td>100000</td>
                            <td>2</td>
                            <td><Link to='/billForm' className='btn btn-primary'>THANH TOÁN</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: '5%' }}>
                <h5>DANH SÁCH PHÒNG CHƯA DỌN VỆ SINH</h5>
                <table id="myTable" className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Mã phòng</th>
                            <th>Loại phòng</th>
                            <th>Trạng thái</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>8</td>
                            <td>VIP</td>
                            <td>Chưa dọn dẹp</td>
                            <td><Link className='btn btn-primary'>DỌN DẸP</Link></td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>Thường</td>
                            <td>Chưa dọn dẹp</td>
                            <td><Link className='btn btn-primary'>DỌN DẸP</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}