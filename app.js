// Import of node libraries used in the project

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Routes - these are URL paths

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// Connect to database
const mongoDB = 'mongodb://localhost/express-locallibrary-tutorial'; // Config - location of database
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MondoDB connection error:'));

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Adds middleware libraries into the request handling chain.

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express.static middleware to get Expresse to serve all static files in the public directly.

app.use(express.static(path.join(__dirname, 'public')));

// Routes for various parts of the site. The route names are defined above.

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
