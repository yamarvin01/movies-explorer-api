/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

const urlRegExp = /https?:\/\/(www\.)?[\w\-]+\.[\w\-]+\/*[\w\-\/\.\+\(\)\[\]~:?#@!$&'*,;=]*#?/;

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegExp),
    trailerLink: Joi.string().required().pattern(urlRegExp),
    thumbnail: Joi.string().required().pattern(urlRegExp),
    owner: Joi.string().hex().required(),
    movieId: Joi.string().hex().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/movies/_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required(),
  }),
}), deleteMovieById);

module.exports = router;
