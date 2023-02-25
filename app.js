require('dotenv').config();

const express = require('express');
const process = require('process');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { NotFoundError } = require('./src/errors/notFoundError');
const { handleErrors, handleUncaughtException } = require('./src/errors/handleErrors');

const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');
const movieRoutes = require('./src/routes/movies');
const auth = require('./src/middlewares/auth');
const cors = require('./src/middlewares/cors');

const { requestLogger, errorLogger } = require('./src/middlewares/logger');

const app = express();

mongoose.connect(
  'mongodb://localhost:27017/bitfilmsdb',
  { useNewUrlParser: true },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB, bitfilmsdb!');
  },
);

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', authRoutes);
app.use(auth);
app.use('/', userRoutes);
app.use('/', movieRoutes);
app.use(() => { throw new NotFoundError('Страница по указанному маршруту не найдена'); });
app.use(errorLogger);

process.on('uncaughtException', handleUncaughtException);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
