import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';

const EditProfilePopup = ({ isOpen, onClose, onEditProfile }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [isOpen, currentUser, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    onEditProfile(values.name, values.about);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={'Редактировать профиль'}
      name={'edit-profile'}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input className="modal__input modal__input_type_name" type="text" name="name" id="userName" placeholder="Имя" required minLength="2" maxLength="40"
      value={values.name || ''} onChange={handleChange} />
      <span className="modal__input-error" id="userName-error">{errors.name || ''}</span>
      <input className="modal__input modal__input_type_description" type="text" name="about" id="userjob" placeholder="О себе" required minLength="2"
      maxLength="200" value={values.about || ''} onChange={handleChange} />
      <span className="modal__input-error" id="userjob-error">{errors.about || ''}</span>

    </PopupWithForm>
  );
}

export default EditProfilePopup;