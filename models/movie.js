const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const isURL = require('validator/lib/isURL');

const movieSchema = Schema({
  country: {
    type: String,
    required: true,
  }, // Страна создания фильма
  director: {
    type: String,
    required: true,
  }, // Режиссёр фильма
  duration: {
    type: Number,
    required: true,
  }, // Длительность фильма
  year: {
    type: String,
    required: true,
  }, // Год выпуска фильма
  description: {
    type: String,
    required: true,
  }, // Описание фильма
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  }, // Ссылка на постер к фильму
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  }, // Ссылка на трейлер фильма
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  }, // Миниатюрное изображение постера к фильму
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  }, // _id пользователя, который сохранил фильм
  movieId: {
    type: Number,
    required: true,
  }, // id фильма, который содержится в ответе сервиса MoviesExplorer
  nameRU: {
    type: String,
    required: true,
  }, // Название фильма на русском языке
  nameEN: {
    type: String,
    required: true,
  }, // Название фильма на английском языке
});

module.exports = mongoose.model('movie', movieSchema);
