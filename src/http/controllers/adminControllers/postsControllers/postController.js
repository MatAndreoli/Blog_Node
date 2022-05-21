const catUC = require('../../../../usecases/category/catUC');

exports.posts = (_req, res) => {
  res.render('admin/posts/postsView');
};

exports.addPost = async (_req, res) => {
  const categories = await catUC.findAll();
  res.render('admin/posts/addPostView', { categories });
};
