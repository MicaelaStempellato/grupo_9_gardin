const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { product } = require('../middlewares/productValidator');

const {Age, Environment, Experience, Product, Unit, Requirement} = require('../database/models');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


module.exports = {
    create: async function(req, res, next) {
		try{
			const edad = await Age.findAll();
			const ambiente = await Environment.findAll();
			const experiencia = await Experience.findAll();
			res.render('products/createForm', { title: 'Crear Curso', css: 'crearCurso', edad, ambiente, experiencia });
		}catch(error){
			console.log(error)
            res.render('error')
		}
        
      },
	edit: function(req, res, next) {
		let id = req.params.id
		let curso = products.find(unProducto => id == unProducto.id)
		res.render('products/editForm', {curso, title: 'Editar Curso', css: 'crearCurso'})
		},
	store: async function(req, res, next) {
		let errors = validationResult(req);
		if(errors.isEmpty()){

			try{
				console.log(req.body.name)
				await Product.create({
					name: req.body.name,
					description: req.body.description,
					age_id: req.body.age_id,
					experience_id: req.body.experience_id,
					environment_id: req.body.environment_id,
					language: req.body.language,
					price: req.body.price,
					image: req.file.filename,
					professor: req.body.professor,
					duration: req.body.duration
				})

				let productId = await Product.findOne({
					where:{
						image: req.file.filename
					}
				})

				for(let i = 0; i < req.body.unit_name.length; i++)
				await Unit.create({
					unit_name: req.body.unit_name[i],
					product_id: productId.id
				})

				for(let i = 0; i < req.body.req_name.length; i++)
				await Requirement.create({
					req_name: req.body.req_name[i],
					product_id: productId.id
				})
				
				res.redirect('/');

			}catch(error){
				console.log(error)
				res.render('error')
			}

			

		} else {
			const edad = await Age.findAll();
			const ambiente = await Environment.findAll();
			const experiencia = await Experience.findAll();
			return res.render('products/createForm', {errors: errors.errors, old: req.body, title: 'Editar Curso', css: 'crearCurso', edad, ambiente, experiencia})
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
				producto.profesor = req.body.profesor;
				producto.duracion = req.body.duracion;
                producto.idioma = req.body.idioma;
				producto.precio = req.body.precio;
				producto.unidades = req.body.unidades;
				producto.requisitos = req.body.requisitos;
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
    
	
	mostrarCursoElegido: function(req, res, next) {
		
		let id = req.params.id
		let product = products.find(unProducto => id == unProducto.id)
		res.render('products/productDetail', { title: 'Digital Gardin', css: 'pdetail_styles', product});
	},

	delete: function (req,res,next){

		let idDelete = req.params.id;
		let newBase = products.filter(producto => producto.id != idDelete);
		


		

		let newBaseJSON = JSON.stringify(newBase, null, 2);
		

		fs.writeFileSync(productsFilePath, newBaseJSON);

		res.redirect('/');
	},

	carrito: function(req, res, next) {
		res.render('products/productCart', { title: 'Carrito', css: 'productCart_Styles' });
	}

	

}