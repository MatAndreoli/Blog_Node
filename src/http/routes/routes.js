const { Router } = require('express');
const router = Router();

const mainController = require('../controllers/controllers/mainController');

router.get('/', mainController.main);

router.get('/posts/:slug', mainController.moreAboutPost);

module.exports = router;
