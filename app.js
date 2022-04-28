
require('./db');
require('./auth');

const passport = require('passport');
const express = require('express');
const hb = require('hbs');
const moment = require("moment");
const tablesort = require('tablesort');


//ideas from https://blog.8bitzen.com/posts/01-07-2020-define-handlebars-helper-to-format-date
hb.registerHelper('dateFormat', function (date, options) {
  const formatToUse = (arguments[1] && arguments[1].hash && arguments[1].hash.format) || "MM/DD/YYYY"
  return moment(date).format(formatToUse);
});

const routes = require('./routes/index');
const listItem = require('./routes/expenses');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));

app.use(express.urlencoded({ extended: true }));

//static file setup
const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', routes);
app.use('/expenses', listItem);
//app.use('/list-item', listItem);

app.listen(process.env.PORT || 3000);
