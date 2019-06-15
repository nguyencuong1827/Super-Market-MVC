const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

module.exports = function (passport) {
    passport.use('local-login', new LocalStrategy({ usernameField: 'username', passwordField: 'password', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const user = await User.list.findOne({ 'username': username });
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không đúng'));
                }
                const isValidPass = await User.validPassword(username, password);
                if (!isValidPass) {
                    return done(null, false, req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không đúng'));
                }
                return done(null, user);
            } catch (e) {
                console.log(e);
                return done(e);
            }
        }
    ))

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}