const { patch } = require("../app");
const fs = require('fs');

module.exports = {
    login: function(req, res, next) {
        res.render('users/login', { title: 'Inicia Sesión', css: 'login_styles'});
      },

      registrarse: function(req, res, next) {
        res.render('users/signin', { title: 'Registrate', css: 'signin_styles'});
      },

      registroForm: function(req, res, next) {
        
      }
}