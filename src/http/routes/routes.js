const { Router } = require('express');
const router = Router();

const mainController = require('../controllers/controllers/mainController');

router.get('/', mainController.main);

router.get('/posts/:slug', mainController.moreAboutPost);

router.get('/cats', mainController.showCategories);

router.get('/cats/:slug', mainController.showPostsByCategory);

module.exports = router;
