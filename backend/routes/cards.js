const cardsRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', createCard);

cardsRouter.delete('/cards/:cardId', deleteCard);

cardsRouter.put('/cards/likes/:cardId', likeCard);

cardsRouter.delete('/cards/likes/:cardId', dislikeCard);

module.exports = cardsRouter;
