const msg = require('../usecases/messages/messages');

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
