const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/', (req, res, next) => {
  User.findOneAndUpdate({ _id: req.body.id }, {order: req.body.order})
  .then(user => {
    console.log(req.body.order);
    res.status(200).send("Done update order");
  })
  .catch(err => {
    next(err);
  })
})

router.post('/delete', (req, res, next) => {
  User.findOneAndUpdate({ _id: req.body.id }, {order: []})
  .then(user => {
    res.status(200).send("Done update order");
  })
  .catch(err => {
    next(err);
  })
})

router.post('/delete', (req, res, next) => {
  User.findOneAndUpdate({ _id: req.body.id }, {order: []})
  .then(user => {
    res.status(200).send("Done update order");
  })
  .catch(err => {
    next(err);
  })
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users)
  } catch (error) {
    next(error)
  }
})

module.exports = router;