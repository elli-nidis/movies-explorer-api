const NotFoundError = require('../errors/notFoundError');

const notFoundError = new NotFoundError('Такой страницы не существует');

function notFoundUrl(_req, _res, next) {
  next(notFoundError);
}

module.exports = { notFoundUrl };
