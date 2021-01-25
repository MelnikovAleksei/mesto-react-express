const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.status(404).send({ message: "Пользователи не найдены" });
        return;
      }
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: `Внутренняя ошибка сервера: ${err}` });
    })
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Нет пользователя с таким id` });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Передан некорректный id: ${err}` });
        return;
      }
      res.status(500).send({ message: `Внутренняя ошибка сервера: ${err}` });
    })
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar
      })
    )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка при валидации: ${err}` });
        return;
      }
      res.status(500).send({ message: `Внутренняя ошибка сервера: ${err}` });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  login
};
