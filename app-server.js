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

const adminRoutes = require('./src/http/routes/adminRoutes');

//! Configs
app.use(
  session({
    secret: 'andreoli',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
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
const g = (_req, res) => {
  res.render('layouts/index');
};
app.get(
  '/',
  (req, res, next) => {
    if (req.headers.key == 123456) {
      console.log("🚀Hey there, I' a middleware");
      next();
      return;
    }
    console.log('Not allowed!!');
  },
  g
);

app.use('/admin', adminRoutes);

//? Starting Server
const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log('Server running on port', port);
});
