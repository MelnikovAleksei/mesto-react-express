import React from 'react';

const Sign = ({ title, buttonText, isValid, onSubmit, linkMarkup, children }) => {
  return (
    <form
      className="form form_theme_dark"
      noValidate
      onSubmit={onSubmit}
    >
      <h2
        className="form__header form__header_theme_dark"
      >
        {title}
      </h2>
      {children}
      <button
        className={!isValid ?
          "form__save-button form__save-button_theme_dark form__save-button_inactive"
        :
          "form__save-button form__save-button_theme_dark"
        }
        type="submit"
        disabled={!isValid}
      >
        {buttonText}
      </button>
      {linkMarkup && linkMarkup}
    </form>
  )
}

export default Sign;
