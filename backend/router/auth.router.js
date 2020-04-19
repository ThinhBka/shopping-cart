require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secretOrKey = process.env.SECRET_KEY || 'thinhtest';

router.post('/register', (req, res) => { 
  // Tạo 1 instance mới của User model để lưu newUser vào database
  User.findOne({ username: String(req.body.username) })
    .then(user => {
        // Check nếu không user nào tộn tại với username nhận được từ req.body
        if(!user) {
          const newUser = new User({
            username: req.body.username,
            password: req.body.password
          });
          // Nếu tạo user thành công thì response lại status code là 200, còn thất bại thì là 400
          newUser.save()
              .then(success => res.status(200).send('Successful to create new user'))
              .catch(err => res.status(400).send('Failed to create new user'));
        }else{
          return res.status(400).send('User exist! Create new User')
        }
    })
    .catch(err => res.status(400).send('Invalid username or password'));
});

router.post('/login', (req, res) => {
  User.findOne({ username: String(req.body.username) })
    .then(user => {
        // Check nếu không user nào tộn tại với username nhận được từ req.body
        console.log(user);
        if(!user) {
          return res.status(404).send('No user found');
        }

        if(user.password !== req.body.password){
          return res.status(400).send('Invalid password');
        }
        // Tạo 1 token và payload data và response lại với status code là 200 cùng với payloaded data
        const token = jwt.sign({ userId: user.id }, secretOrKey, { expiresIn: 60 * 60 });
        res.status(200).json({
          userId: user.id,
          token: token
        })
    })
    .catch(err => res.status(400).send('Invalid username or password'));
});

module.exports = router;