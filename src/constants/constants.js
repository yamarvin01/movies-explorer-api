const urlRegExp = /https?:\/\/[\w-]+\.[\w-]+\/?.*#?/;

const duplicateEmailErrorMessage = 'Пользователь с данным email уже существует';
const failAuthErrorMessage = 'Не правильные почта или пароль';
const needAuthErrorMessage = 'Необходима авторизация';
const noRightsErrorMessage = 'Не достаточно прав';
const notFoundDataErrorMessage = 'Запрашиваемые данные не найдены';
const notFoundPageErrorMessage = 'Страница по указанному маршруту не найдена';
const serverErrorMessage = 'На сервере произошла ошибка';
const userExistErrorMessage = 'Пользователь уже существует';
const validationErrorMessage = 'Переданы некорректные данные';

module.exports = {
  urlRegExp,
  duplicateEmailErrorMessage,
  failAuthErrorMessage,
  needAuthErrorMessage,
  noRightsErrorMessage,
  notFoundDataErrorMessage,
  notFoundPageErrorMessage,
  serverErrorMessage,
  userExistErrorMessage,
  validationErrorMessage,
};
