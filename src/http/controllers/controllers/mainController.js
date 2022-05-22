const postUC = require('../../../usecases/post/postUC');
const catUC = require('../../../usecases/category/catUC');

exports.main = async (_req, res) => {
  const posts = await postUC.findAll();
  res.render('layouts/index', { posts });
};

exports.moreAboutPost = async (req, res) => {
  const { slug } = req.params;
  let post = await postUC.findBySlug(slug, req, res);
  res.render('posts/postReadMoreView', { post });
};

exports.showCategories = async (_req, res) => {
  const cats = await catUC.findAll();
  res.render('categories/categoriesView', { cats });
};

exports.showPostsByCategory = async (req, res) => {
  const { slug } = req.params;
  var { postsByCategory, catFoundBySlug } = await catUC.findPostsByCategorySlug(
    slug,
    postUC,
    req,
    res
  );
  res.render('categories/postsByCategoryView', {
    postsByCategory,
    catFoundBySlug,
  });
};
