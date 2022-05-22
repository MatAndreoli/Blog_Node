const { Router } = require('express');
const router = Router();

const categoryController = require('../controllers/adminControllers/categoryControllers/categoryController');
const postController = require('../controllers/adminControllers/postsControllers/postController');

const prefix = {
  cats: 'cats',
  posts: 'posts',
};

router.get('/', categoryController.main);

//! Posts routes
router.get(`/${prefix.posts}`, postController.posts);

router.get(`/${prefix.posts}/add`, postController.addPost);

router.post(`/${prefix.posts}/new`, postController.createPost);

router.post(`/${prefix.posts}/edit`, postController.updatePost);

router.get(`/${prefix.posts}/edit/:id`, postController.editPost);

router.post(`/${prefix.posts}/delete`, postController.deleteById);

//! Categories routes
router.get(`/${prefix.cats}`, categoryController.cats);

router.get(`/${prefix.cats}/add`, categoryController.addCats);

router.post(`/${prefix.cats}/new`, categoryController.createCat);

router.post(`/${prefix.cats}/edit`, categoryController.updateCat);

router.get(`/${prefix.cats}/edit/:id`, categoryController.editCat);

router.post(`/${prefix.cats}/delete`, categoryController.deleteCat);

module.exports = router;
