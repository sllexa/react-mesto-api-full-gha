import React from 'react';
import PopupWithForm from './PopupWithForm';

const ConfirmCardDeletePopup = ({ isOpen, onClose, onCardDelete }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();

    onCardDelete();
  }

  return (
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      name={'confirm'}
      title={'Вы уверены?'}
      buttonText={'Да'}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmCardDeletePopup;