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
	edit: async function(req, res, next) {
		try{
			let curso = await Product.findByPk(req.params.id, {include: ['edad', 'ambiente', 'experiencia']})
			let unidades = await Unit.findAll({
				where:{
					product_id: curso.id
				}
			})
			let requisitos = await Requirement.findAll({
				where:{
					product_id: curso.id
				}
			})
			const edad = await Age.findAll();
			const ambiente = await Environment.findAll();
			const experiencia = await Experience.findAll();
			res.render('products/editForm', {curso, title: 'Editar Curso', css: 'crearCurso', edad, ambiente, experiencia, unidades, requisitos})
		}catch(error){
		console.log(error)
        res.render('error')
		}
		
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
    
    update: async (req, res, next) => {

	
		let errors = validationResult(req);
		if(errors.isEmpty()){

		try{

			const image_name = await Product.findByPk(req.params.id)
			let img_nombre
			if(req.file == undefined){
				img_nombre = image_name.image
			}else{
				fs.unlinkSync(path.join(__dirname, '../../public/images/cursos/', image_name.image));
				img_nombre = req.file.filename
			}

			await Product.update({
				name: req.body.name,
				description: req.body.description,
				age_id: req.body.age_id,
				experience_id: req.body.experience_id,
				environment_id: req.body.environment_id,
				language: req.body.language,
				price: req.body.price,
				image: img_nombre,
				professor: req.body.professor,
				duration: req.body.duration,
				
			},{
				where: {
					id: req.params.id
				}
			})

			await Unit.destroy({
				where:{
					product_id: req.params.id
				}
			})

			for(let i = 0; i < req.body.unit_name.length; i++)
				await Unit.create({
					unit_name: req.body.unit_name[i],
					product_id: req.params.id
				})

			await Requirement.destroy({
				where:{
					product_id: req.params.id
				}
			})

				for(let i = 0; i < req.body.req_name.length; i++)
				await Requirement.create({
					req_name: req.body.req_name[i],
					product_id: req.params.id
				})

				res.redirect('/');

		}catch(error){
				console.log(error)
					res.render('error')	
		}
		
		} else {
			let curso = await Product.findByPk(req.params.id)

			const edad = await Age.findAll();
			const ambiente = await Environment.findAll();
			const experiencia = await Experience.findAll();
			return res.render('products/editForm', {errors: errors.errors, old: req.body, curso, title: 'Editar Curso', css: 'crearCurso', edad, ambiente, experiencia})
		}
    },
    
	
	mostrarCursoElegido: async function(req, res, next) {

		try{
			let product = await Product.findByPk(req.params.id, {include: ['edad', 'experiencia', 'ambiente']});
			let unidades = await Unit.findAll({
				where: {
					product_id: req.params.id
				}
			})
			let requisitos = await Requirement.findAll({
				where: {
					product_id: req.params.id
				}
			})
			res.render('products/productDetail', { title: 'Digital Gardin', css: 'pdetail_styles', product, unidades, requisitos});
		}catch(error){
			console.log(error)
				res.render('error')	
	}
		
	},

	delete: async function (req,res,next){

		try{
			const elcurso = await Product.findByPk(req.params.id);
			await Unit.destroy({
				where:{
					product_id: req.params.id
				}
			});
			await Requirement.destroy({
				where:{
					product_id: req.params.id
				}
			});
			fs.unlinkSync(path.join(__dirname, '../../public/images/cursos/', elcurso.image));
			await Product.destroy({
				where:{
					id: req.params.id
				}
			})
			res.redirect('/');
		}catch(error){
			console.log(error)
			res.render('error')	
	}


	},

	carrito: function(req, res, next) {
		res.render('products/productCart', { title: 'Carrito', css: 'productCart_Styles' });
	}

	

}