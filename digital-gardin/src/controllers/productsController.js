const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


module.exports = {
    create: function(req, res, next) {
        res.render('products/createForm', { title: 'Crear Curso', css: 'crearCurso' });
      },
      edit: function(req, res, next) {
        res.render('products/editForm', { title: 'Editar Curso', css: 'crearCurso' });
      },
      store: function(req, res, next) {
        let errors = validationResult(req);
		if(errors.isEmpty()){

            let elId;
            if(products==""){
                elId = 1
            } else{
                elId = products[products.length-1].id+1
            };

		let newProduct = {
			id: elId,
			...req.body,
			image: req.file.filename
		}
		let newDB = [...products, newProduct];
		let newDBJSON = JSON.stringify(newDB, null, 2);
		fs.writeFileSync(productsFilePath, newDBJSON)

		res.redirect('/');

		} else {
			return res.render('products/createForm', {errors: errors.errors, old: req.body, title: 'Editar Curso', css: 'crearCurso'})
		}
	}


}