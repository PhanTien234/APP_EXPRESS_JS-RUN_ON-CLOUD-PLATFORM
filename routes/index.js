var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ATN SHOP' });
});
// Process for Post request here
router.post('/', function(req, res, next) {
  res.render('login', { title: 'ATN SHOP' });
});

router.post('/login', function(req, res, next) {
  res.render('users', { title: 'Welcome to user' });
});
module.exports = router;
