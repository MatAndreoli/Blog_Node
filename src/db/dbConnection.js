const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('Successfully connected to DB');
  })
  .catch((err) => {
    console.log('Something happened: ', err);
  });

module.exports = mongoose;
