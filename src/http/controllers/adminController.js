const catUC = require('../../usecases/category/catUC');

exports.main = (_req, res) => {
  res.render('admin/adminMain');
};

exports.posts = (_req, res) => {
  res.render('admin/posts');
};

exports.cats = async (req, res) => {
  const categories = await catUC.findAll(req, res);
  res.render('admin/categories', { categories });
};

exports.addCats = (_req, res) => {
  res.render('admin/addCats');
};

exports.createCat = (req, res) => {
  var errors = [];

  if (!req.body.name) {
    errors.push({ text: 'Invalid Name' });
  }
  if (req.body.name.length < 4) {
    errors.push({ text: 'Category name is too small' });
  }
  if (!req.body.slug) {
    errors.push({ text: 'Invalid slug' });
  }

  if (errors.length > 0) {
    res.render('admin/addCats', { errors });
    return;
  }

  req.flash('success_msg', 'Category successfully created');
  const newCategoria = {
    name: req.body.name,
    slug: req.body.slug,
  };
  res.redirect('/admin/cats');
  catUC.addToDb(newCategoria, req, res);
};
