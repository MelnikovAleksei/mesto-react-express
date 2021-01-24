const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const notFountRouter = require('./routes/notFound');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '5fdba7713713dd176fd708d2'
  };

  next();
});

app.use('/', cardsRoutes);

app.use('/', usersRoutes);

app.all('*', notFountRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
