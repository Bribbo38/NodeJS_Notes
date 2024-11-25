const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const isAuthenticated = require('./middleware/auth');
const isAdministrator = require('./middleware/admin');
const errors = require('./errors.js')
const User = require('./models/User');

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const notesRouter = require('./routes/notes');
const adminRouter = require('./routes/admin');
const { log } = require('console');

const app = express();

app.use(
  session({
    secret: 'session-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/your-database' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      res.locals.user = user;
    } catch (err) {
      console.error('Error retrieving user from session:', err);
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
});

app.use('/', indexRouter);
app.use('/profile', isAuthenticated, profileRouter);
app.use('/notes', isAuthenticated, notesRouter);
app.use('/admin', isAdministrator, adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  const message = errors[err.status] || 'An unexpected error occurred!';

  // set locals, only providing error in development
  res.locals.message = message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error', {user: req.session.user});
});

module.exports = app;