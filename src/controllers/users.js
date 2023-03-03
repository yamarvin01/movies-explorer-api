const User = require('../models/user');
const { ValidationError } = require('../errors/validationError');
const { DuplicateEmailError } = require('../errors/duplicateEmailError');

const getLoggedInUser = (req, res, next) => {
  User.findById(req.user.userId)
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user.userId, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      } else if (err.name === 'MongoServerError' && err.codeName === 'DuplicateKey') {
        next(new DuplicateEmailError());
      } else {
        next(err);
      }
    });
};

module.exports = {
  getLoggedInUser,
  updateProfile,
};
