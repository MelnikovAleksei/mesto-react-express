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

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isSuccessSignUp, setIsSuccessSignUp] = React.useState(false);

  const [isLoadingInitialData, setIsLoadingInitialData] = React.useState(false);
  const [isLoadingSetUserInfo, setIsLoadingSetUserInfo] = React.useState(false);
  const [isLoadingAddPlaceSubmit, setIsLoadingAddPlaceSubmit] = React.useState(false);
  const [isLoadingAvatarUpdate, setIsLoadingAvatarUpdate] = React.useState(false);

  const [cardForDelete, setCardForDelete] = React.useState({})

  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

  const [authorizationUserEmail, setAutorizationUserEmail] = React.useState(null);

  const [cards, setCards] = React.useState([]);

  const [token, setToken] = React.useState('');

  const history = useHistory();

  const tokenCheck = React.useCallback(
    () => {
      const token = localStorage.getItem('jwt');

      if (token) {
        setToken(token);

        auth.checkToken(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setAutorizationUserEmail(res.email);
              history.push('/');
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    [history]
  );

  React.useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoadingInitialData(true);

      const token = localStorage.getItem('jwt');
      api.getInitialData(token)
        .then((res) => {
          const [userData, cardsData] = res;
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadingInitialData(false);
        })
    }
  }, [loggedIn])

  const handleUpdateUser = (data) => {
    setIsLoadingSetUserInfo(true);

    api.setUserInfo(data, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingSetUserInfo(false)
      })
  }

  const handleUpdateAvatar = (data) => {
    setIsLoadingAvatarUpdate(true);

    api.setUserAvatar(data, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingAvatarUpdate(false);
      })
  }

  const handleCardLike = (card, isLiked) => {
    api.changeLikeCardStatus(card._id, isLiked, token)
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

  const handleCardDelete = (evt) => {
    evt.preventDefault();

    api.deleteCard(cardForDelete._id, token)
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

  const handleAddPlaceSubmit = (data) => {
    setIsLoadingAddPlaceSubmit(true);

    api.postCard(data, token)
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

  const handleRegistration = (data) => {
    auth.register(data)
      .then(
        (res) => {
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

  const handleAuthorization = (data) => {
    auth.authorize(data)
      .then(
        (res) => {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          setToken(res.token);
          setAutorizationUserEmail(data.email);
          history.push('/');
        },
        (err) => {
          console.log(err);
        }
      )
  }

  const handleSingOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setToken('');
    history.push('/sign-in');
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
            onCheckToken={tokenCheck}
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
