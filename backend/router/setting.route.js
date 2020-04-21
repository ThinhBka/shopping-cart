const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/', (req, res, next) => {
  User.findOneAndUpdate({ _id: req.body.id }, {info: req.body.settings})
  .then(user => {
    res.status(200).send("Done update order");
  })
  .catch(err => {
    next(err);
  })
})

router.get('/:id', async (req, res, next) => {
  try {
    const users = await User.find({_id: req.params.id});
    res.json(users)
  } catch (error) {
    next(error)
  }
})

module.exports = router;