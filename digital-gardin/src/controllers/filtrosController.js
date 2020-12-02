const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { product } = require('../middlewares/productValidator');
const {Product} = require('../database/models');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {

    listadoTodo: async (req, res, next) => {

        try{
            const products = await Product.findAll()
            console.log(products)
            res.render('products/todosCursos', { title: 'Digital Gardin', css: 'listadoTodos', products });
        }catch(error){
            console.log(error);
            res.render('error')
        }

        //res.render('products/todosCursos', { title: 'Digital Gardin', css: 'listadoTodos', products });
	},

    filtroEdad: function(req, res, next) {
        let productsEdad = products.filter(function(producto){
            return producto.edad == req.params.edad;
        })
        
        res.render('products/cursosPorEdad', { title: 'Cursos por Edad', css: 'listadoTodos', productsEdad });
	},
	
	filtroExperiencia: function(req, res, next) {
        let productsExperiencia = products.filter(function(producto){
            return producto.experiencia == req.params.experiencia;
        })
        
        res.render('products/cursosPorExperiencia', { title: 'Cursos por Experiencia', css: 'listadoTodos', productsExperiencia });
	},

	filtroAmbiente: function(req, res, next) {
        let productsAmbiente = products.filter(function(producto){
            return producto.ambiente == req.params.ambiente;
        })
        
        res.render('products/cursosPorAmbiente', { title: 'Cursos por Ambiente', css: 'listadoTodos', productsAmbiente });
	}

}