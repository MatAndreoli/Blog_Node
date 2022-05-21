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
      console.log('🚀Something happened', err);
    });
  return categories;
};

exports.findById = async (id) => {
  let category;
  await Categoria.findById(id)
    .then((cat) => {
      category = cat;
    })
    .catch((err) => {
      console.log('🚀Something happened', err);
    });
  return category;
};

exports.updateById = async (catUpdatedValues) => {
  await Categoria.findById(catUpdatedValues._id)
    .then((cat) => {
      cat.name = catUpdatedValues.name;
      cat.slug = catUpdatedValues.slug;
      cat
        .save()
        .then(() => {
          console.log('Category successfully updated');
        })
        .catch((err) => {
          console.log('🚀Something happened', err);
        });
    })
    .catch((err) => {
      console.log('🚀Something happened', err);
    });
};

exports.addToDb = (payload) => {
  new Categoria({ ...payload })
    .save()
    .then(() => {
      console.log('Category saved successfully');
    })
    .catch((err) => {
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
