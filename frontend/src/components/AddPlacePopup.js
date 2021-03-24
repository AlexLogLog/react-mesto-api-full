import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const {
        isOpen,
        onClose,
        onAddPlace
    } = props;

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const newCard = {
            name: name,
            link: url
        };
        onAddPlace(newCard);
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeUrl(e) {
        setUrl(e.target.value);
    }

    return (
        <PopupWithForm
            name='card'
            title='Новое место'
            submitButtonText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label>
                <input value={name} type="text" name="name" className="popup__input popup__input_info_name-photo" id="img-name-input" placeholder="Название" required minLength="2" maxLength="30" onChange={handleChangeName} />
                <span className="popup__input-error" id="img-name-input-error"></span>
            </label>
            <label>
                <input value={url} type="url" name="link" className="popup__input popup__input_info_link-photo" id="url-input" placeholder="Ссылка на картинку" required onChange={handleChangeUrl} />
                <span className="popup__input-error" id="url-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;