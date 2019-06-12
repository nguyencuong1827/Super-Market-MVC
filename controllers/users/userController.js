const user = require('../../models/userModel');
const bcrypt = require('bcryptjs');
//Login page
exports.login_page = function (req, res) {
    res.render('user/login', { message: req.flash('message') });
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
    const password2 = req.body.password2;
    const checkEmail = user.checkEmail(email);
    const checkUsername = user.checkUsername(username);

    req.checkBody('password2', 'Xác nhận mật khẩu không đúng').equals(req.body.password);
    req.checkBody('email', 'Email đã tồn tại').equals(checkEmail);
    req.checkBody('username', 'Tài khoản đã tồn tại').equals(checkUsername);
    let errors = req.validationErrors();
     console.log(checkEmail);
     console.log(checkUsername);
    if (errors) {
        res.render('user/register', { errors: errors });
    }
    else {
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





        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        req.flash('message', 'Đăng ký thành công');
                        res.redirect('/user/login');
                    }
                });
            });
        });
    }
};


exports.forgotPassword_page = function (req, res) {
    res.render('user/forgotPassword');
};

