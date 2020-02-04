if(process.env.NODE_ENV!=='production'){
  require('dotenv').config();
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authenRouter = require('./routes/authentication');
var registerRouter = require('./routes/register');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
require('./passport-config')(passport);
var app = express();

const sequelize = require('./server');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', authenRouter);
app.use('/', registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});
//middleware
// app.use(bodyParser());
module.exports = app;
