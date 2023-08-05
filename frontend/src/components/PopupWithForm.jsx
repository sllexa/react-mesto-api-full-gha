import React from 'react';
import usePopupClose from '../hooks/usePopupClose';

const PopupWithForm = ({ name, title, isOpen, onClose, buttonText, children, onSubmit, isDisabled }) => {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`modal modal_type_${name} ${isOpen ? 'modal_open' : ''}`}>
      <div className="modal__container">
        <button className="modal__close-button link" type="button" title="Закрыть" onClick={onClose}/>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name} noValidate onSubmit={onSubmit}>
          {children}
          <button className="modal__button-save" type="submit" title="Сохранить" disabled={isDisabled}>{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;