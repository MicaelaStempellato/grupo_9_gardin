var express = require('express');
var router = express.Router();

/* GET product detail page. */
/*router.get('/', function(req, res, next) {
  res.render('products/productDetail', { title: 'Express' });
});*/

router.get('/:cursoElegido', function(req, res, next) {
    let cursoElegido = req.params.cursoElegido;
    if (cursoElegido == undefined){
        res.send('No hay resultados para '+cursoElegido)
    }else{
        res.send('Bienvenidos al curso '+cursoElegido)
    }
    
  });
  
  

module.exports = router;
