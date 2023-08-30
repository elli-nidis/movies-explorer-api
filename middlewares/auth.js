const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const { unauthorizedMessage } = require('../utils/constants');

const unauthorizedError = new UnauthorizedError(unauthorizedMessage);

function auth(req, _res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return next(unauthorizedError);
  }

  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'secret-word-mutabor'}`);
  } catch (err) {
    return next(unauthorizedError);
  }

  req.user = payload;

  return next();
}

module.exports = { auth };
