var express = require('express');
var router = express.Router();
var checkout_controller = require('../controllers/checkoutController');
var about_controller = require('../controllers/aboutController');
var faq_controller = require('../controllers/faqController');
var contactUS_controller = require('../controllers/contactUSController');
const { forwardAuthenticated } = require('../config/auth');
const product = require('../models/productModel')
/* GET home page. */
router.get('/', forwardAuthenticated, async(req, res, next) => {
  const listProduct = product.list;
  await listProduct.find({ 'numberSold': { $gte: 20 } }).limit(8).exec(function (err, Product) {
    if (err) {
      console.log(err);
    }
    else {
      var date = new Date();
      date.setDate(date.getDate() - 7);
      listProduct.find({ 'dateAdd': { $gte: date } }).limit(8).exec(function (err, Product2) {
        if (err) {
          console.log(err);
        }
        else {
          res.render('index', { title: 'Trang chủ', Product, Product2});
        }
      
      })
    }
  })
});



/*GET payment page*/
router.get('/checkout', checkout_controller.checkout_page);


/*GET contact page*/
router.get('/about', about_controller.about_page);
router.get('/contactUS', contactUS_controller.contactUS_page);
router.get('/faq', faq_controller.faq_page);

module.exports = router;
