require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');

// const { auth } = require('./middlewares/auth');
// const errorHandler = require('./middlewares/errorHandler');
const { login, createUser } = require('./controllers/users');
// const { regexpUrl } = require('./utils/constants');
// const NotFoundError = require('./errors/notFoundError');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

// const notFoundError = new NotFoundError('Такой страницы не существует');

const app = express();

app.use(helmet());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(requestLogger);

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), createUser);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

// app.use('*', (_req, _res, next) => next(notFoundError));

// app.use(errorLogger);
app.use(errors());
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение работает на ${PORT} порте`);
});
