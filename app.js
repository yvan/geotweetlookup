var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var twitter = require('twitter')
var mongo = require('mongodb')
var monk = require('monk')


var db = monk('localhost:27017/geotweetlookup')
var twitterclient = new twitter({

  consumer_key: 'l85XrCLm1FYt91DYcbpo2b3C1',
  consumer_secret: '8HAGhoibG3eYI7CTkYbq3JoQyhnWWut9In66qqmfxW3AYZM19A',
  access_token_key: '491074580-8fykmylpsCtsvU8iKrLWmRg32wg6BUKqV4adjUO5',
  access_token_secret: '0SpU0OQtXV5rpOYtNs4JnuEWnGNPqoKHUWSPwxeojjT3U'
})

var routes = require('./routes/index')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  req.twitterclient = twitterclient
  next()
})

app.use(function(req, res, next){
  req.db = db
  next()
})

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
