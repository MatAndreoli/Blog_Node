const { Router } = require('express');
const router = Router();
const passport = require('passport');

const userController = require('../controllers/controllers/usersController');

router.get('/register', userController.register);

router.post('/create-account', userController.createAccount);

router.get('/login', userController.login);

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
