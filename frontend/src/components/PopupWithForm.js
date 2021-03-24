import React from 'react';

function PopupWithForm(props) {
    const {
        isOpen,
        name,
        title,
        children,
        submitButtonText,
        onClose,
        onSubmit,
        auth
    } = props;
    return (

        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <form className={`popup__form popup__form_type_${name}`} name="info" noValidate onSubmit={onSubmit}>
                    <button className={`popup__close popup__close_type_${name}`} type="button" onClick={onClose}></button>
                    <h2 className={`popup__edit popup__edit popup__edit_type_${name}`}>{title}</h2>
                    {children}
                    {auth
                        ? <></>
                        : <button type="submit" className={`popup__save popup__save_type_${name}`} onClick={onClose}>{submitButtonText}</button>
                    }
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
