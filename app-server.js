const dotenv = require('dotenv').config(); //* loading dotenv for env variables
require('dotenv-expand').expand(dotenv); //* loading dotenv-expand to concat env variables

//! Imports
const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
require('./src/db/dbConnection');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/auth')(passport);

const adminRoutes = require('./src/http/routes/adminRoutes');
const routes = require('./src/http/routes/routes');
const usersRoutes = require('./src/http/routes/usersRoutes');

//! Configs
app.use(
  session({
    secret: 'andreoli',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use('/js', express.static(path.join(__dirname, '/public/js')));

app.engine('mustache', mustacheExpress({ defaultLayout: 'index' }));
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view options', { layout: 'layouts/index' });

//! Routes
app.use('/', routes);

app.use('/users', usersRoutes);

app.use('/admin', adminRoutes);

//! Starting Server
const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log('Server running on port', port);
});
