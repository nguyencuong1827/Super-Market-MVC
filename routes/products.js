var express = require('express');
var router = express.Router();

var products_controller = require('../controllers/products/productController');

//Get product page
//Đồ uống
router.get('/alcohol', products_controller.drink_alcohol_list);
router.get('/nest', products_controller.drink_nest_list);
router.get('/soft', products_controller.drink_soft_list);
router.get('/springWater', products_controller.drink_springWater_list);

//Thực phẩm
router.get('/dry',products_controller.food_dry_list);
router.get('/meat',products_controller.food_meat_list);
router.get('/rice',products_controller.food_rice_list);
router.get('/vegetable',products_controller.food_vegetable_list);

//Đồ gia dụng
router.get('/cleaning', products_controller.houseware_cleaning_list);
router.get('/diningRoom', products_controller.houseware_diningRoom_list);
router.get('/kitchen', products_controller.houseware_kitchen_list);
router.get('/light', products_controller.houseware_light_list);

//Em bé
router.get('/milk', products_controller.babyCare_milk_list);
router.get('/powder', products_controller.babyCare_powder_list);
router.get('/shampoo', products_controller.babyCare_shampoo_list);
router.get('/utensil', products_controller.babyCare_utensil_list);

//Ăn vặt
router.get('/gourmet', products_controller.gourmet_list);

//Khác
router.get('/other', products_controller.other_list);

//Khuyến mãi
router.get('/sale', products_controller.sale_list);

//GET info product page 
router.get('/:categoryEnglish/:id', products_controller.detailProduct)

//Trang kế của sản phẩm
router.get('/:categoryEnglish/viewPage/:page', products_controller.load_next_page);

//Trang kế của sản phẩm khuyến mãi
router.get('/sale/viewPage/:page', products_controller.sale_list);

//Tìm kiếm 
router.get('/searchProduct', products_controller.search_list);
router.get('/searchProduct/search=:text/:page', products_controller.search_list1);
module.exports = router; 