// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children, submit }) => {
  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        {children}
        <div className="modal-action m-4">
          <button className="btn" onClick={onClose}>
            ยกเลิก
          </button>
          <button className="btn btn-accent" onClick={submit}>
            บันทึก
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;