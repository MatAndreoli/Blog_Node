const catUC = require('../../usecases/category/catUC');

exports.main = (_req, res) => {
  res.render('admin/adminMainView');
};

exports.posts = (_req, res) => {
  res.render('admin/postsView');
};

exports.cats = async (req, res) => {
  const categories = await catUC.findAll(req, res);
  res.render('admin/categoriesView', { categories });
};

exports.addCats = (_req, res) => {
  res.render('admin/addCatsView');
};

exports.editCat = async (req, res) => {
  const _id = req.params.id;
  const catFound = await catUC.findById(_id, req, res);
  res.render('admin/editCategoryView', { catFound });
};

exports.updateCat = async (req, res) => {
  var errors = [];

  errors = catUC.validateNameAndSlug([], req.body);

  catFound = { _id: req.body.id, name: req.body.name, slug: req.body.slug };
  if (errors.length > 0) {
    res.render('admin/editCategoryView', { errors, catFound });
    return;
  }

  req.flash('success_msg', 'Category successfully updated');
  const updatedCategory = { ...catFound };
  res.redirect('/admin/cats');
  catUC.updateById(updatedCategory, req, res);
};

exports.createCat = (req, res) => {
  var errors = [];

  errors = catUC.validateNameAndSlug([], req.body);

  if (errors.length > 0) {
    res.render('admin/addCatsView', { errors });
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
