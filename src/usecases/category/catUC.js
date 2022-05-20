const mongoose = require('mongoose');
require('../../models/Category');
const Categoria = mongoose.model('categories');

exports.findAll = async (req, res) => {
  let categories;
  await Categoria.find()
    .sort({ date: 'desc' })
    .then((cats) => {
      categories = cats;
    })
    .catch((err) => {
      req.flash('error_msg', 'Error finding all the categories');
      console.log('🚀Something happened', err);
      res.redirect('/admin');
    });
  return categories;
};

exports.addToDb = (payload, req, res) => {
  new Categoria({ ...payload })
    .save()
    .then(() => {
      console.log('Category saved successfully');
    })
    .catch((err) => {
      req.flash('error_msg', 'Failed to create the category');
      res.redirect('/admin');
      console.log('🚀Something happened', err);
    });
};
