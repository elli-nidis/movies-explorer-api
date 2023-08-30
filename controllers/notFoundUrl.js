const NotFoundError = require('../errors/notFoundError');
const { notFoundMessage } = require('../utils/constants');

const notFoundError = new NotFoundError(notFoundMessage);

function notFoundUrl(_req, _res, next) {
  next(notFoundError);
}

module.exports = { notFoundUrl };
