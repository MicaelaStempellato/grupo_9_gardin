const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { product } = require('../middlewares/productValidator');

const {Age, Environment, Experience, Product, Unit, Requirement, User} = require('../database/models');
const { userEdit } = require('../middlewares/usersValidator');


module.exports = {
    
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

			
				let producto = await Product.findByPk(productId.id)
				let usuario = await User.findByPk(req.session.userLog)
				
				producto.setUsuarios([usuario])

				
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

			let producto = await Product.findByPk(req.params.id)
			let usuario = await User.findByPk(req.session.userLog)
			await producto.removeUsuarios([usuario])

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


	}

}