const router = require('express').Router();
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovieById } = require('../validation/validation');

router.get('/movies', getMovies);
router.post('/movies', validateCreateMovie(), createMovie);
router.delete('/movies/:_id', validateDeleteMovieById(), deleteMovieById);

module.exports = router;
