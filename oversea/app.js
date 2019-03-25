var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/scss', express.static(path.join(__dirname, 'scss')));
app.use('/static/loglevel', express.static(path.join(__dirname, 'node_modules/loglevel/dist')));
app.use('/static/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/static/popper', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd')));
app.use('/static/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/static/bootstrap-select', express.static(path.join(__dirname, 'node_modules/bootstrap-select/dist')));
app.use('/static/fontawesome-free', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));
app.use('/static/chart.js', express.static(path.join(__dirname, 'node_modules/chart.js/dist')));
app.use('/static/chartjs-plugin-datalabels', express.static(path.join(__dirname, 'node_modules/chartjs-plugin-datalabels/dist')));
app.use('/static/moment', express.static(path.join(__dirname, 'node_modules/moment')));
app.use('/static/daterangepicker', express.static(path.join(__dirname, 'node_modules/daterangepicker')));
app.use('/static/datatables', express.static(path.join(__dirname, 'node_modules/datatables/media')));
app.use('/static/autocomplete.js', express.static(path.join(__dirname, 'node_modules/autocomplete.js/dist')));
app.use('/static/fine-uploader', express.static(path.join(__dirname, 'node_modules/fine-uploader/jquery.fine-uploader')));
app.use('/static/sortablejs', express.static(path.join(__dirname, 'node_modules/sortablejs')));

app.use('/', require('./routes/index'));

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
