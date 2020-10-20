var express = require('express');
var router = express.Router();
let usersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/login', usersController.login);
router.get('/signin', usersController.registrarse);

module.exports = router;
