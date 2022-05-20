const mongoose = require('mongoose');

console.log('🚀 ==> process.env.DB_URI', process.env.DB_URI);
mongodb: mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('Successfully connected to DB');
  })
  .catch((err) => {
    console.log('Something happened: ', err);
  });

const UserSchema = mongoose.Schema({
  _login: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
  },
});

mongoose.model('Users', UserSchema);

const Matheus = mongoose.model('Users');

// new Matheus({
//   _login: 'thiago',
//   name: 'ssfadfdss',
//   nickname: 'fafdf',
//   email: 'tesfadfadft@fafd.com',
//   age: 138,
//   country: 'fdafdf',
// })
//   .save()
//   .then(() => {
//     console.log('User registered');
//   })
//   .catch((err) => console.log('🚀 ==> err', err));

module.exports = mongoose;
