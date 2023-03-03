const { noRightsErrorMessage } = require('../constants/constants');

const ERROR_CODE_NO_RIGHTS = 403;

class NoRightsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoRightsError';
    this.message = noRightsErrorMessage;
    this.statusCode = ERROR_CODE_NO_RIGHTS;
  }
}

module.exports = {
  NoRightsError,
};
