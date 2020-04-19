require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretOrKey = process.env.SECRET_KEY || 'thinhtest';

const checkToken = (req, res, next) => {
  try {
      const token = req.headers.authorization;
      // Xác thực token
      jwt.verify(token, secretOrKey, (err, payload) => {
          if(payload) {
              req.user = payload;
              next();
          } else {
              // Nếu token tồn tại nhưng không hợp lệ, server sẽ response status code 401 với msg bên dưới
              res.status(401).send('Unauthorized');
          }
      })
  } catch(err) {
      // Nếu không có token ở header, server sẽ response status code 401 với msg bên dưới        
      res.status(401).send('No token provided');
  }    
};

const protectedRoute = (req, res, next) => {
  // Nếu req.user tồn tại nghĩa là token cũng tồn tại
  if(req.user) {        
      return next();
  } 

  // Ngược lại server sẽ response status code 401 với msg bên dưới 
  res.status(401).send('Unauthorized');
}

// Nếu pass cả 2 middleware có nghĩa là token là hàng real, server sẽ response status code là 200 cùng với req.user
router.get(
  '/'
  , checkToken, protectedRoute
  , (req, res) => {
      res.status(200).send(req.user);
});

module.exports = router;