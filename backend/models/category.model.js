var mongoose = require('mongoose');

var categorySchema  = new mongoose.Schema({
	name: String,
});

var Product = mongoose.model('Category', categorySchema, 'category');

module.exports = Product;