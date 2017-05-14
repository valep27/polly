const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = Promise;
const async = require('async');

const routes = require('./app/routes');


async.series([
  (callback) => {
    //Set up mongoose connection
    let mongoDB = 'localhost';
    let db = mongoose.connection;

    let connect = mongoose.connect(mongoDB);

    connect
      .then(() => { callback(); })
      .catch((error) => {
        console.error(error.message);
        process.abort();
      });
  },
  (callback) => {
    // express setup
    app.set('views', path.join(__dirname, 'app/views'));
    app.set('view engine', 'hbs');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    callback(null, null);
  },
  (callback) => {
    // setup routes
    app.use(routes);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    callback(null, null);
  }
], (error, result) => {
  console.log('Server up and running');
});

module.exports = app;