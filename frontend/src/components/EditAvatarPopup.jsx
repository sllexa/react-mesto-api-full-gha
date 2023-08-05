import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(values.avatar);
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={'avatar'}
      title={'Обновить аватар'}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input className="modal__input modal__input_type_avatar" type="url" name="avatar" id="avatar" placeholder="Ссылка на аватар" required 
      value={values.avatar || ''} onChange={handleChange} />
      <span className="modal__input-error" id="avatar-error">{errors.avatar}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;