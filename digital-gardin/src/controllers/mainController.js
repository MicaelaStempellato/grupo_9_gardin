const {Product} = require('../database/models');

module.exports = {
    index: function(req, res, next) {
        res.render('index', { title: 'Digital Gardin', css: 'home_styles' });
      },
      contacto: function(req, res, next) {
        res.render('contacto', { title: 'Contacto', css: 'contacto' });
      },
      ayuda: function(req, res, next) {
        res.render('ayuda', { title: 'Contacto', css: 'ayuda' });
      },
      novedades: async function(req, res, next) {
        try {
          let products = await Product.findAll({
            order: [
              ['id', 'DESC']
            ],
            limit: 6
          })
          res.render('novedades', { title: 'Novedades', products: products, css: 'listadoTodos' });
        } catch (error) {
          console.log(error);
        }

        
      }
}