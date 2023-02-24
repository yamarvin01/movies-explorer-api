const process = require('process');

const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { UserExistError } = require('../errors/userExistError');
const { ValidationError } = require('../errors/validationError');

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const signUp = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => {
      res.send({
        name, email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      }
      if (err.name === 'MongoServerError') {
        next(new UserExistError());
      } else {
        next(err);
      }
    });
};

module.exports = {
  signIn,
  signUp,
};
