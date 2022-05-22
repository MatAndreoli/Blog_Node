const { Router } = require('express');
const router = Router();

const userController = require('../controllers/controllers/usersController');

router.get('/register', userController.register);

router.post('/create-account', userController.createAccount);

module.exports = router;
