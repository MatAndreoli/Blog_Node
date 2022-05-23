const dotenv = require('dotenv').config();
require('dotenv-expand').expand(dotenv);
const mongoose = require('mongoose');

const makeURI = (username, password, serviceName, port) => {
  return `mongodb://${process.env[username]}:${process.env[password]}@${process.env[serviceName]}:${process.env[port]}/blog_project?authMechanism=DEFAULT&authSource=admin`;
};

const connectURI =
  process.env.NODE_ENV == 'production'
    ? makeURI('DB_USERNAME', 'DB_PASSWORD', 'DB_SERVICE_NAME', 'DB_PORT')
    : process.env.DB_URI_LOCAL;

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
