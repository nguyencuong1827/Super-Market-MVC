var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var app = express();

// connect to mongodb
/*
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://nguyencuong1827:cuongkhtn1997@cluster0-5gcvu.mongodb.net/Super-Market?w=majority').then(
  ()=>{
    console.log("Connect data successfully");
  },
  err=>{
    console.log("Connect data failed...");
  }
);*/
var mongoose = require('mongoose');
mongoose.Promise = Promise;

const run = async () => {
  await mongoose.connect('mongodb+srv://nguyencuong1827:cuongkhtn1997@cluster0-5gcvu.mongodb.net/Super-Market', {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: 1000000,
    reconnectInterval: 3000
  })
}
run().catch(error => console.error(error))





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

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
