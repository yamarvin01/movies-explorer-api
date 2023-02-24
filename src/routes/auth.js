/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { signIn, signUp } = require('../controllers/auth');

const emailRegExp = /[\w\-\_\.]+@[\w\-\_\.]+\.[\w\-\_\.]+/;

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
