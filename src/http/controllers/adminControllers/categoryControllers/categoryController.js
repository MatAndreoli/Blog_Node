const catUC = require('../../../../usecases/category/catUC');

exports.main = (_req, res) => {
  res.render('admin/adminMainView');
};

exports.cats = async (_req, res) => {
  const categories = await catUC.findAll();
  res.render('admin/categories/categoriesView', { categories });
};

exports.addCats = (_req, res) => {
  res.render('admin/categories/addCatsView');
};

exports.editCat = async (req, res) => {
  const _id = req.params.id;
  const catFound = await catUC.findById(_id, req, res);
  res.render('admin/categories/editCategoryView', { catFound });
};

exports.deleteCat = (req, res) => {
  const { id } = req.body;
  catUC.deleteById(id, req, res);
};

exports.updateCat = async (req, res) => {
  var errors = [];

  errors = catUC.validateNameAndSlug([], req.body);

  catFound = { _id: req.body.id, name: req.body.name, slug: req.body.slug };
  if (errors.length > 0) {
    res.render('admin/categories/editCategoryView', { errors, catFound });
    return;
  }

  const updatedCategory = { ...catFound };
  catUC.updateById(updatedCategory, req, res);
};

exports.createCat = (req, res) => {
  var errors = [];

  errors = catUC.validateNameAndSlug([], req.body);

  if (errors.length > 0) {
    res.render('admin/addCatsView', { errors });
    return;
  }

  const newCategoria = {
    name: req.body.name,
    slug: req.body.slug,
  };
  catUC.addToDb(newCategoria, req, res);
};
