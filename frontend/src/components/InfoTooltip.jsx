import React from 'react';
import usePopupClose from '../hooks/usePopupClose';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

const InfoTooltip = ({ onClose, status: { isOpen, successful } }) => {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? 'modal_open' : ''}`}>
      <div className="modal__container">
        <button className="modal__close-button link" type="button" title="Закрыть" onClick={onClose} />
        <img className="modal__status" src={successful ? success : fail} alt="Статус" />
        <h2 className="modal__title modal__title_center">{successful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;