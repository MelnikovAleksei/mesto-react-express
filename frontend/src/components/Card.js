import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwnCard = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.find(i => i === currentUser._id);

  const cardDeleteButtonClassName = isOwnCard ?
    'photos__delete-button photos__delete-button_visible'
  :
    'photos__delete-button photos__delete-button_hidden';
  const cardLikeButtonClassName = isLiked ?
    'photos__like-button photos__like-button_liked'
  :
    'photos__like-button';

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card, isLiked);
  }

  function handleDeleteRequest() {
    props.onCardDeleteRequest(props.card);
  }

  return (
    <li className="photos__card">
      <figure className="photos__figure">
        <img tabIndex="0" onClick={handleCardClick} alt={`Фотография ${props.card.name}`} src={props.card.link} className="photos__image" />
        <figcaption
          className="photos__figcaption"
        >
          {props.card.name}
        </figcaption>
      </figure>
      <button onClick={handleDeleteRequest} className={cardDeleteButtonClassName} aria-label="удалить фотографию"></button>
      <div className="photos__like-container">
        <button onClick={handleLikeClick} className={cardLikeButtonClassName} aria-label="поставить лайк"></button>
        <span className="photos__like-count">{props.card.likes.length}</span>
      </div>
    </li>
  )
}

export default Card;
