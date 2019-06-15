const User = require('../../models/userModel');

exports.checkEmail = async (req, res, next) => {
  const userExist = await User.checkEmail(req.query.email);
  res.json(userExist);
};
exports.checkUsername = async (req, res, next) => {
  const userExist = await User.checkUsername(req.query.username);
  res.json(userExist);
};