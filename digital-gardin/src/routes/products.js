var express = require('express');
var router = express.Router();
let productsController = require('../controllers/productsController');
let carritoController = require('../controllers/carritoController');
let filtrosController = require('../controllers/filtrosController');
let viewController = require('../controllers/viewController');
const multer = require('multer');
const path = require('path');
let productValidator = require('../middlewares/productValidator');
const { Router } = require('express');
const professorMiddleware = require('../middlewares/professorMiddleware');
const alumnoMiddleware = require('../middlewares/alumnoMiddleware');
const professorEditMiddleware = require('../middlewares/professorEditMiddleware')

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
 router.get('/', filtrosController.listadoTodo);

 /* Buscar cursos*/
 router.post('/search-results', filtrosController.search);

 /* Los forms para crear y editar cursos*/
 router.get('/create', professorMiddleware, viewController.create);
 router.get('/edit/:id', professorEditMiddleware, viewController.edit);

 
 
 /* Al crear o editar un curso*/
 router.post('/create', upload.single('image'), productValidator.product, productsController.store);
 router.put('/edit/:id', upload.single('image'), productValidator.update, productsController.update);

  /* Cursos filtrados */
  router.get('/edad/:edad', filtrosController.filtroEdad);
  router.get('/experiencia/:experiencia', filtrosController.filtroExperiencia);
  router.get('/ambiente/:ambiente', filtrosController.filtroAmbiente);

 /* Ir al carrito*/   
 router.get('/carrito', alumnoMiddleware, carritoController.carrito);

 /*Agregar al carrito */

 router.post('/carrito/agregarAlCarrito', carritoController.addCart);

 /*
router.get('/:cursoElegido', function(req, res, next) {
    let cursoElegido = req.params.cursoElegido;
    if (cursoElegido == undefined){
        res.send('No hay resultados para '+cursoElegido)
    }else{
        res.send('Bienvenidos al curso '+cursoElegido)
    }
    
  });*/

/* GET product detail page. */
router.get('/ver/:id', viewController.mostrarCursoElegido);
router.delete('/delete/:id', productsController.delete);



module.exports = router;
