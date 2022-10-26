var express = require('express');
var router = express.Router();
var display_product = require('../models/table_display')
var gen_box = require('../models/select_box')

/* GET HOME PAGE */
var session;
router.get('/', async function(req, res, next) {
  session = req.session;
  let shop_id = session.shop_id;
  let username = session.user_id;
  let table = await display_product(shop_id)
  let box_string = await gen_box();
  res.render('admin',{title: 'Welcome to admin', name: username, select_box: box_string, table_string: table});
});

router.post('/select_box', async function(req, res, next){
  let shop_id = req.body.shops;
  username = req.session.user_id;
  let table = await display_product(shop_id);
  let box_string = await gen_box();
  res.render('admin', {title: 'welcome to admin', name: username, select_box: box_string, table_string: table});
});

module.exports = router;
