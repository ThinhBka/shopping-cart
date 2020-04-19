const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// forgot password
router.post('/', (req,res,next) => {
  User.findOneAndUpdate({ username: req.body.username },{password:req.body.password})
  .then(user => {
    if(user.password === req.body.password){
      res.status(400).send("Error password");
    }else{
      res.status(200).send("Done reset password!!!");
    }
    
  })
  .catch(err => {
      next(err);
  })
})

module.exports = router;