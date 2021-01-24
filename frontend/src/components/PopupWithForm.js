import React from 'react';

import Modal from 'react-modal';

Modal.setAppElement('#root')

function PopupWithForm(props) {

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
      <form
        className="form"
        name={props.name}
        noValidate
        onSubmit={props.onSubmit}
      >
      <h3 id="heading" className="form__header">{props.title}</h3>

          {props.children}
          <button
            disabled={props.isDisabled}
            type="submit"
            className={props.isDisabled ?
              "form__save-button form__save-button_inactive"
            :
              "form__save-button"
            }
          >
            {props.isLoadingData ?
              props.loadingButtonText
            :
              props.buttonText}
          </button>
        <button onClick={props.onClose} type="button" className="popup__close-button" aria-label="закрыть форму"></button>
      </form>
    </Modal>
  )
}

export default PopupWithForm;
