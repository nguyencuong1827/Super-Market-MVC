const product = require('../../models/productModel');
exports.searchList = async(req, res) => {
    const jsonfile = product.searchProductWithKeywordJson(req.query.search,res);
    return jsonfile;
}
