var mongoose = require('mongoose');

var productSchema  = new mongoose.Schema({
	images: Array,
	name: String,
  price: String,
  categories: Array
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;