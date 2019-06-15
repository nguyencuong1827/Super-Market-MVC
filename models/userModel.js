var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var user = new Schema({
  id: String,
  name: {
    type: String,
    required: true
  },
  birthDay: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true
  },
  point: {
    type: Number,
    required: true
  }
}, { collection: 'users' });

const list = mongoose.model('users', user);

const saveUser = async (user) => {
  const newUser = new list(user);
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      if (err) {
        console.log(err);
      }
      newUser.password = hash;
      newUser.save(function (err) {
        if (err) {
          console.log(err);
          return false;
        } else {
          return true;
        }
      });
    });
  });
};

const validPassword = async (username, password) => {
  const user = await list.findOne({ 'username': username });
  if (!user)
    return false;
  return await bcrypt.compare(password, user.password);
};

const checkEmail = async (email) => {
  const user = await list.findOne({ 'email': email });
  if (!user)
    return true;
  return false;
};
const checkUsername = async (username) => {
  const user = await list.findOne({ 'username': username });
  if (!user)
    return true;
  return false;
};

module.exports = {
  list: list,
  saveUser: saveUser,
  validPassword: validPassword,
  checkEmail: checkEmail,
  checkUsername: checkUsername
};