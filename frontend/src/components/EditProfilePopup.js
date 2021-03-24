import React, { useState, useContext, useEffect } from 'react';

import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const {
    isOpen,
    onClose,
    onUpdateUser
  } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    const infoUser = {
      name: name,
      about: description
    };
    onUpdateUser(infoUser);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }
  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      submitButtonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input type="text" name="profileName" className="popup__input  popup__input_info_name-profile" id="name-input" defaultValue={name} required="2" maxLength="40" onChange={handleChangeName} />
        <span className="popup__input-error" id="name-input-error">Пустое поле</span>
      </label>
      <label className="popup__field">
        <input type="text" name="about" className="popup__input popup__input_info_about-profile" id="about-input" defaultValue={description} required minLength="2" maxLength="200" onChange={handleChangeAbout} />
        <span className="popup__input-error" id="about-input-error">Пустое поле</span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;