const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { product } = require('../middlewares/productValidator');
const {Product, Age, Experience} = require('../database/models');
const db = require('../database/models');

module.exports = {

    listadoTodo: async (req, res, next) => {

        try{
            const products = await Product.findAll()
            res.render('products/todosCursos', { title: 'Digital Gardin', css: 'listadoTodos', products });
        }catch(error){
            res.render('error')
        }
	},

    filtroEdad: async function(req, res, next) {

        try{
            const products = await Product.findAll({
                include: ["edad"],
                where: {
                    age_id: req.params.edad,
                }
            })
            res.render('products/cursosPorEdad', { title: 'Digital Gardin', css: 'listadoTodos', products: products });
        }catch(error){
            res.render('error')
        }

        
	},
	
	filtroExperiencia: async function(req, res, next) {

        try{
            const products = await Product.findAll({
                include: ["experiencia"],
                where: {
                    experience_id: req.params.experiencia,
                }
            })
            res.render('products/cursosPorExperiencia', { title: 'Digital Gardin', css: 'listadoTodos', products });
        }catch(error){
            res.render('error')
        }
	},

	filtroAmbiente: async function(req, res, next) {

        try{
            const products = await Product.findAll({
                include: ["ambiente"],
                where: {
                    environment_id: req.params.ambiente,
                }
            })
            res.render('products/cursosPorAmbiente', { title: 'Digital Gardin', css: 'listadoTodos', products });
        }catch(error){
            res.render('error')
        }

    
    },
    
    search: async (req, res, next) => {
        try{
            const products = await Product.findAll({
                where: {
                    name: {
                        [db.Sequelize.Op.like]: `%${req.body.buscar}%` 
                    }
                },
                order: [
                ['name', 'ASC']
                ]
                
            })  
            res.render('products/searchResults', { title: 'Resultados de la Busqueda', css: 'listadoTodos', products, busqueda: req.body.buscar });
     
        }catch(error){
            res.render('error')
        }
    }

}