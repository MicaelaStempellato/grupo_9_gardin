//const { patch } = require("../app");
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { users } = require('../middlewares/usersValidator');

const usersdbPatch = path.join(__dirname, '../data/usersDB.json');

module.exports = {
    login: function(req, res, next) {
        res.render('users/login', { title: 'Inicia Sesión', css: 'login_styles'});
      },

      registrarse: function(req, res, next) {
        res.render('users/signin', { title: 'Registrate', css: 'signin_styles'});
      },

      registroForm: function(req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()){
          //let usersId = fs.readFileSync
          
          let usersDB = {
            id: 1,  //pendiente crear función para contar los ids de forma automatica
            nombre: req.body.user-name,
            apellido: req.body.user-surname,
            email: req.body.email,
            pass: req.body.pass
          }
          let usersdbJSON = JSON.stringify(usersDB);

          fs.writeFileSync(usersdbPatch, usersdbJSON);

          res.redirect('/useres/login');

        } else {
          return res.render('users/signin', {errors: errors.errors})
        }
      }
}