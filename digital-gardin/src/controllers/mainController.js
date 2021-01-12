module.exports = {
    index: function(req, res, next) {
        res.render('index', { title: 'Digital Gardin', css: 'home_styles' });
      },
      contacto: function(req, res, next) {
        res.render('contacto', { title: 'Contacto', css: 'contacto' });
      },
      ayuda: function(req, res, next) {
        res.render('ayuda', { title: 'Contacto', css: 'ayuda' });
      }
}