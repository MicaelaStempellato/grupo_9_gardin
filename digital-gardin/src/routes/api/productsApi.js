var express = require('express');
var router = express.Router();
let apiController = require('../../controllers/api/apiController');
let usersApiController = require('../../controllers/api/usersApiController');

router.get('/products', apiController.all);
router.get('/products/:id', apiController.detail);
router.get('/users', usersApiController.all);
router.get('/users/:id', usersApiController.detail);

router.get('/items', apiController.items);

module.exports = router;