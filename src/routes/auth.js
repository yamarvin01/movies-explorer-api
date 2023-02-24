const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { signIn, signUp } = require('../controllers/auth');
const { emailRegExp } = require('../constants/constants');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(emailRegExp),
      password: Joi.string().required(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  signUp,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(emailRegExp),
      password: Joi.string().required(),
    }),
  }),
  signIn,
);

module.exports = router;
