const Movie = require('../models/movie');
const { ValidationError } = require('../errors/validationError');
const { NotFoundDataError } = require('../errors/notFoundDataError');
const { NoRightsError } = require('../errors/noRightsError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user.userId })
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

const createMovie = (req, res, next) => {
  const owner = req.user.userId;
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
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
    owner,
    movieId,
    nameRU,
    nameEN,
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
  const { _id } = req.params;
  Movie.findById(_id)
    .orFail(() => {
      throw new NotFoundDataError();
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user.userId) {
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
