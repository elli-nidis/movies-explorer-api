// http status codes errors
const badRequest = 400;
const unauthorized = 401;
const forbidden = 403;
const notFound = 404;
const conflict = 409;
const serverError = 500;

// error messages
const unauthorizedMessage = 'Необходима авторизация';
const notFoundMessage = 'Запрашиваемые данные не найдены';
const internalServerMessage = 'Произошла ошибка';
const badRequestMessage = 'Переданы некорректные данные';
const conflictMessage = 'Пользователь с указанным email уже зарегистрирован';
const forbiddenMessage = 'Вы не можете произвести это действие';

const regexpUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{1,4}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  serverError,
  unauthorizedMessage,
  notFoundMessage,
  internalServerMessage,
  badRequestMessage,
  conflictMessage,
  forbiddenMessage,
  regexpUrl,
};
