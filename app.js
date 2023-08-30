require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const { auth } = require('./middlewares/auth');
// const errorHandler = require('./middlewares/errorHandler');
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

app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));
app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));
app.use('/signout', auth, require('./routes/signout'));

// app.use('*', (_req, _res, next) => next(notFoundError));

// app.use(errorLogger);
app.use(errors());
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение работает на ${PORT} порте`);
});
