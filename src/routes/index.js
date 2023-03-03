const router = require('express').Router();
const authRoutes = require('./auth');
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { NotFoundPageError } = require('../errors/notFoundPageError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.use('/', authRoutes);
router.use(auth);
router.use('/', userRoutes);
router.use('/', movieRoutes);
router.use(() => { throw new NotFoundPageError(); });

module.exports = router;
