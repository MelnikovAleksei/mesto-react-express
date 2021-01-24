import React from 'react';

import successSignUpImg from '../images/sign-up/success-sign-up.svg'
import notSuccessSignUpImg from '../images/sign-up/not-success-sign-up.svg'

import Modal from 'react-modal';

const InfoTooltip = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      className="popup"
      overlayClassName="popup__container"
      contentLabel={props.contentLabel}
      closeTimeoutMS={300}
      aria={{
        labelledby: "heading"
      }}
      onRequestClose={props.onClose}
      shouldCloseOnOverlayClick={true}
    >
      <img
        className="popup__icon"
        src={props.isSuccess ? successSignUpImg : notSuccessSignUpImg}
        alt={props.isSuccess ? 'иконка успешной регистрации' : 'иконка не успешной регистрации'}
      />
      <h3
        className="popup__title"
      >
        {props.isSuccess ?
          'Вы успешно зарегистрировались!'
        :
          'Что-то пошло не так! Пропробуйте ещё раз.'
        }
      </h3>
      <button onClick={props.onClose} type="button" className="popup__close-button" aria-label="закрыть"></button>
    </Modal>
  )
}

export default InfoTooltip;
