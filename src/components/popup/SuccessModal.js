import React from 'react';
import './style.scss';


const SuccessModal = ({ onClick, message }) => {

  return (
    <div className="modal-bg">
      <div className="modal-success">
        <span className="success-message">{message}</span><br/>
        <button onClick={onClick}>OK</button>
      </div>
    </div>
  )
}

export default SuccessModal
