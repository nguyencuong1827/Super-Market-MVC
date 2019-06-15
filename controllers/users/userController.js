const user = require('../../models/userModel');
const bcrypt = require('bcryptjs');
//Login page
exports.login_page = function (req, res) {
    res.render('user/login', { error: req.flash('loginMessage'), success: req.flash('registerMessage')});
};

//Register page
exports.register_page = function (req, res) {
    res.render('user/register');
};
//Register process
exports.register_process = function (req, res) {
    const name = req.body.name;
    const birthDay = req.body.birthDay;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    let newUser = new user.list({
        name: name,
        birthDay: birthDay,
        gender: gender,
        phoneNumber: phoneNumber,
        email: email,
        username: username,
        password: password,
        dateCreated: Date.now(),
        point: 0
    });
    if (user.saveUser(newUser)) {
        req.flash('registerMessage', 'Đăng ký thành công');
        res.redirect('/user/login');
    }


};

exports.logout_page = function (req, res) {
    req.logout();
    res.redirect('/user/login');
}


exports.forgotPassword_page = function (req, res) {
    res.render('user/forgotPassword');
};

