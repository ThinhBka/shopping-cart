const express = require('express');
const Category = require('../models/category.model');
const router = express.Router();

router.get('/', async function(req, res) {
  const categories = await Category.find();
  res.json(categories);
});
router.post('/',  async function(req, res) {
  const category = await Category.create(req.body);
  res.json(category);
});

module.exports = router;

