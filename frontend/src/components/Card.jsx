import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const { name, link, likes, owner } = card;
  const { _id } = React.useContext(CurrentUserContext);
  const isOwn = owner === _id;
  const isLiked = likes.some(i => i === _id);
  const cardLikeClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

  return (
    <article className="element">
      {isOwn && (
        <button className="element__delete-button link" type="button" aria-label="Удалить" onClick={() => onCardDelete(card)}/>
      )}
      <img className="element__image" src={link} alt={name} onClick={() => onCardClick(card)}/>
      <h2 className="element__title">{name}</h2>
      <div className="element__like-container">
        <button type="button" className={cardLikeClassName} aria-label="Мне нравиться" onClick={() => onCardLike(card)}/>
        <p className="element__like-count">{likes.length}</p>
      </div>
    </article>
  );
}

export default Card;