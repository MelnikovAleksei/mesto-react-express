import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';

import Login from './Login';

import ProtectedRoute from './ProtectedRoute';

import api from '../utils/api';
import auth from '../utils/auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { Route, Switch, useHistory } from 'react-router-dom';
import Register from './Register';


function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isSuccessSignUp, setIsSuccessSignUp] = React.useState(false);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [isLoadingInitialData, setIsLoadingInitialData] = React.useState(false);
  const [isLoadingSetUserInfo, setIsLoadingSetUserInfo] = React.useState(false);
  const [isLoadingAddPlaceSubmit, setIsLoadingAddPlaceSubmit] = React.useState(false);
  const [isLoadingAvatarUpdate, setIsLoadingAvatarUpdate] = React.useState(false);

  const [cardForDelete, setCardForDelete] = React.useState({})

  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

  const [authorizationUserEmail, setAutorizationUserEmail] = React.useState(null);

  const [cards, setCards] = React.useState([]);

  const history = useHistory();

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then(
        (newCard) => {
          const newCards = cards.map((currentCard) => currentCard._id === card._id ? newCard : currentCard)
          setCards(newCards);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    api.deleteCard(cardForDelete._id)
      .then(
        () => {
          const newCards = cards.filter((elem) => elem !== cardForDelete);
          setCards(newCards);
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
  }

  React.useEffect(() => {
    setIsLoadingInitialData(true);
    api.getInitialData()
      .then(
        (data) => {
          const [userData, cardsData] = data;
          setCards(cardsData);
          setCurrentUser(userData);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setIsLoadingInitialData(false);
      })
  }, [])

  function handleAddPlaceSubmit(data) {
    setIsLoadingAddPlaceSubmit(true);
    api.postCard(data)
      .then(
        (newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setIsLoadingAddPlaceSubmit(false);
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoadingAvatarUpdate(true);
    api.setUserAvatar(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setIsLoadingAvatarUpdate(false);
      })
  }

  function handleUpdateUser(data) {
    setIsLoadingSetUserInfo(true);
    api.setUserInfo(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setIsLoadingSetUserInfo(false)
      })
  }

  function handleEditProfilePopupOpen() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlacePopupOpen() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleInfoTooltipPopupOpen() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleCardDeleteRequest(card) {
    setCardForDelete(card);
    setIsConfirmPopupOpen(true);
  }

  function handleSingOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  function handleRegistration(data) {
    auth.register(data)
      .then(
        (data) => {
          setIsSuccessSignUp(true);
          handleInfoTooltipPopupOpen();
          history.push('/sign-in')
        },
        (err) => {
          console.log(err);
          setIsSuccessSignUp(false);
          handleInfoTooltipPopupOpen();
        })
  }

  function handleAuthorization(data) {
    auth.authorize(data)
      .then(
        (data) => {
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          history.push('/');
        },
        (err) => {
          console.log(err);
        }
      )
  }

  const handleCheckToken = React.useCallback(
    () => {
      const token = localStorage.getItem('jwt');
      auth.checkToken(token)
        .then(
          (data) => {
            setAutorizationUserEmail(data.data.email);
            setLoggedIn(true);
            history.push('/');
          },
          (err) => {
            console.log(err);
          }
        )

    },
    [history],
  )

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      handleCheckToken();
    }
  }, [handleCheckToken])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedIn={loggedIn}
        onSingOut={handleSingOut}
        authorizationUserEmail={authorizationUserEmail}
      />
      <Switch>
        <Route path="/sign-up">
          <Register
            onRegistration={handleRegistration}
          />
        </Route>
        <Route path="/sign-in">
          <Login
            onAuthorization={handleAuthorization}
            onCheckToken={handleCheckToken}
          />
        </Route>
        <ProtectedRoute
          path="/"
          component={Main}
          loggedIn={loggedIn}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDeleteRequest={handleCardDeleteRequest}
          onEditProfile={handleEditProfilePopupOpen}
          onAddPlace={handleAddPlacePopupOpen}
          onEditAvatar={handleEditAvatarPopupOpen}
          onCardClick={handleCardClick}
          isLoadingInitialData={isLoadingInitialData}
        />
      </Switch>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        currentUser={currentUser}
        isLoadingData={isLoadingSetUserInfo}
        isLoadingInitialData={isLoadingInitialData}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoadingData={isLoadingAvatarUpdate}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoadingData={isLoadingAddPlaceSubmit}
      />
      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
        title="Вы уверены?"
        buttonText="Да"
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccessSignUp}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
