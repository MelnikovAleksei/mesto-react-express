import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
        <section className="profile">
          <div className="profile__container-info">
            <div className="profile__container-avatar">
              {props.isLoadingInitialData ?
                <p className="download-message">Загрузка...</p>
              :
                <img
                  alt={`Аватар пользователя ${currentUser.name}`}
                  src={currentUser.avatar}
                  className="profile__avatar"
                />
              }
              <button
                className="profile__avatar-edit-button"
                aria-label="открыть форму обновления аватара профиля"
                onClick={props.onEditAvatar}
              />
            </div>
            <div className="profile__bio">
              <div className="profile__info">
                <h1 className="profile__name">{props.isLoadingInitialData ? 'Загрузка...' : currentUser.name}</h1>
                <p className="profile__caption">{props.isLoadingInitialData ? 'Загрузка...' : currentUser.about}</p>
              </div>
              <button
                className="profile__edit-button button-open-form"
                aria-label="редактировать профиль"
                onClick={props.onEditProfile}
              />
            </div>
          </div>
          <button
            className="profile__add-button button-open-form"
            aria-label="добавить фотографии"
            onClick={props.onAddPlace}
          />
        </section>
        <section className="photos">
          {props.isLoadingInitialData ?
            <p
              className="download-message"
            >
              Карточки с фотографиями загружаются...
            </p>
          :
            <ul className="photos__list">
              {props.cards.map(card =>
                (
                  <Card
                    key={card._id}
                    card={card}
                    onCardClick={props.onCardClick}
                    onCardLike={props.onCardLike}
                    onCardDeleteRequest={props.onCardDeleteRequest}
                  />
                )
              )}
            </ul>
          }
        </section>
      </main>
  )
}

export default Main;
