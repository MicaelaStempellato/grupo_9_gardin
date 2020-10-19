var express = require('express');
var router = express.Router();
let productsController = require('../controllers/productsController')

/* GET pcreate form page. */
router.get('/', productsController.create);

module.exports = router;