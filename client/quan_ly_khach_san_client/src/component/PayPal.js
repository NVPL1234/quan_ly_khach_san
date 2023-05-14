import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Paypal(props) {
    const paypal = useRef();
    let phong = props.phong
    const navigation = useNavigate()
    let tongTien = props.tongTien / 23465

    const themCTHDPhong = async (maHD, phong) => {
        try {
            await axios.put('http://localhost:8080/rooms/' + phong.maPhong + '/' + 'Đã đặt')
            await axios.post('http://localhost:8080/room_order_details', {
                hoaDon: { 'maHD': maHD },
                phong: { 'maPhong': phong.maPhong },
                gioDau: phong.gioDau,
                giaGioDau: phong.giaGioDau,
                giaGioTiepTheo: phong.giaGioTiepTheo,
                giaTheoNgay: phong.giaTheoNgay,
                giaQuaDem: phong.giaQuaDem
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Cool looking table",
                                amount: {
                                    currency_code: "USD",
                                    value: tongTien.toFixed(2),
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    await actions.order.capture();
                    let maHD = 0
                    try {
                        const res = await axios.post('http://localhost:8080/orders', {
                            ngayNhanPhong: localStorage.getItem('ngayNhanPhong'),
                            ngayTraPhong: localStorage.getItem('ngayTraPhong'),
                            loaiThue: localStorage.getItem('loaiThue'),
                            trangThaiHD: 'Đã đặt',
                            tienCoc: props.tongTien,
                            khachHang: { 'maKH': localStorage.getItem('maTK') }
                        })
                        maHD = res.data.maHD
                    } catch (error) {
                        console.log(error.message);
                    }
                    if (phong.length == null)
                        themCTHDPhong(maHD, phong)
                    else
                        for (let i = 0; i < phong.length; i++)
                            themCTHDPhong(maHD, phong[i])
                    navigation('/')
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}