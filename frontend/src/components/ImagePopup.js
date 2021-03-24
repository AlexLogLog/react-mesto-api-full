import React from 'react';

function ImagePopup(props) {

  const {
    isOpen,
    link,
    name,
    onClose
  } = props;

  return (
    <div className={`popup popup_type_photo ${isOpen && 'popup_opened'}`}>
      <figure className="popup__photo">
        <div className="popup__conteiner">
          <button className="popup__close popup__close_type_photo" type="button" onClick={onClose}></button>
          <img className="popup__photo-image" src={link} alt={name} />
          <figcaption className="popup__photo-name">{name}</figcaption>
        </div>
      </figure>
    </div>
  );
}

export default ImagePopup;