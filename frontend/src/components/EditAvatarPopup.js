import React, { useRef } from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const {
    isOpen,
    onClose,
    onUpdateAvatar
  } = props;

  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const infoUser = {
      avatar: inputRef.current.value,
    };
    onUpdateAvatar(infoUser);
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      submitButtonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label>
        <input ref={inputRef} type="url" name="link" className="popup__input popup__input_info_avatar" defaultValue="" id="src-input" placeholder="Ссылка на аватар" required />
        <span className="popup__input-error" id="src-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;