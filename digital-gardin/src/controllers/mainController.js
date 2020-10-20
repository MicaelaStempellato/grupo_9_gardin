module.exports = {
    index: function(req, res, next) {
        res.render('index', { title: 'Digital Gardin', css: 'home_styles' });
      }
}