const postUC = require('../../../usecases/post/postUC');

exports.main = async (_req, res) => {
  const posts = await postUC.findAll();
  res.render('layouts/index', { posts });
};

exports.moreAboutPost = async (req, res) => {
  const { slug } = req.params;
  let post = await postUC.findBySlug(slug, req, res);
  res.render('posts/postReadMoreView', { post });
};
