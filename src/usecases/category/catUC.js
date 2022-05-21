const mongoose = require('mongoose');
require('../../models/Category');
const Categoria = mongoose.model('categories');

const msg = require('../messages/messages');

exports.findAll = async () => {
  let categories;
  await Categoria.find()
    .sort({ date: 'desc' })
    .then((cats) => {
      categories = cats;
    })
    .catch((err) => {
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
      msg.flashMsg(req, 'error_msg', 'Failed to find category');
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
          msg.flashMsg(req, 'success_msg', 'Category successfully updated');
          res.redirect('/admin/cats');
          console.log(`Category '${cat.name}' successfully updated`);
        })
        .catch((err) => {
          msg.flashMsg(req, 'error_msg', 'Failed to update category');
          res.redirect('/admin/cats');
          console.log('🚀Something happened', err);
        });
    })
    .catch((err) => {
      msg.flashMsg(req, 'error_msg', 'Failed to find category');
      res.redirect('/admin/cats');
      console.log('🚀Something happened', err);
    });
};

exports.addToDb = (payload, req, res) => {
  new Categoria({ ...payload })
    .save()
    .then(() => {
      msg.flashMsg(req, 'success_msg', 'Category successfully created');
      res.redirect('/admin/cats');
      console.log(`Category '${payload.name}' successfully created`);
    })
    .catch((err) => {
      err.code == 11000
        ? msg.flashMsg(req, 'error_msg', 'Category name already taken')
        : msg.flashMsg(req, 'error_msg', 'Failed to create category');
      res.redirect('/admin/cats');
      console.log('🚀Something happened', err.code);
    });
};

exports.deleteById = async (id, req, res) => {
  const cat = await this.findById(req.body.id);
  Categoria.deleteOne({ _id: id })
    .then(() => {
      msg.flashMsg(req, 'success_msg', 'Category successfully deleted');
      res.redirect('/admin/cats');
      console.log(`Category '${cat.name}' was successfully deleted`);
    })
    .catch((err) => {
      msg.flashMsg(req, 'error_msg', 'Failed to delete category');
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
