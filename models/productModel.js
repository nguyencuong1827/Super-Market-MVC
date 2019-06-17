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
  imgSrc: String,
  dateAdd: Date
}, { collection: 'products' });

const list = mongoose.model('products', product);

const perPage = 2;

const translateCategory = function (value) {
  switch (value) {
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

const getCategoryFormCatalog = function (text) {
  const thucpam = 'thực phẩm';
  const dogiadung = 'đồ gia dụng';
  const embe = 'em bé';
  const douong = 'đồ uống';
  const anvat = 'ăn vặt';
  const khac = 'khác'
  value = text.toLowerCase();
  if (thucpam.lastIndexOf(value) != -1 || value.lastIndexOf(thucpam) != -1) {
    return 1;
  }
  if (dogiadung.lastIndexOf(value) != -1 || value.lastIndexOf(dogiadung) != -1) {
    return 2;
  }
  if (embe.lastIndexOf(value) != -1 || value.lastIndexOf(embe) != -1) {
    return 3;
  }
  if (douong.lastIndexOf(value) != -1 || value.lastIndexOf(douong) != -1) {
    return 4;
  }
  if (anvat.lastIndexOf(value) != -1 || value.lastIndexOf(anvat) != -1) {
    return 5;
  }
  if (khac.lastIndexOf(value) != -1 || value.lastIndexOf(khac) != -1) {
    return 6;
  }
  return 0;

}

const countProduct = function (listProduct) {
  var count = 0;
  listProduct.forEach(function (product) {
    count = count + 1;
  });
  return count;
}



const listProductPerPage = async (categoryEnglish, categoryVN, page, res) => {
  const listProduct = list;
  var categoryGetVN = categoryVN;
  if (categoryGetVN == '') {
    categoryGetVN = translateCategory(categoryEnglish);
  }
  console.log(categoryEnglish);
  console.log(categoryVN);
  console.log(categoryGetVN);
  console.log(page);

  await listProduct.find({ 'category': categoryGetVN }).limit(perPage).skip((perPage * page) - perPage).exec(function (err, Product) {
    if (err) {
      console.log(err);
    }
    else {
      const count = countProduct(Product);
      console.log(count);
      console.log(Product);
      res.render('listProduct/listProduct', { Product, page, categoryEnglish, categoryGetVN, count });
    }
  })
}

//Sản phẩm giảm giá
const listProductSale = async (valueSale, res) => {
  const listProduct = list;
  await listProduct.find({ 'sale': { $gte: valueSale } }).exec(function (err, Product) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('listProduct/salePage', { Product });
    }
  })
}



//Chi tiết
const viewDetailProduct = async (res, id) => {
  const lisProduct = list;
  await lisProduct.findById(id).then(productFound => {
    if (!productFound) {
      res.send('Không tìm thấy sản phẩm');
    }
    else {
      res.render('detailProduct/single', { title: 'Chi tiết sản phẩm', productFound });
    }
  })
}



//Tìm kiếm
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
const searchProduct = async (text, page, res) => {
  const regex = new RegExp(escapeRegex(text), 'gi');
  // Get all campgrounds from DB
  await list.find({ $or: [{ name: regex }, { category: regex }] }).limit(perPage).skip((perPage * page) - perPage).exec(function (err, Product) {
    if (err) {
      console.log(err);
    } else {
      var noMatch = null;
      if (!Product) {
        noMatch = 'Không tìm thấy kết quả';
        console.log(noMatch);
      }
      console.log('Không tìm thấy kết quả');
      console.log(text);
      const count = countProduct(Product);
      res.render('listProduct/searchProduct', { Product, count, noMatch, page, text});
    }
  });
}
const searchProductWithKeywordJson = async(text,res) => {
  const listproduct = list;
  await listproduct.find({name: new RegExp(text)},function(err, Product)  {
      if (err){
          console.log('thatbai');
      }
      else{
          res.json(Product);
      }
  })
}



module.exports = {
  list: list,
  listProductPerPage: listProductPerPage,
  listProductSale: listProductSale,
  viewDetailProduct: viewDetailProduct,
  searchProduct: searchProduct,
  searchProductWithKeywordJson: searchProductWithKeywordJson
};



