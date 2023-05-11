import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'

export default function FormHoaDon() {

    // const [searchparams] = useSearchParams();
    // const ngayLapHD = searchparams.get("ngayLapHD")  
    // const tenKH = searchparams.get("tenKH")
    // const ngayDatPhong = searchparams.get("ngayDatPhong")
    // const ngayNhanPhong = searchparams.get("ngayNhanPhong")
    // const ngayTraPhong = searchparams.get("ngayTraPhong")  
    // const loaiThue = searchparams.get("loaiThue")
    // const tenPhong = searchparams.get("tenPhong")
    // const tongGioThue = searchparams.get("tongGioThue")
    // const tongNgayThue = searchparams.get("tongNgayThue")
    // const tongDemThue = searchparams.get("tongDemThue")
    // const [soLuongDV, setSoLuongDV] = useState(searchparams.get("soLuongDV"))

    // const save = async () => {
    //     try {
    //         const res = await axios.post('http://localhost:8080/rooms', {
    //             idRoom: idRoom,
    //             roomCategory: { 'idRoomCategory': idRoomCategory },
    //             describe: describe,
    //             status: status,
    //             price: { 'idPrice': idPrice }
    //         })
    //         console.log(res.data)
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    // useEffect(() => {

    //     async function getData() {
    //         try {
    //             const roomCategoriesRes = await axios.get('http://localhost:8080/room_categories')
    //             const pricesRes = await axios.get('http://localhost:8080/prices')
    //             const roomCategories = roomCategoriesRes.data
    //             const prices = pricesRes.data

    //             addOptionRoomCategories(roomCategories)
    //             addOptionPrices(prices)
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     }

    //     function addOptionRoomCategories(roomCategories) {
    //         var select = document.getElementById("room_category");
    //         for (var i = 0; i < roomCategories.length; i++) {
    //             var option = document.createElement("option");
    //             option.text = roomCategories[i].name
    //             option.value = roomCategories[i].idRoomCategory
    //             select.add(option);
    //         }
    //         if (searchparams.get("idRoomCategory") == null)
    //             setIdRoomCategory(roomCategories[0].idRoomCategory)
    //         else
    //             setIdRoomCategory(searchparams.get("idRoomCategory"))
    //     }

    //     function addOptionPrices(prices) {
    //         var select = document.getElementById("price");
    //         for (var i = 0; i < prices.length; i++) {
    //             var option = document.createElement("option");
    //             option.text = prices[i].name
    //             option.value = prices[i].idPrice
    //             select.add(option);
    //         }
    //         if (searchparams.get("idPrice") == null)
    //             setIdPrice(prices[0].idPrice)
    //         else
    //             setIdPrice(searchparams.get("idPrice"))
    //     }

    //     getData()
    // }, [])

    // return (
    //     <div className="container-fluid">
    //         <div className="row">
    //             <Nav />
    //         </div>
    //         <div style={{ marginTop: '2%' }}>
    //             <form>

    //                 <table id="bangHDPhong" className="table table-hover" style={{marginBottom: '5%'}}>
    //                     <thead className="table-dark">
    //                         <tr>
    //                             <th>Ngày lập hoá đơn</th>
    //                             <th>Tên khách hàng</th>
    //                             <th>Ngày đặt phòng</th>
    //                             <th>Ngày trả phòng</th>
    //                             <th>Loại thuê</th>
    //                             <th>Phòng</th>
    //                             <th>Tổng giờ thuê phòng</th>
    //                             <th>Tổng ngày thuê phòng</th>
    //                             <th>Tổng đêm thuê phòng</th>
    //                             <th>Giờ đầu</th>
    //                             <th>Giá giờ đầu</th>
    //                             <th>Giá giờ tiếp theo</th>
    //                             <th>Giá theo ngày</th>
    //                             <th>Giá theo đêm</th>
    //                             <th>Phụ thu</th>
    //                             <th>Thành tiền</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
                          
    //                     </tbody>
    //                 </table>

    //                 <table id="bangHDDV" className="table table-hover">
    //                     <thead className="table-dark">
    //                         <tr>
    //                             <th>Dịch vụ</th>
    //                             <th>Đơn giá</th>
    //                             <th>Số lượng</th>
    //                             <th>Thành tiền</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         <tr>
    //                             <td>Cơm</td>
    //                             <td>100000</td>
    //                             <td><input type="number" className="form-control" placeholder="Nhập số lượng" value={soLuongDV} onChange={e => {setSoLuongDV(e.target.value)}} /></td>
    //                             <td>400000</td>
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //                 <h5>TỔNG TIỀN THANH TOÁN: 600000</h5>

    //                 {/* <label htmlFor='invoiceDate' className="form-label">Nhập ngày lập hoá đơn</label>
    //                 <input type='date' id='invoiceDate' placeholder="Nhập ngày đặt" value={idRoomCategory} onChange={event => setIdRoomCategory(event.target.value)} />

    //                 <label htmlFor='name' className="form-label">Nhập tên khách hàng</label>
    //                 <input type='text' id='name' placeholder="Nhập tên khách hàng" value={idPrice} onChange={event => setIdPrice(event.target.value)} />

    //                 <label htmlFor='invoiceDate' className="form-label">Nhập ngày đặt phòng</label>
    //                 <input type='date' id='invoiceDate' placeholder="Nhập ngày đặt phòng" value={idRoomCategory} onChange={event => setIdRoomCategory(event.target.value)} />

    //                 <label htmlFor='outDate' className="form-label">Nhập ngày trả phòng</label>
    //                 <input type='date' className="form-control" placeholder='Nhập ngày trả phòng' id='outDate' value={describe} />

    //                 <label htmlFor='rentalType' className="form-label">Chọn loại thuê</label>
    //                 <select className="form-control" id='rentalType' value={status} onChange={event => setStatus(event.target.value)}>
    //                     <option value='1'>Thuê theo giờ</option>
    //                     <option value='2'>Thuê theo ngày</option>
    //                     <option value='3'>Thuê theo đêm</option>
    //                 </select>

    //                 <label htmlFor='room' className="form-label">Chọn phòng</label>
    //                 <select id='room' value={idPrice} onChange={event => setIdPrice(event.target.value)}>

    //                 </select>

    //                 <label htmlFor='serviceCategory' className="form-label">Chọn loại dịch vụ</label>
    //                 <select id='serviceCategory' value={idPrice} onChange={event => setIdPrice(event.target.value)}>

    //                 </select>

    //                 <label htmlFor='service' className="form-label">Chọn dịch vụ</label>
    //                 <select id='service' value={idPrice} onChange={event => setIdPrice(event.target.value)}>

    //                 </select>

    //                 <label htmlFor='quantity' className="form-label">Nhập số lượng</label>
    //                 <input type='number' id='quantity' placeholder="Nhập số lượng" value={idPrice} onChange={event => setIdPrice(event.target.value)} />

    //                 <h6>Tổng giờ thuê phòng</h6>
    //                 <h6>Tổng ngày thuê phòng</h6>
    //                 <h6>Tổng đêm thuê phòng</h6>
    //                 <h6>Tổng phụ thu</h6>

    //                 <h6>Đơn giá: </h6>

    //                 <h5>THÀNH TIỀN: </h5> */}


    //             </form>
    //             <div className="row" style={{marginTop: '5%'}}>
    //                 <input type='button' value='THANH TOÁN' className='btn btn-primary col' style={{marginRight: '20%', marginLeft: '20%'}}/>
    //                 <input type='button' value='IN HOÁ ĐƠN' className='btn btn-primary col' style={{marginRight: '10%'}}/>
    //             </div>
    //         </div>
    //     </div>
    // )
}