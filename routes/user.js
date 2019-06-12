var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/users/userController');


//Login page
router.get('/login', user_controller.login_page);

//Register page
router.get('/register', user_controller.register_page);

//Register proccess
router.post('/register', user_controller.register_process);

//forgotPassword page
router.get('/forgotPassword', user_controller.forgotPassword_page)
module.exports = router;
