const mongoose = require('mongoose');
require('../../models/Category');
const Categoria = mongoose.model('categories');

exports.findAll = async () => {
  let categories;
  await Categoria.find()
    .sort({ date: 'desc' })
    .then((cats) => {
      categories = cats;
    })
    .catch((err) => {
      req.flash('error_msg', 'Failed to find categories');
      res.redirect('/admin/cats');
      console.log('🚀Something happened', err);
    });
  return categories;
};

exports.findById = async (id, req, res) => {
  let category;
  await Categoria.findById(id)
    .then((cat) => {
      category = cat;
      console.log(`Category '${cat.name}' was found`);
    })
    .catch((err) => {
      req.flash('error_msg', 'Failed to find category');
      res.redirect('/admin/cats');
      console.log('🚀Something happened', err);
    });
  return category;
};

exports.updateById = async (catUpdatedValues, req, res) => {
  await Categoria.findById(catUpdatedValues._id)
    .then((cat) => {
      cat.name = catUpdatedValues.name;
      cat.slug = catUpdatedValues.slug;
      cat
        .save()
        .then(() => {
          req.flash('success_msg', 'Category successfully updated');
          res.redirect('/admin/cats');
          console.log(`Category '${cat.name}' successfully updated`);
        })
        .catch((err) => {
          req.flash('error_msg', 'Failed to update category');
          res.redirect('/admin/cats');
          console.log('🚀Something happened', err);
        });
    })
    .catch((err) => {
      req.flash('error_msg', 'Failed to find category');
      res.redirect('/admin/cats');
      console.log('🚀Something happened', err);
    });
};

exports.addToDb = (payload, req, res) => {
  new Categoria({ ...payload })
    .save()
    .then(() => {
      req.flash('success_msg', 'Category successfully created');
      res.redirect('/admin/cats');
      console.log(`Category '${payload.name}' successfully created`);
    })
    .catch((err) => {
      req.flash('error_msg', 'Failed to create category');
      res.redirect('/admin/cats');
      console.log('🚀Something happened', err);
    });
};

exports.deleteById = async (id, req, res) => {
  const cat = await this.findById(req.body.id);
  Categoria.deleteOne({ _id: id })
    .then(() => {
      req.flash('success_msg', 'Category successfully deleted');
      res.redirect('/admin/cats');
      console.log(`Category '${cat.name}' was successfully deleted`);
    })
    .catch((err) => {
      req.flash('error_msg', 'Failed to delete category');
      res.redirect('/admin/cats');
      console.log('🚀Something happened', err);
    });
};

exports.validateNameAndSlug = (errors, categoryValues) => {
  if (!categoryValues.name) {
    errors.push({ text: 'Invalid Name' });
  }
  if (categoryValues.name.length < 4) {
    errors.push({ text: 'Category name is too small' });
  }
  if (!categoryValues.slug) {
    errors.push({ text: 'Invalid slug' });
  }
  return errors;
};
