import React from 'react';
import PopupWithForm from './PopupWithForm';

function InfoTooltip({ isOpen, onClose, message, img }) {
  return (
    <PopupWithForm
      name="message"
      isOpen={isOpen}
      onClose={onClose}
      auth={true}
    >
      <div className={`popup__auth_type_${img}`} />
      <p className="popup__auth">
        {message}
      </p>
    </PopupWithForm>
  )
};

export default InfoTooltip;
