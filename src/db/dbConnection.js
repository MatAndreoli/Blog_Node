const dotenv = require('dotenv').config();
require('dotenv-expand').expand(dotenv);
const mongoose = require('mongoose');

const connectURI =
process.env.NODE_ENV == 'prod'
? process.env.DB_URI
: process.env.DB_URI_LOCAL;

console.log('🚀 ==> connectURI', connectURI);
mongoose.Promise = global.Promise;
mongoose
  .connect(connectURI)
  .then(() => {
    console.log('Successfully connected to DB');
  })
  .catch((err) => {
    console.log('Something happened: ', err);
  });

module.exports = mongoose;
