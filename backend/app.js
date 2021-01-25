const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const bodyParser = require('body-parser');

const auth = require('./middlewares/auth');

const { createUser, login } = require('./controllers/users');

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

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.all('*', notFountRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
