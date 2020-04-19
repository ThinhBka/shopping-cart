const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

router.get('/', async function(req, res) {
  const users = await User.find();
  res.json(users);
});

module.exports = router;

