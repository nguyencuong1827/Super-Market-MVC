exports.products_list = function(req, res) {
    res.render('listProduct/products');
};

exports.detailProduct = function(req, res) {
    res.render('detailProduct/single');
};
