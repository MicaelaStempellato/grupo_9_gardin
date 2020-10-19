module.exports = {
    create: function(req, res, next) {
        res.render('products/createForm', { title: 'Crear Curso', css: 'crearCurso' });
      }
}