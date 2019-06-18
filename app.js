var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
var hbs = require('hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var productsRouter = require('./routes/products');
const apiUserRouter = require('./routes/api/userAPI');
const apiProductRouter = require('./routes/api/productAPI');

require('./config/passport')(passport);

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
const option = {
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: 1000000,
  reconnectInterval: 3000
};
const run = async () => {
  await mongoose.connect('mongodb+srv://nguyencuong1827:cuongkhtn1997@cluster0-5gcvu.mongodb.net/Super-Market', option);
}
run().catch(error => console.error(error));



var blocks = {};

hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }

  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});
hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
      case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
          return options.inverse(this);
  }
});

hbs.registerHelper('getPrice', function (price ,sale, options) {
  var value = 0;
  if(sale > 0){
    value = price - (price * (sale/100));
  }
   // Parse to float
   var result = parseFloat(value);
 
   // Formats the number with the decimals
   var num = result.toFixed(0);
 
   // Returns the formatted number
   return  num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

hbs.registerHelper('isSale', function (sale, options) {
  const value = parseFloat(sale);
  return (value > 0 && value < 100) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('isNotSale', function (sale, options) {
  const value = parseFloat(sale);
  return (value <= 0 || value >= 100) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('math', function (vl1, operator, vl2, options) {
  const value1 = parseFloat(vl1);
  const value2 = parseFloat(vl2);
  return {
    "+": value1 + value2,
    "-": value1 - value2,
    "*": value1 * value2,
    "/": value1 / value2,
    "%": value1 % value2
}[operator];
});

hbs.registerHelper('numberFormat', function (value, options) {
  // Parse to float
  var value = parseFloat(value);
 
  // Formats the number with the decimals
  var num = value.toFixed(0);

  // Returns the formatted number
  return  num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

hbs.registerHelper('categoryEN', function (value, options) {
  switch(value){
    case 'Thịt cá': 
      return 'meat';
    case 'Đồ khô':
      return 'dry';
    case 'Gạo':
      return 'rice';
    case 'Rau củ':
      return 'vegetable';
    case 'Đồ dùng bếp':
      return 'kitchen';
    case 'Phòng ăn':
      return 'diningRoom';
    case 'Đèn diện':
      return 'light';
    case 'Vệ sinh nhà cửa':
      return 'cleaning';
    case 'Dầu gội':
      return 'shampoo';
    case 'Đồ dùng':
      return 'utensil';
    case 'Phấn':
      return 'powder';
    case 'Sữa':
      return 'milk';
    case 'Nước suối':
      return 'springWater';
    case 'Nước ngọt':
      return 'soft';
    case 'Bia rượu':
      return 'alcohol';
    case 'Nước yến':
      return 'nest';
    case 'Ăn vặt':
      return 'gourmet';
    case 'Khác':
      return 'other';
    default: return '';
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Express Session Middleware


// Express Messages Middleware

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Passport Config
// Passport Middleware


app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/products', productsRouter);
app.use('/api/userAPI', apiUserRouter);
app.use('/api/productAPI', apiProductRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(req.originalUrl);
  next(createError(404));
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

module.exports = app;
