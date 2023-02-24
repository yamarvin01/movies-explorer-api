/* eslint-disable no-useless-escape */
const urlRegExp = /https?:\/\/(www\.)?[\w\-]+\.[\w\-]+\/*[\w\-\/\.\+\(\)\[\]~:?#@!$&'*,;=]*#?/;
const emailRegExp = /[\w\-\_\.]+@[\w\-\_\.]+\.[\w\-\_\.]+/;

module.exports = {
  urlRegExp,
  emailRegExp,
};
