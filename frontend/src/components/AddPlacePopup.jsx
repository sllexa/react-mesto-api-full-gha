import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace(values.name, values.link);
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={'add-element'}
      title={'Новое место'}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input className="modal__input modal__input_type_place" type="text" name="name" id="element-name" placeholder="Название" required minLength="2"
      maxLength="30" value={values.name || ''} onChange={handleChange} />
      <span className="modal__input-error" id="element-name-error">{errors.name || ''}</span>
      <input className="modal__input modal__input_type_link" type="url" name="link" id="link" placeholder="Ссылка на картинку" required 
      value={values.link || ''} onChange={handleChange} />
      <span className="modal__input-error" id="link-error">{errors.link || ''}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;