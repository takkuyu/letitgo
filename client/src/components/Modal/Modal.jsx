import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ children, closeModal, modalWidth }) => {
  return (
    <div className="modal-outer-container">
      <div className="modal-blanket" onClick={closeModal}></div>
      <div className="modal-container">
        <div
          className="modal-content"
          style={{
            maxWidth: `${modalWidth}px`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  children: [],
  closeModal: undefined,
};

Modal.propTypes = {
  modalWidth: PropTypes.number,
  children: PropTypes.array.isRequired,
};

export default Modal;
