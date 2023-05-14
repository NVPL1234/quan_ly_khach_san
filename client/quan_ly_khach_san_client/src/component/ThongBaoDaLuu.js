import React, { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { FcCheckmark } from 'react-icons/fc'

export default function ThongBaoDaLuu() {

    const [hienModal, setHienModal] = useState(true)

    const moModal = () => setHienModal(true)

    const dongModal = () => setHienModal(false)

    return (
        <Modal show={hienModal} onHide={dongModal} size="sm">
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
                <div className="row" style={{marginTop: '2%'}}>
                    <FcCheckmark />
                </div>
                <div className="row" style={{marginTop: '2%', textAlign: 'center', fontWeight: 'bold'}}>
                    <span>ĐÃ LƯU!</span>
                </div>
                <div className="row" style={{marginTop: '2%'}}>
                    <input type="button" className="btn btn-primary" value="OK" onClick={dongModal}/>
                </div>
            </Modal.Body>
        </Modal>
    )
}