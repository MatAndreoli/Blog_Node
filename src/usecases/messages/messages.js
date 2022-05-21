exports.flashMsg = (req, name, msg) => {
  req.flash(name, msg);
};
