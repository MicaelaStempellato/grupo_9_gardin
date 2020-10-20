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

/* Todos los cursos*/
 router.get('/', productsController.listadoTodo);

 /* Los forms para crear y editar cursos*/
 router.get('/create', productsController.create);
 router.get('/edit/:id', productsController.edit);
 /* Al crear o editar un curso*/
 router.post('/create', upload.single('image'), productValidator.product, productsController.store);
 router.put('/edit/:id', upload.single('image'), productValidator.update, productsController.update);
 
   


/* GET product detail page. */
router.get('/:id', function(req, res, next) {
  res.render('products/productDetail', { title: 'Express' });
});



  

module.exports = router;
