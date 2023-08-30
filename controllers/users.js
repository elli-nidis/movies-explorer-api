const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const UnauthorizedError = require('../errors/unauthorizedError');
const NotFoundError = require('../errors/notFoundError');
const InternalServerError = require('../errors/InternalServerError');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');

const unauthorizedError = new UnauthorizedError('Необходима авторизация');
const notFoundError = new NotFoundError('Запрашиваемые данные не найдены');
const internalServerError = new InternalServerError('Произошла ошибка');
const badRequestError = new BadRequestError('Переданы некорректные данные');
const conflictError = new ConflictError('Пользователь с указанным email уже зарегистрирован');

function getCurrentUser(req, res, next) {
  const { _id } = req.user;

  User.findOne({ _id })
    .then((user) => {
      res.send({
        name: user.name, email: user.email,
      });
    })
    .catch(() => next(internalServerError));
}

function createUser(req, res, next) {
  const {
    name, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(badRequestError);
      }
      if (err.code === 11000) {
        return next(conflictError);
      }
      return next(internalServerError);
    });
}

function updateUser(req, res, next) {
  const { name, email } = req.body;
  const userId = req.user._id;
  return User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(notFoundError);
      }
      return res.send({ name, email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(badRequestError);
      }
      return next(internalServerError);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-word-mutabor',
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      })
        .send({ _id: user._id, email: user.email });
    })
    .catch(() => {
      next(unauthorizedError);
    });
}
function logout(_req, res) {
  res.clearCookie('jwt').send({ message: 'Осуществлен выход из профиля' });
}

module.exports = {
  getCurrentUser, createUser, updateUser, login, logout,
};
