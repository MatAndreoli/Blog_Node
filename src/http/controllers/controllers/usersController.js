const userUC = require('../../../usecases/user/userUC');

exports.register = (_req, res) => {
  res.render('users/registerView');
};

exports.login = (_req, res) => {
  res.render('users/loginFormView');
};

exports.createAccount = (req, res) => {
  let errors = [];
  errors = userUC.validateUserValues([], req.body);

  if (errors.length > 0) {
    res.render('users/registerView', { errors, values: req.body });
    return;
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: 0,
  };
  userUC.addToDb(user, req, res);
};
