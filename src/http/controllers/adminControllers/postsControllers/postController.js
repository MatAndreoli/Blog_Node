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
