const express = require('express');
const Product = require('../models/product.model');
const router = express.Router();

router.get('/', async function(req, res) {
  const products = await Product.find();
  res.json(products);
});
router.post('/',  async function(req, res) {
  const product = await Product.create(req.body);
  res.json(product);
});

module.exports = router;

