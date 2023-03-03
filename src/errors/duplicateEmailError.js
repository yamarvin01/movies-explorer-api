const { duplicateEmailErrorMessage } = require('../constants/constants');

const ERROR_CODE_CONFLICT = 409;

class DuplicateEmailError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicateEmailError';
    this.message = duplicateEmailErrorMessage;
    this.statusCode = ERROR_CODE_CONFLICT;
  }
}

module.exports = {
  DuplicateEmailError,
};
