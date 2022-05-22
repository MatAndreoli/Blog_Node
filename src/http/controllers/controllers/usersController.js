const userUC = require('../../../usecases/user/userUC');
const msg = require('../../../usecases/messages/messages');

exports.register = (_req, res) => {
  res.render('users/registerView');
};

exports.login = (_req, res) => {
  res.render('users/loginFormView');
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  msg.flashMsg(req, 'success_msg', 'Logged out');
  res.redirect('/');
};

exports.createAccount = (req, res) => {
  let errors = [];
  errors = userUC.validateUserValues([], req.body);

  if (errors.length > 0) {
    res.render('users/registerView', { errors, values: req.body });
    return;
  }

  const adminEmailPattern = /^.*@admin.adm$/;
  const adminEmail = adminEmailPattern.test(req.body.email);

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: adminEmail ? 1 : 0,
  };

  userUC.addToDb(user, req, res);
};
