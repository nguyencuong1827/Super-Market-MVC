var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
  id: String,
  name: String,
  price: Number,
  sale: Number,
  unit: String,
  category: String,
  count: Number,
  numberSold: Number,
  color: String,
  size: String,
  rateAverage: Number,
  info: String,
  imgSrc: String
},{collection: 'products'});

const list = mongoose.model('products',product);

const perPage = 9;

const getCategory = function(value){
  switch(value){
    case 'meat': 
      return 'Thịt cá';
    case 'dry':
      return 'Đồ khô';
    case 'rice':
      return 'Gạo';
    case 'vegetable':
      return 'Rau củ';
    case 'kitchen':
      return 'Đồ dùng bếp';
    case 'diningRoom':
      return 'Phòng ăn';
    case 'light':
      return 'Đèn diện';
    case 'cleaning':
      return 'Vệ sinh nhà cửa';
    case 'shampoo':
      return 'Dầu gội';
    case 'utensil':
      return 'Đồ dùng';
    case 'powder':
      return 'Phấn';
    case 'milk':
      return 'Sữa';
    case 'springWater':
      return 'Nước suối';
    case 'soft':
      return 'Nước ngọt';
    case 'alcohol':
      return 'Bia rượu';
    case 'nest':
      return 'Nước yến';
    case 'gourmet':
      return 'Ăn vặt';
    case 'other':
      return 'Khác';
    default: return '';
  }
}
const countProduct = function(listProduct){
  var count = 0;
  listProduct.forEach(function(product) {
    count = count + 1;
  });
  return count;
}



const listProductPerPage = async(categoryEnglish, categoryVN, page, res) => {
  const listProduct = list;
  var categoryGetVN = categoryVN;
  if(categoryGetVN == ''){
    categoryGetVN = getCategory(categoryEnglish);
  }
  console.log(categoryEnglish);
  console.log(categoryVN);
  console.log(categoryGetVN);
  console.log(page);
  
  await listProduct.find({'category': categoryGetVN}).limit(perPage).skip((perPage*page) - perPage).exec(function(err, Product){
    if (err){
        console.log(err);
      }
      else{
        const count = countProduct(Product);
        console.log(count);
        console.log(Product);
        res.render('listProduct/listProduct', {Product, page, categoryEnglish, categoryGetVN, count});
      }
  })
}


const listProductSale = async(valueSale, res) =>{
  const listProduct = list;
  await listProduct.find({'sale': {$gte: valueSale}}).exec(function(err, Product){
    if (err){
        console.log(err);
      }
      else{
        res.render('listProduct/salePage', {Product});
      }
  })
}

const viewDetailProduct = async(res, id) =>{
  const lisProduct = list;
  await lisProduct.findById(id).then(productFound => {
    if(!productFound){
      res.send('Không tìm thấy sản phẩm');
    }
    else{
      res.render('detailProduct/single', {title:'Chi tiết sản phẩm', productFound});
    }
  })
}




module.exports = {
  list: list,
  listProductPerPage: listProductPerPage,
  listProductSale: listProductSale,
  viewDetailProduct: viewDetailProduct
};



