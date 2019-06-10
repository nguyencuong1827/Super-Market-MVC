const product = require('../../models/productModel');
//Get all item
//Đồ uống
exports.drink_alcohol_list = function(req, res) {

    product.find({'category': 'Bia rượu'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/drink/alcohol',{title:'Bia rượu', Product});
        }
    })
};

exports.drink_nest_list = function(req, res) {

    product.find({'category': 'Nước yến'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/drink/nest',{title:'Nước yến', Product});
        }
    })
};

exports.drink_soft_list = function(req, res) {

    product.find({'category': 'Nước ngọt'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/drink/soft',{title:'Nước ngọt', Product});
        }
    })
};

exports.drink_springWater_list = function(req, res) {

    product.find({'category': 'Nước suối'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/drink/springWater',{title:'Nước suối', Product});
        }
    })
};



//Thực phẩm
exports.food_dry_list = function(req, res) {

    product.find({'category': 'Đồ khô'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/food/dry',{title:'Đồ khô', Product});
        }
    })
};

exports.food_meat_list = function(req, res) {

    product.find({'category': 'Thịt cá'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/food/meat',{title:'Thịt cá', Product});
        }
    })
};

exports.food_rice_list = function(req, res) {

    product.find({'category': 'Gạo'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/food/rice',{title:'Gạo', Product});
        }
    })
};

exports.food_vegetable_list = function(req, res) {

    product.find({'category': 'Rau củ'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/food/vegetable',{title:'Rau củ', Product});
        }
    })
};


//Ăn vặt
exports.gourmet_list = function(req, res) {

    product.find({'category': 'Ăn vặt'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/gourmet',{title:'Ăn vặt', Product});
        }
    })
};

//Đồ gia dụng
exports.houseware_cleaning_list = function(req, res) {

    product.find({'category': 'Vệ sinh nhà cửa'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/houseware/cleaning',{title:'Vệ sinh nhà cửa', Product});
        }
    })
};

exports.houseware_diningRoom_list = function(req, res) {

    product.find({'category': 'Phòng ăn'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/houseware/diningRoom',{title:'Phòng ăn', Product});
        }
    })
};

exports.houseware_kitchen_list = function(req, res) {

    product.find({'category': 'Dụng cụ bếp'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/houseware/kitchen',{title:'Dụng cụ bếp', Product});
        }
    })
};

exports.houseware_light_list = function(req, res) {

    product.find({'category': 'Đèn điện'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/houseware/light',{title:'Đèn điện', Product});
        }
    })
};

//Em bé
exports.babyCare_milk_list = function(req, res) {

    product.find({'category': 'Sữa'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/babyCare/milk',{title:'Sữa', Product});
        }
    })
};

exports.babyCare_powder_list = function(req, res) {

    product.find({'category': 'Phấn'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/babyCare/powder',{title:'Phấn', Product});
        }
    })
};

exports.babyCare_shampoo_list = function(req, res) {

    product.find({'category': 'Dầu gội'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/babyCare/shampoo',{title:'Dầu gội', Product});
        }
    })
};

exports.babyCare_utensil_list = function(req, res) {

    product.find({'category': 'Đồ dùng'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/babyCare/utensil',{title:'Đồ dùng', Product});
        }
    })
};

//Khác
exports.other_list = function(req, res) {

    product.find({'category': 'Khác'}).exec((err,Product)=>{
        if(err){
            console.log('that bai');
        }
        else{
            res.render('listProduct/other',{title:'Khác', Product});
        }
    })
};

//Khuyến mãi
exports.sale_list = function(req, res) {
    res.render('listProduct/salePage', {title:'Khuyển mãi'});
}

//VIEW single product
exports.detailProduct = function (req, res) {
    product.findById(req.params.id).then(productFound =>{
        if (!productFound)
        {
            res.send('that bai');
        }
        res.render('detailProduct/single', {title:'Chi tiết', productFound})
    })
    //res.render('viewProduct/single')
}

exports.sortByColor = function (req, res) {
    res.send('sort by color')
}
exports.sortBySize = function (req, res) {
    res.send('sort by size')
}
exports.sortByCategory = function (req, res) {
    res.send('sort by category')
}