const { notFoundDataErrorMessage } = require('../constants/constants');

const ERROR_CODE_NOTFOUND = 404;

class NotFoundDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundDataError';
    this.message = notFoundDataErrorMessage;
    this.statusCode = ERROR_CODE_NOTFOUND;
  }
}

module.exports = {
  NotFoundDataError,
};
