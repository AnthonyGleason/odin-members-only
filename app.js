require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//setup express session
const session = require('express-session');
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}))

//setup passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(async (user,pass,done)=>{
  const userObj = await getUser(user);
  if (!userObj) return done(null,false,{message: 'incorrect username'});
  return done(null,userObj);
  //store sessions in a seperate doc
}));

passport.serializeUser((user,done)=>{
  /* gets return value from local strategy done function (which in this case is the user object)
  sets document id as the serialized id */
  done(null,user._id);
});

passport.deserializeUser(async (id,done)=>{
  const userObj = await getUserByDocID(id);
  return done(null,userObj);
});

//routers
app.use('/', indexRouter);

//setup mongoose
const mongoose= require('mongoose');
const { getUser, getUserByDocID } = require('./controllers/User');
mongoose.connect(process.env.DATABASE_URL, console.log('connected'));

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

module.exports = app;
