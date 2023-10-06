var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fetch = require('axios')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const catsRouter = require('.routes/cats');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// create a GET route for cats/facts
// app.get('/', (req, res) => {
//   res.send('');
// });

app.get('/cats/fact', async function(req,res){
  const apiResponse = await fetch('https://catfact.ninja/fact');
  let catFact = apiResponse.data.fact;
  res.render('cat-fact', { catFact });
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/cats', catsRouter)

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
