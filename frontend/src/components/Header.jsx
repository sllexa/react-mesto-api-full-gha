import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

const Header = ({ email, onSignOut}) => {
  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img className="logo" src={logo} alt="Логотип" />
      </Link>
      <Routes>
        <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>} />
        <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>} />
        <Route exact path="/" element={
          <div className="header__container">
            <p className="header__email">{email}</p>
            <Link to="sign-in" className="header__exit" onClick={onSignOut}>Выйти</Link>
          </div>} 
        />
      </Routes>
    </header>
  );
}

export default Header;
