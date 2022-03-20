import React from 'react';
import { Modal } from "react-bootstrap";
import './style.css';

const SizeModal = (props) => {
    return (


        <Modal {...props}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Size Chart
        </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <img style={{width:'100%'}} src={props.imgName} alt="" className="img-fluid" />
            </Modal.Body>
        </Modal>
    );
}

export default SizeModal;