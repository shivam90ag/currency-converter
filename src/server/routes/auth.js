var express = require('express');
var router = express.Router();
let UserService = require('../services/user.service');
let Authenticate = require('../middleware/authenticated')

/* GET home page. */
router.post('/login', function (req, res, next) {
  Authenticate.login(req, res, next);
}).post('/signup', function (req, res, next) {
  Authenticate.register(req, res, next);
}).delete('/logout', function (req, res) {

  res.cookie('Auth bearer', '', { maxAge: 0, httpOnly: true })
  res.sendStatus(200);

});


module.exports = router;