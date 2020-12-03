const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { product } = require('../middlewares/productValidator');

const {Age, Environment, Experience, Product, Unit, Requirement} = require('../database/models');


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

	carrito: function(req, res, next) {
		res.render('products/productCart', { title: 'Carrito', css: 'productCart_Styles' });
	}

}