import React from 'react';
import useFormValidation from '../hooks/useFormValidation';

const Login = ({ onLogin }) => {
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="main">
      <section className="login">
        <h2 className="login__title">Вход</h2>
        <form className="login__form" name="form-login" noValidate onSubmit={handleSubmit}>
          <input className="login__input" type="email" placeholder="Email" name="email" minLength="2" maxLength="40" value={values.email || ''}
            onChange={handleChange} required />
          <span className="login__error" id="email-error">{errors.email || ''}</span>
          <input className="login__input" type="password" placeholder="Пароль" name="password" minLength="2" maxLength="40" value={values.password || ''}
            onChange={handleChange} required />
          <span className="login__error" id="password-error">{errors.password || ''}</span>
          <button className="login__button" disabled={!isValid}>Войти</button>
        </form>
      </section>
    </main>
  );
}

export default Login;