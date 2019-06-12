var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var user = new Schema({
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



const getUser = async (email) => {
  return await list.findOne({'email': email});
};
const validPassword = async (email, password) => {
  const user = await getUser(email);
  if (!user)
      return false;
  return await bcrypt.compare(password, user.pass);
};

const checkEmail = function (email) {
  const user =  list.findOne({'email': email});
  if (user){
    console.log(user.email);
    return user.email;
  }
      
  return "";
}
const checkUsername = function (username)  {
  const user =  list.findOne({'username': username});
  if (user)
      return user.username;
  return "";
}


module.exports = {
  list : list,
  getUser : getUser,
  validPassword : validPassword,
  checkEmail : checkEmail,
  checkUsername : checkUsername
}

