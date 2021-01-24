const cardsRouter = require('express').Router();

const { getCards, createCard, deleteCard } = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCard);

module.exports = cardsRouter;
