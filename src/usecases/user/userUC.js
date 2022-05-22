const mongoose = require('mongoose');
require('../../models/Users');
const Users = mongoose.model('users');
const bcrypt = require('bcryptjs');

const msg = require('../messages/messages');

exports.addToDb = async (payload, req, res) => {
  let user = { ...payload };

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(payload.password, salt, (err, hash) => {
      if (err) {
        msg.flashMsg(req, 'error_msg', 'Failed to make hash to password');
        res.redirect('/users/register');
        console.log('🚀Something happened', err.code);
      } else {
        user.password = hash;

        new Users({ ...user })
          .save()
          .then((user) => {
            msg.flashMsg(req, 'success_msg', 'User successfully created');
            res.redirect('/');
            console.log(`User '${user.name}' successfully created`);
          })
          .catch((err) => {
            err.code == 11000
              ? msg.flashMsg(req, 'error_msg', 'Email already taken')
              : msg.flashMsg(req, 'error_msg', 'Failed to create user');
            res.redirect('/users/register');
            console.log('🚀Something happened', err.code);
          });
      }
    });
  });
};

exports.validateUserValues = (errors, userValues) => {
  if (!userValues.name) {
    errors.push({ text: 'Invalid name' });
  }
  if (!userValues.email) {
    errors.push({ text: 'Invalid email' });
  }
  if (!userValues.password) {
    errors.push({ text: 'Invalid password' });
  }
  if (!userValues.password2) {
    errors.push({ text: 'Invalid confirmation password' });
  }
  if (userValues.password != userValues.password2) {
    errors.push({ text: 'Confirmation password is different' });
  }
  return errors;
};
