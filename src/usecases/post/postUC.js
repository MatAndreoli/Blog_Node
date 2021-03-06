const mongoose = require('mongoose');
require('../../models/Posts');
const Posts = mongoose.model('posts');

const msg = require('../messages/messages');

exports.findAll = async () => {
  return await Posts.find()
    .populate('category')
    .sort({ date: 'desc' })
    .then((pst) => {
      return pst;
    })
    .catch((err) => {
      console.log('🚀Something happened', err);
    });
};

exports.findById = async (id, req, res) => {
  return await Posts.findById(id)
    .then((post) => {
      console.log(`Post '${post.title}' was found`);
      return post;
    })
    .catch((err) => {
      msg.flashMsg(req, 'error_msg', 'Failed to find Post');
      res.redirect('/admin/posts');
      console.log('🚀Something happened', err);
    });
};

exports.findBySlug = async (slug, req, res) => {
  return await Posts.findOne({ slug })
    .populate('category')
    .then((post) => {
      console.log(`Post '${post.title}' was found by slug`);
      return post;
    })
    .catch((err) => {
      msg.flashMsg(req, 'error_msg', 'Failed to find post by slug');
      res.redirect('/');
      console.log('🚀Something happened', err);
    });
};

exports.findPostsByCategoryId = async (category, req, res) => {
  return await Posts.find({ category })
    .populate('category')
    .then((posts) => {
      posts.forEach((post) => {
        console.log(`Post '${post.title}' was found by category id`);
      });
      return posts;
    })
    .catch((err) => {
      msg.flashMsg(req, 'error_msg', 'Failed to find post by category id');
      res.redirect('/');
      console.log('🚀Something happened', err);
    });
};

exports.updateById = async (postUpdatedValues, req, res) => {
  await Posts.findById(postUpdatedValues._id)
    .then((post) => {
      post.title = postUpdatedValues.title;
      post.slug = postUpdatedValues.slug;
      post.content = postUpdatedValues.content;
      post.description = postUpdatedValues.description;
      post.category = postUpdatedValues.category;

      post
        .save()
        .then(() => {
          msg.flashMsg(req, 'success_msg', 'Post successfully updated');
          res.redirect('/admin/posts');
          console.log(`Post '${post.title}' successfully updated`);
        })
        .catch((err) => {
          msg.flashMsg(req, 'error_msg', 'Failed to update post');
          res.redirect('/admin/posts');
          console.log('🚀Something happened', err);
        });
    })
    .catch((err) => {
      msg.flashMsg(req, 'error_msg', 'Failed to find post');
      res.redirect('/admin/posts');
      console.log('🚀Something happened', err);
    });
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

exports.deleteById = async (id, req, res) => {
  const post = await this.findById(id);
  Posts.deleteOne({ _id: id })
    .then(() => {
      msg.flashMsg(req, 'success_msg', 'Post successfully deleted');
      res.redirect('/admin/posts');
      console.log(`Post '${post.title}' was successfully deleted`);
    })
    .catch((err) => {
      msg.flashMsg(req, 'error_msg', 'Failed to delete Post');
      res.redirect('/admin/posts');
      console.log('🚀Something happened', err);
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
