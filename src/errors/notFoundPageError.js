const { notFoundPageErrorMessage } = require('../constants/constants');

const ERROR_CODE_NOTFOUND = 404;

class NotFoundPageError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundPageError';
    this.message = notFoundPageErrorMessage;
    this.statusCode = ERROR_CODE_NOTFOUND;
  }
}

module.exports = {
  NotFoundPageError,
};
