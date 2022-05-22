const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../src/models/Users');

const User = mongoose.model('users');
module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: 'email', passwordField: 'password' },
      (email, password, done) => {
        User.findOne({ email }).then((user) => {
          if (!user) {
            return done(null, false, { message: "This account does't exist" });
          }
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              return done(null, user);
            }
            return done(null, false, { message: 'Incorrect password' });
          });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
