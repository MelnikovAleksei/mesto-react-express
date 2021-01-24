import React from 'react';
import Sign from './Sign';

import { useFormWithValidation } from '../hooks/useFormWithValidation';

const Login = ({ onAuthorization, onCheckToken }) => {

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuthorization(values);
    resetForm();
  }

  return (
    <Sign
      title="Вход"
      buttonText="Войти"
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_theme_dark"
        type="email"
        id="login-email"
        aria-label="электронная почта"
        placeholder="Email"
        name="email"
        required
        maxLength="30"
        value={values.email || ''}
        onChange={handleChange}
      />
      <span
        className={errors.email ? 'form__input-error form__input-error_active' : 'form__input-error'}
        id="login-email-error"
      >
        {errors.email}
      </span>
      <input
        className="form__input form__input_theme_dark"
        type="password"
        id="login-password"
        aria-label="пароль"
        placeholder="Пароль"
        name="password"
        required
        value={values.password || ''}
        onChange={handleChange}
      />
      <span
        className={errors.password ? 'form__input-error form__input-error_active' : 'form__input-error'}
        id="login-password-error"
      >
        {errors.password}
      </span>
    </Sign>
  )
}

export default Login;
