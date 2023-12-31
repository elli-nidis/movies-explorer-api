const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const InternalServerError = require('../errors/InternalServerError');
const BadRequestError = require('../errors/badRequestError');
const {
  forbiddenMessage,
  notFoundMessage,
  internalServerMessage,
  badRequestMessage,
} = require('../utils/constants');

const forbiddenError = new ForbiddenError(forbiddenMessage);
const notFoundError = new NotFoundError(notFoundMessage);
const internalServerError = new InternalServerError(internalServerMessage);
const badRequestError = new BadRequestError(badRequestMessage);

function getMovies(req, res, next) {
  const currentUser = req.user._id;

  return Movie.find({ currentUser })
    .then((movies) => res.send(movies))
    .catch(() => next(internalServerError));
}

function createMovie(req, res, next) {
  const owner = req.user._id;

  return Movie.create({ owner, ...req.body })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(badRequestError);
        return;
      }
      next(internalServerError);
    });
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const currentUser = req.user._id;

  return Movie.findById(movieId)
    .then((movie) => {
      const movieOwner = movie.owner.toString();

      if (!movie) {
        return next(notFoundError);
      }

      if (movieOwner !== currentUser) {
        return next(forbiddenError);
      }

      return Movie.deleteOne({ _id: movieId })
        .then((movieData) => res.send(movieData));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(badRequestError);
        return;
      }
      next(internalServerError);
    });
}

module.exports = {
  getMovies, createMovie, deleteMovie,
};
