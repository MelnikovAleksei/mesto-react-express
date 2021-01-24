import React from 'react';

import Modal from 'react-modal';

Modal.setAppElement('#root')

function ImagePopup(props) {

  return (
    <Modal
      isOpen={props.isOpen}
      className="popup popup-photos"
      overlayClassName="popup__container"
      contentLabel="Окно просмотра фотографии"
      onRequestClose={props.onClose}
      shouldCloseOnOverlayClick={true}
      aria={{
        labelledby: "heading"
      }}
    >
      <figure className="photos__figure popup-photos__figure">
        <img alt={`Фотография ${props.card.name}`} src={`${props.card.link}`} className="popup-photos__image" />
        <figcaption id="heading" className="popup-photos__figcaption">{props.card.name}</figcaption>
      </figure>
      <button onClick={props.onClose} className="popup__close-button" aria-label="закрыть просмотр фотографии" />
    </Modal>
  )

  /*
  return (
    <div className={`popup popup-photos ${props.card && props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup-photos__container">
        <figure className="photos__figure popup-photos__figure">
          <img alt={`Фотография ${props.card.name}`} src={`${props.card.link}`} className="popup-photos__image" />
          <figcaption className="popup-photos__figcaption">{props.card.name}</figcaption>
        </figure>
        <button onClick={props.onClose} className="popup__close-button" aria-label="закрыть просмотр фотографии" />
      </div>
    </div>
  )
  */
}

export default ImagePopup;
