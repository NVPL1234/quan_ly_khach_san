import React, { useState, useEffect } from "react"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios'
import Nav from "../component/Nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/js/dist/modal"
import { Modal } from "bootstrap/dist/js/bootstrap.js";

export default function Test() {

    const closeModal = () => {
        let mymodal = document.getElementById('myModal')
        mymodal.hide()
        // let modal = new Modal(document.getElementById('myModal'))
        // modal.hide()
        // console.log(modal);
    }

    return (
        <div className="container py-4">
            <h3>Bootstrap 5 React Examples</h3>
            <h6>no jquery, no reactstrap, no react-bootstrap</h6>
                <div>
                    <div className="py-2">
                        <button className="btn btn-dark" data-bs-target="#myModal" data-bs-toggle="modal">
                            Show modal
                        </button>
                        <div className="modal" tabIndex="-1" id="myModal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Modal title</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Modal body text goes here.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}