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
              UserLog.map(log => log.get({ plain: true }));
              req.session.userLog = UserLog[0].id;

              if (req.body.remember != undefined){
                res.cookie('recordame', UserLog[0].id, { maxAge: 1000 * 60 * 60 })
              }
              req.session.save(() =>
              res.redirect('/users/profile') )
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
          console.log(req.session);
          if(req.session.userLog){
            let usuario = await db.User.findByPk(req.session.userLog, {include: ['category', 'productos']})
            return res.render('users/perfil', {title: usuario.first_name, css: 'perfil_styles', usuario})
          }
          
          //let usuario = await db.User.findByPk(1, {include: ['category', 'productos']})
          //console.log(usuario);
          
          //return res.render('users/perfil', {title: usuario.first_name, css: 'perfil_styles', usuario})
        }catch(error){
            console.log(error)
            res.render('error')
          }
      },

      logout: async function(req, res, next) {
        try{
          req.session.destroy();
          res.clearCookie('recordame');
          res.redirect('/')
        }catch(error){
          console.log(error)
          res.render('error')
        }
      },

      edit: async function (req, res, next) {
        try{
          let user = await db.User.findByPk(req.session.userLog)
          console.log(user);
          res.render('users/edit', { user: user, title: 'Editar perfil', css: 'editUser_styles'});
        }catch(error){
          console.log(error)
          res.render('error')
        }
      },

      editForm: function (req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()){

          try{
            let user = db.User.findByPk(req.session.userLog)
            .then(console.log('UPDATED ' + user));

            let userID = req.session.userLog;

            db.User.update({
              first_name: req.body.userName,
              last_name: req.body.userSurname,
              email: req.body.email
            }, {
              where: {id: userID}
            })
            .then(res.render('users/edit', { user: user, title: 'Editar perfil', css: 'signin_styles'}));
          }
          catch(error){
            console.log(error)
            console.log("----------SQL ERROR----------")
            res.render('error')
          }

        } else {
            console.log(errors.errors);
            console.log("---------VALIDATION ERROR----------");
            return res.render('users/edit', {errors: errors.errors, title: 'Editar perfil', css: 'signin_styles'})
        }
      },

      editAvatar: function (req, res, next) {
        try{
          db.User.update({
            image: req.file.filename
          }, {
            where: {id: req.session.userLog}
          })
          .then(res.redirect('/users/profile'));
        }
        catch(error){
          console.log(error)
          console.log("----------SQL ERROR----------")
          res.render('error')
        }
      },

      editPass: function (req, res, next) {
        
      }

}