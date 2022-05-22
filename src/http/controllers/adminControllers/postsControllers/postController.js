const catUC = require('../../../../usecases/category/catUC');
const postUC = require('../../../../usecases/post/postUC');

exports.posts = async (_req, res) => {
  const posts = await postUC.findAll();
  res.render('admin/posts/postsView', { posts });
};

exports.addPost = async (_req, res) => {
  const categories = await catUC.findAll();
  res.render('admin/posts/addPostView', { categories });
};

exports.createPost = async (req, res) => {
  var errors = [];
  const categories = await catUC.findAll();

  errors = postUC.validatePostValues([], { ...req.body });

  if (errors.length > 0) {
    res.render('admin/posts/addPostView', { errors, categories });
    return;
  }
  const post = {
    title: req.body.title,
    slug: req.body.slug,
    description: req.body.description,
    content: req.body.content,
    category: req.body.category,
  };
  postUC.addToDb(post, req, res);
};

exports.editPost = async (req, res) => {
  const _id = req.params.id;

  const postFound = await postUC.findById(_id, req, res);
  const postCat = await catUC.findById(postFound.category, req, res);
  const catFoundAll = await catUC.findAll();

  res.render('admin/posts/editPostView', { postFound, catFoundAll, postCat });
};

exports.updatePost = async (req, res) => {
  var errors = [];

  errors = postUC.validatePostValues([], req.body);

  const postFound = {
    _id: req.body.id,
    title: req.body.title,
    slug: req.body.slug,
    description: req.body.description,
    content: req.body.content,
    category: req.body.category,
  };

  const postCat = await catUC.findById(postFound.category, req, res);
  if (errors.length > 0) {
    res.render('admin/posts/editPostView', { errors, postFound, postCat });
    return;
  }

  const updatedPost = { ...postFound };
  console.log('🚀 ==> updatedPost', updatedPost);
  postUC.updateById(updatedPost, req, res);
};

exports.deleteById = (req, res) => {
  const { id } = req.body;
  postUC.deleteById(id, req, res);
};
