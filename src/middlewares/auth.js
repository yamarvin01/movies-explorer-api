const process = require('process');

const {
  NODE_ENV = 'development',
  JWT_SECRET = 'some-secret-key',
} = process.env;
const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/authError');
const { needAuthErrorMessage } = require('../constants/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(needAuthErrorMessage);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
    );
  } catch (err) {
    throw new AuthError(needAuthErrorMessage);
  }

  req.user = payload;

  next();
};

module.exports = auth;
