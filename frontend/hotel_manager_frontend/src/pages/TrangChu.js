import React, { useEffect, useState, useContext } from "react"
import { Routes, Route, Link } from 'react-router-dom'
import axios from "axios";
import Nav from "../component/Nav";
import ks from '../hinh/ks.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function TrangChu() {
    
    return(
        <div className="container-fluid">
            <div className="row">
                <Nav />
            </div>
            <div className="row" style={{marginTop: '1%'}}>
                <img src={ks} width='100%' height='100%' />
            </div>
        </div>
    )
}