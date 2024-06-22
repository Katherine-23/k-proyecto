import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ children, onClose }) => {
  const modalRoot = document.getElementById('modal-root');
  const modalElement = (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close-button" onClick={onClose}>X</button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );

  return modalRoot ? ReactDOM.createPortal(modalElement, modalRoot) : null;
};

export default Modal;
