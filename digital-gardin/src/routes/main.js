var express = require('express');
var router = express.Router();
let mainController = require('../controllers/mainController')

/* GET home page. */
router.get('/', mainController.index);
router.get('/contact', mainController.contacto);
router.get('/help', mainController.ayuda);
router.get('/news', mainController.novedades);

module.exports = router;
