var express = require('express');
var router = express.Router();
let apiController = require('../../controllers/api/apiController');

router.get('/products', apiController.all);

module.exports = router;