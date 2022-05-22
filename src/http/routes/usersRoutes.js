const { Router } = require('express');
const router = Router();
const passport = require('passport');

const isAuthenticatedMid = require('../../middlewares/isAuthenticated');
const userController = require('../controllers/controllers/usersController');

router.get('/register', isAuthenticatedMid.isAuthenticated, userController.register);

router.post('/create-account', userController.createAccount);

router.get('/login', userController.login);

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

router.get('/logout', userController.logout);

module.exports = router;
