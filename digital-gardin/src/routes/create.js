var express = require('express');
var router = express.Router();
let productsController = require('../controllers/productsController')
const multer = require('multer');
const path = require('path');
let productValidator = require('../middlewares/productValidator')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/cursos'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
  })
   
  var upload = multer({
    storage,
 
    // Validate image
    fileFilter: (req, file, cb) => {
 
       const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
 
       const ext = path.extname(file.originalname);
       
       if (!acceptedExtensions.includes(ext)) {
          req.file = file;
       }
 
       cb(null, acceptedExtensions.includes(ext));
    }
 });


/* GET pcreate form page. */
router.get('/', productsController.create);
router.get('/edit', productsController.edit);
router.post('/', upload.single('image'), productValidator.product, productsController.store);

module.exports = router;