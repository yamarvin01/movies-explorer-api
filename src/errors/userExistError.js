const { userExistErrorMessage } = require('../constants/constants');

const ERROR_USER_EXIST = 409;

class UserExistError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserExistError';
    this.message = userExistErrorMessage;
    this.statusCode = ERROR_USER_EXIST;
  }
}

module.exports = {
  UserExistError,
};
