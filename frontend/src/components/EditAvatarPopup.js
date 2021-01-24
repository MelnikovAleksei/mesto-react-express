import React from 'react';
import PopupWithForm from './PopupWithForm';

import { useFormWithValidation } from '../hooks/useFormWithValidation';

function EditAvatarPopup(props) {

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(values);
  }

  React.useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm])

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      loadingButtonText="Сохранение..."
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      contentLabel="Форма редактирования аватара пользователя"
      isLoadingData={props.isLoadingData}
    >
      <input
        className={errors.avatar ? 'form__input form__input_error' : 'form__input'}
        type="url"
        id="avatar-url"
        aria-label="ссылка на изображение"
        placeholder="Ссылка на картинку"
        name="avatar"
        required
        value={values.avatar || ''}
        onChange={handleChange}
      />
      <span
        className={errors.avatar ? 'form__input-error form__input-error_active' : 'form__input-error'}
        id='avatar-url-error'
        role="status"
        aria-live="polite"
      >
        {errors.avatar}
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
