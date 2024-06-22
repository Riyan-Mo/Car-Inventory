require("dotenv/config")

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const compression = require("compression");

var indexRouter = require('./routes/index');
const carsRouter = require('./routes/cars');
const companyRouter = require('./routes/company');
const carTypeRouter = require('./routes/cartypes');
const { default: mongoose } = require('mongoose');
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet")

var app = express();
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
});

app.use(limiter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com",
        "cdn.jsdelivr.net"
      ],
    }
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression())

app.use('/', indexRouter);
app.use('/cars', carsRouter);
app.use('/company', companyRouter);
app.use('/types', carTypeRouter);

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

async function connect(){
  const url = process.env.MONGODB_URI;
  mongoose.set("strictPopulate", false);
  try{
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  }
  catch(error){
    console.log("Error connecting to MongoDB ", error);
  }
}

connect();

module.exports = app;
