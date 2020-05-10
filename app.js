const express = require('express');
const app = express();

const db = require('./db');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const sessionsRouter = require('./routes/sessions');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/user', usersRouter);
app.use('/sessions', sessionsRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: "ERROR: "+error.message
    }
  });
});
module.exports = app;
