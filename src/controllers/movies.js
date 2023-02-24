/* eslint-disable object-property-newline */
const Movie = require('../models/movie');
const { ValidationError } = require('../errors/validationError');
const { NotFoundError } = require('../errors/notFoundError');
const { NoRightsError } = require('../errors/noRightsError');

const getMovies = (req, res, next) => {
  Movie.find()
    .then((cards) => res.send(cards))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country, director, duration, year, description, image,
    trailerLink, thumbnail, owner, nameRU, nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NoRightsError();
      }
      return movie.remove()
        .then(() => res.send(movie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
