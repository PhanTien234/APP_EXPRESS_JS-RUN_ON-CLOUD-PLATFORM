var express = require('express');
var router = express.Router();
var authen = require('../modes/authenticator')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ATN SHOP' });
});
// Process for Post request here
router.post('/', function(req, res, next) {
  res.render('login', { title: 'ATN SHOP', message: "Please input username and password" });
});

// Process for login POST request
router.post('/login', async function(req, res, next) {
  let username =req.body.username;
  let password =req.body.password;
  console.log(username + ":" + password)
  let authenticated = await authen(username, password)
  if(authenticated == true){
    res.render('users', {title: 'welcome to user'})
  }else{
    res.render('login', { title: 'ATN SHOP', message: 'wrong user password' });
  }

});
module.exports = router;
