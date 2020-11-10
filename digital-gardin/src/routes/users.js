var express = require('express');
var router = express.Router();
let usersController = require('../controllers/usersController')
let usersValidator = require ('../middlewares/usersValidator')

/* GET users listing. */
router.get('/login', usersController.login);
router.get('/signin', usersController.registrarse);
router.post('/registro', usersValidator.users, usersController.registroForm);

module.exports = router;
