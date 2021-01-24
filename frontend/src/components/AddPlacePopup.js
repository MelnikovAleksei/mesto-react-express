import React from 'react';
import PopupWithForm from './PopupWithForm';

import { useFormWithValidation } from '../hooks/useFormWithValidation';

function AddPlacePopup(props) {

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation({});

  function handleSubmit(evt) {
    evt.preventDefault(evt);
    props.onAddPlace(values);
  }

  React.useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm])

  return (
    <PopupWithForm
      name="photo"
      title="Новое место"
      buttonText="Создать"
      loadingButtonText="Сохранение..."
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      contentLabel="Форма добавления фотокарточки"
      isLoadingData={props.isLoadingData}
    >
      <input
        className={errors.name ? 'form__input form__input_error' : 'form__input'}
        type="text"
        id="photo-title"
        aria-label="подпись"
        placeholder="Название"
        name="name"
        required
        minLength="1"
        maxLength="30"
        value={values.name || ''}
        onChange={handleChange}
      />
      <span
        className={errors.name ? 'form__input-error form__input-error_active' : 'form__input-error'}
        id='photo-title-error'
        role="status"
        aria-live="polite"
      >
        {errors.name}
      </span>
      <input
        className={errors.link ? 'form__input form__input_error' : 'form__input'}
        type="url"
        id="photo-url"
        aria-label="ссылка"
        placeholder="Ссылка на картинку"
        name="link"
        required
        value={values.link || ''}
        onChange={handleChange}
      />
      <span
        className={errors.link ? 'form__input-error form__input-error_active' : 'form__input-error'}
        id='photo-url-error'
        role="status"
        aria-live="polite"
      >
        {errors.link}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
