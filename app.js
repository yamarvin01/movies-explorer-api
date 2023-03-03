require('dotenv').config();
const process = require('process');

const {
  PORT = 3000,
  DATA_BASE_PROD,
  NODE_ENV = 'development',
  DATA_BASE_DEV = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { handleErrors, handleUncaughtException } = require('./src/errors/handleErrors');
const mainRoutes = require('./src/routes/index');
const cors = require('./src/middlewares/cors');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const { limiter } = require('./src/rate-limit/rate-limit');

const app = express();

mongoose.connect(
  NODE_ENV === 'production' ? DATA_BASE_PROD : DATA_BASE_DEV,
  { useNewUrlParser: true },
);
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(mainRoutes);
app.use(errorLogger);
process.on('uncaughtException', handleUncaughtException);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
