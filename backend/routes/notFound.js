const notFountRouter = require('express').Router();

notFountRouter.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = notFountRouter;
