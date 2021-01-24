const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        res.status(404).send({ message: "Нет карточек" });
        return;
      }
      res.status(200).send(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: `Внутренняя ошибка сервера: ${err}` });
    })
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка при валидации: ${err}` });
        return;
      }
      res.status(500).send({ message: `Внутренняя ошибка сервера: ${err}` });
    })
}

const deleteCard = (req, res) => {
  const id = req.params.cardId;
  Card.findByIdAndRemove(id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Нет карточки с таким id" });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Передан некорректный id: ${err}` });
        return;
      }
      res.status(500).send({ message: `Внутренняя ошибка сервера: ${err}` });
    })
}

module.exports = {
  getCards,
  createCard,
  deleteCard
}
