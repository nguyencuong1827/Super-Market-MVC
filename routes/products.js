var express = require('express');
var router = express.Router();

var products_controller = require('../controllers/products/productController');

//Get product page
//Đồ uống
router.get('/drink/alcohol', products_controller.drink_alcohol_list);
router.get('/drink/nest', products_controller.drink_nest_list);
router.get('/drink/soft', products_controller.drink_soft_list);
router.get('/drink/springWater', products_controller.drink_springWater_list);

//Thực phẩm
router.get('/food/dry',products_controller.food_dry_list);
router.get('/food/meat',products_controller.food_meat_list);
router.get('/food/rice',products_controller.food_rice_list);
router.get('/food/vegetable',products_controller.food_vegetable_list);

//Ăn vặt
router.get('/gourmet', products_controller.gourmet_list);

//Đồ gia dụng
router.get('/houseware/cleaning', products_controller.houseware_cleaning_list);
router.get('/houseware/diningRoom', products_controller.houseware_diningRoom_list);
router.get('/houseware/kitchen', products_controller.houseware_kitchen_list);
router.get('/houseware/light', products_controller.houseware_light_list);

//Em bé
router.get('/babyCare/milk', products_controller.babyCare_milk_list);
router.get('/babyCare/powder', products_controller.babyCare_powder_list);
router.get('/babyCare/shampoo', products_controller.babyCare_shampoo_list);
router.get('/babyCare/utensil', products_controller.babyCare_utensil_list);

//Khác
router.get('/other', products_controller.other_list);

//Khuyến mãi
router.get('/sale', products_controller.sale_list);

//GET info product page 
router.get('/:id', products_controller.detailProduct)

module.exports = router;