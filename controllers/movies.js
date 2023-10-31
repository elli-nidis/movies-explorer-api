const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const AccessDeniedError = require('../errors/AccessDeniedError');
const NotFoundError = require('../errors/NotFoundError');

// Получение массива фильмов
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

// Создание нового фильма в базе данных mongoDB
// для текущего пользователя.
// Формирую в теле запроса нужные поля для заполнения.
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании карточки фильма',
          ),
        );
      } else {
        next(e);
      }
    });
};

// Удаление фильма
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным _id не найден');
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (req.user._id === owner) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw new AccessDeniedError('Невозможно удалить фильм');
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для удаления фильма'));
      } else {
        next(e);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
