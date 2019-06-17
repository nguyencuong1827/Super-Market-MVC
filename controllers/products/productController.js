const product = require('../../models/productModel');


//Trang khác
exports.load_next_page = async(req, res) => {
    const categoryEnglish = req.params.categoryEnglish;
    const page = req.params.page || 1;
    product.listProductPerPage(categoryEnglish, '', page, res)
};

//Đồ uống
exports.drink_alcohol_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('alcohol' ,'Bia rượu', page, res);
};

exports.drink_nest_list = async(req, res) => {

    var page = req.params.page || 1;
    product.listProductPerPage('nest' ,'Nước yến', page, res);
};

exports.drink_soft_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('soft' ,'Nước ngọt', page, res);
};

exports.drink_springWater_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('springWater','Nước suối', page, res);
};



//Thực phẩm
exports.food_dry_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('dry','Đồ khô', page, res);
};

exports.food_meat_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('meat', 'Thịt cá', page, res);
};

exports.food_rice_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('rice' ,'Gạo', page, res);
};

exports.food_vegetable_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('vegetable', 'Rau củ', page, res);
};


//Ăn vặt
exports.gourmet_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('gourmet', 'Ăn vặt', page, res);
};

//Đồ gia dụng
exports.houseware_cleaning_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('cleaning', 'Vệ sinh nhà cửa', page, res);
};

exports.houseware_diningRoom_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('diningRoom', 'Phòng ăn', page, res);
};

exports.houseware_kitchen_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('kitchen', 'Dụng cụ bếp', page, res);
};

exports.houseware_light_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('light', 'Đèn điện', page, res);
};

//Em bé
exports.babyCare_milk_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('milk', 'Sữa', page, res);
};

exports.babyCare_powder_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('powder', 'Phấn', page, res);
};

exports.babyCare_shampoo_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('shampoo', 'Dầu gội', page, res);
};

exports.babyCare_utensil_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('utensil', 'Đồ dùng', page, res);
};

//Ăn vặt
exports.gourmet_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('gourmet', 'Ăn vặt', page, res);
};

//Khác
exports.other_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductPerPage('other', 'Khác', page, res);
};

//Khuyến mãi
exports.sale_list = async(req, res) => {
    var page = req.params.page || 1;
    product.listProductSale(70, res);
}


//Tìm kiếm

exports.search_list = async (req, res) => {
    var page = req.params.page || 1;
    var text = req.query.search;
    product.searchProduct(text, page, res);
}

exports.search_list1 = async (req, res) => {
    var page = req.params.page || 1;
    var text = req.params.text;
    product.searchProduct(text, page, res);
}

//VIEW single product
exports.detailProduct = async (req, res) => {
    product.viewDetailProduct(res, req.params.id);
    //res.render('viewProduct/single')
}

exports.sortByColor = function(req, res)  {
    res.send('sort by color')
}
exports.sortBySize = function(req, res) {
    res.send('sort by size')
}
exports.sortByCategory = function(req, res) {
    res.send('sort by category')
}