const msg = require('../usecases/messages/messages');

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin == 1) {
      return next();
    }
    msg.flashMsg(req, 'error_msg', 'You should be an Admin to see that');
    res.redirect('/');
  } else {
    msg.flashMsg(req, 'error_msg', 'You should be logged in to see that');
    res.redirect('/users/login');
  }
};

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    msg.flashMsg(
      req,
      'error_msg',
      'You should not be logged in to crete an account'
    );
    res.redirect('/');
  } else {
    return next();
  }
};
