const movieRouter = require('express').Router();
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validation');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

// Маршрут получения списка фильмов
movieRouter.get('/movies', getMovies);

// Маршрут создания нового фильма
movieRouter.post('/movies', createMovieValidator, createMovie);

// Маршрут удаления фильма
movieRouter.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);

module.exports = movieRouter;
