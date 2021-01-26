const usersRouter = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateCurrentUser,
  updateAvatar
} = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', getCurrentUser);

usersRouter.patch('/users/me', updateCurrentUser);

usersRouter.patch('/users/me/avatar', updateAvatar);

usersRouter.get('/users/:id', getUserById);

module.exports = usersRouter;
