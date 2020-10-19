var express = require('express');
var router = express.Router();

/* GET product detail page. */
router.get('/:id', function(req, res, next) {
  res.render('products/productCart', { title: 'Express' });
});



  
  

module.exports = router;
