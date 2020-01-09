const express = require("express");
const router = express.Router();
const LoginController = require("../models/User");
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware');

const secret = 'mysecretsshhh';

router.post('/auth', function (req, res) {
  const {email, password, rememberMe} = req.body;
  
  
  LoginController.findOne({email}, function (err, user) {
	if (err) {
	  res.status(500)
		.json({
		  error: 'Internal error please try again'
		});
	} else if (!user) {
	  res.status(401)
		.json({
		  error: 'Пользователь не найден'
		});
	} else {
	  user.isCorrectPassword(password, function (err, same) {
		if (err) {
		  res.status(500)
			.json({
			  error: 'Internal error please try again'
			});
		} else if (!same) {
		  res.status(401)
			.json({
			  error: 'Неверный адрес электронной почты или пароль'
			});
		} else {
		  // Issue token
		  const payload = {email};
		  const token = jwt.sign(payload, secret, {
			expiresIn: "1h", algorithm: 'HS256'
		  });
		  const maxAge = rememberMe ? 31536000 : 3600;
		  
		  res.cookie('token', token, { maxAge, httpOnly: true }).sendStatus(200);
		}
	  });
	}
  });
});
router.get('/secret', withAuth, function (secret, res) {
  res.send('The password is potato');
});
router.get('/logout', function (secret, res) {
  res.clearCookie('token');
  return res.sendStatus(200);
});
router.get('/checkToken', withAuth, function (req, res) {
  
  LoginController.findOne({email: req.email}, function (err, user) {
	res.send({message: 'You are authorized', resultCode: true, email: user.email, name: user.name, ava: user.ava});
  });
  
});
module.exports = router;