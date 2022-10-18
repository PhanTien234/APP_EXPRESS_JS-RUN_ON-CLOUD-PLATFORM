var express = require('express');
var router = express.Router();
var authen = require('../modes/authenticator')
var display_product = require('../modes/table_display')

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
  let [authenticated, shop_id] = await authen(username, password)
  if(authenticated == true){
    let table = await display_product(shop_id);
    res.render('users', {title: 'welcome to user', name: username, table_string: table})
  }else{
    res.render('login', { title: 'ATN SHOP', message: 'wrong user password' });
  }

});
module.exports = router;


