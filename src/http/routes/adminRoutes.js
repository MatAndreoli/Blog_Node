const { Router } = require('express');
const router = Router();

const adminController = require('../controllers/adminController');

router.get('/', adminController.main);

router.get('/posts', adminController.posts);

router.get('/cats', adminController.cats);

router.get('/cats/add', adminController.addCats);

router.post('/cats/new', adminController.createCat);

module.exports = router;
