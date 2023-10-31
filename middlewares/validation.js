// Подключение celebrate из пакета celebrate, для валидации данных
const { Joi, celebrate } = require('celebrate');
const { urlRegexPattern } = require('../utils/constants');

const loginUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

const registrationUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegexPattern),
    trailerLink: Joi.string().required().regex(urlRegexPattern),
    thumbnail: Joi.string().required().regex(urlRegexPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

const getUserInfoValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const editUserInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
  }),
});

module.exports = {
  loginUserValidator,
  registrationUserValidator,
  createMovieValidator,
  deleteMovieValidator,
  getUserInfoValidator,
  editUserInfoValidator,
};
