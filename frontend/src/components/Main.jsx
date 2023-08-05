import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) => {
  const {name, about, avatar} = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button className="profile__avatar-edit" type="button" title="Изменить аватар">
          <img className="profile__avatar" src={avatar} alt="Аватар пользователя" onClick={onEditAvatar}/>
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{name}</h1>
          <button className="profile__edit-button link" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{about}</p>
        </div>
        <button className="profile__add-button link" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;