const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { product } = require('../middlewares/productValidator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


module.exports = {
    create: function(req, res, next) {
        res.render('products/createForm', { title: 'Crear Curso', css: 'crearCurso' });
      },
	edit: function(req, res, next) {
		let id = req.params.id
		let curso = products.find(unProducto => id == unProducto.id)
		res.render('products/editForm', {curso, title: 'Editar Curso', css: 'crearCurso'})
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
    },
    
    update: (req, res, next) => {
		let errors = validationResult(req);
		if(errors.isEmpty()){

		products.map(producto => {
			if(req.params.id == producto.id){
				producto.nombre = req.body.nombre;
				producto.descripcion = req.body.descripcion;
				producto.edad = req.body.edad;
				producto.experiencia = req.body.experiencia;
                producto.ambiente = req.body.ambiente;
                producto.idioma = req.body.idioma;
				producto.precio = req.body.precio;
				producto.unidades = req.body.unidades;
				if(req.file == undefined){
					producto.image = producto.image
				}else{
					fs.unlinkSync(path.join(__dirname, '../../public/images/cursos/', producto.image));
					producto.image = req.file.filename
				}
			}
		})

			productsJSON= JSON.stringify(products, null, 2);
			

			fs.writeFileSync(productsFilePath, productsJSON);

			res.redirect('/');

		} else {
			let id = req.params.id
			let curso = products.find(unProducto => id == unProducto.id)
			return res.render('products/editForm', {errors: errors.errors, old: req.body, curso, title: 'Editar Curso', css: 'crearCurso'})
		}
    },
    
    listadoTodo: function(req, res, next) {
        res.render('products/todosCursos', { title: 'Digital Gardin', css: 'listadoTodos', products });
	},
	
	mostrarCursoElegido: function(req, res, next) {
		let product = products[(req.params.id)-1];
		let unidades = product.unidades;
		
		unidades.forEach(unidad => {
			console.log("probando");
			console.log(unidad);
		});
		

		res.render('products/productDetail', { title: 'Digital Gardin', css: 'pdetail_styles', product, unidades});
	},

	carrito: function(req, res, next) {
		res.render('products/productCart', { title: 'Carrito', css: 'productCart_Styles' });
	}


}