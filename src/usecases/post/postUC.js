const mongoose = require('mongoose');
require('../../models/Posts');
const Posts = mongoose.model('posts');

const msg = require('../messages/messages');

exports.findAll = async () => {
  let posts;
  await Posts.find()
    .populate('category')
    .sort({ date: 'desc' })
    .then((pst) => {
      posts = pst;
    })
    .catch((err) => {
      console.log('🚀Something happened', err);
    });
  return posts;
};

exports.addToDb = (payload, req, res) => {
  new Posts({ ...payload })
    .save()
    .then(() => {
      msg.flashMsg(req, 'success_msg', 'Post successfully created');
      res.redirect('/admin/posts');
      console.log(`Post '${payload.title}' successfully created`);
    })
    .catch((err) => {
      msg.flashMsg(req, 'error_msg', 'Failed to create post');
      res.redirect('/admin/post');
      console.log('🚀Something happened', err.code);
    });
};

exports.validatePostValues = (errors, postValues) => {
  if (!postValues.title) {
    errors.push({ text: 'Invalid title' });
  }
  if (!postValues.slug) {
    errors.push({ text: 'Invalid slug' });
  }
  if (!postValues.description) {
    errors.push({ text: 'Invalid description' });
  }
  if (!postValues.content) {
    errors.push({ text: 'Invalid content' });
  }
  if (postValues.category == 0) {
    errors.push({ text: 'Invalid category' });
  }
  return errors;
};
