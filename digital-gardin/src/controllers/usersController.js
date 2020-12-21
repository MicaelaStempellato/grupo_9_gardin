const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { usersReg, usersLog } = require('../middlewares/usersValidator');
const db = require('../database/models');



module.exports = {
    login: function(req, res, next) {
        res.render('users/login', { title: 'Inicia Sesión', css: 'login_styles'});
      },

    loginForm: function(req, res, next) {

      let errors = validationResult(req);
      if (errors.isEmpty()){
          // si no hay errores de validacion
          db.User.findAll({
            where: {
              email: req.body.email,
              password: req.body.pass
            }
          }).then(UserLog => {
            if (UserLog.length<1){
              res.render('users/login',{ errors: errors.errors, title: 'Inicia Sesión', css: 'login_styles'})
            }else{
              console.log(UserLog);
              req.session.userLog = UserLog;

              if (req.body.remember != undefined){
                res.cookie('recordame', UserLog.email, { maxAge: 60000 })
              }

              res.render('users/profile',{title: 'Mi perfil', css: 'perfil_styles'})
            }
          })
        } else {
          // si los hay  
          console.log(errors.errors);
          return res.render('users/login', {errors: errors.errors, title: 'Inicia Sesión', css: 'login_styles'});
        }
      },

    registrarse: function(req, res, next) {
        res.render('users/signin', { title: 'Registrate', css: 'signin_styles'});
      },

    registroForm: async function(req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()){

          try{
            await db.User.create({
              first_name: req.body.userName,
              last_name: req.body.userSurname,
              email: req.body.email,
              password: req.body.pass,
              //avatar: req.file.filename,
              category_id: req.body.category
            });
  
            res.render('users/login', { title: 'Inicia Sesión', css: 'login_styles'});
          }
          catch(error){
            console.log(error)
            res.render('error')
          }

        } else {
          console.log(errors.errors);
          return res.render('users/signin', {errors: errors.errors, title: 'Registrate', css: 'signin_styles'})
        }
      },

      perfil: async function(req, res, next) {
        try{
          let usuario = await db.User.findByPk(1, {include: ['category', 'productos']})
          
          return res.render('users/perfil', {title: usuario.first_name, css: 'perfil_styles', usuario})
        }catch(error){
            console.log(error)
            res.render('error')
          }
      }
}