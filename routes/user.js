var express = require('express');
var router = express.Router();
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');
var user_controller = require('../controllers/users/userController');

//Login page
router.get('/login', forwardAuthenticated, user_controller.login_page);

// Login Process
router.post('/login', passport.authenticate('local-login', {
      successRedirect:'/',
      failureRedirect:'/user/login',
      failureFlash: true
   
  }));

//Register page
router.get('/register', user_controller.register_page);
 
//Register proccess
router.post('/register', user_controller.register_process);

//Logout
router.get('/logout', user_controller.logout_page);

//forgotPassword page
router.get('/forgotPassword', user_controller.forgotPassword_page)


module.exports = router;
