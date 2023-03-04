const { validationErrorMessage } = require('../constants/constants');

const ERROR_CODE_VALIDATION = 400;

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.message = validationErrorMessage;
    this.statusCode = ERROR_CODE_VALIDATION;
  }
}

module.exports = {
  ValidationError,
};
