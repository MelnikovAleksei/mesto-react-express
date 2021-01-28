const Card = require('../models/card');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const id = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (card.owner.toString() !== id) {
        throw new ForbiddenError('Нет прав для удаления карточки');
      } else {
        Card.findByIdAndDelete(req.params.cardId)
          .then((deletedCard) => {
            res.status(200).send(deletedCard);
          })
          .catch(next);
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  User.findById(req.user._id)
    .then((user) => {
      Card.findByIdAndUpdate(
        { _id: cardId },
        { $push: { likes: user } },
        { new: true },
      )
        .then((card) => {
          res.status(200).send(card);
        })
        .catch(next);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  User.findById(req.user._id)
    .then((user) => {
      Card
        .findByIdAndUpdate(
          { _id: cardId },
          { $pull: { likes: user._id } },
          { new: true },
        )
        .then((card) => {
          res.status(200).send(card);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
