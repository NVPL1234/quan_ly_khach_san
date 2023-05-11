import React, { useEffect, useState, useContext } from "react"
import { Routes, Route, Link } from 'react-router-dom'
import axios from "axios";
import Nav from "../component/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function TrangChu() {

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <Link type="button" to='/dang_nhap'>ĐĂNG NHẬP</Link>
        </div>
    )
}