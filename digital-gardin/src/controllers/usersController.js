const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { usersReg, usersLog } = require('../middlewares/usersValidator');
const db = require('../database/models');
const bcrypt = require('bcrypt');
const { map } = require('../app');



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
              //password: req.body.pass
            }
          }).then(UserLog => {
            if (UserLog.length<1){
              res.render('users/login',{ errors: errors.errors, title: 'Inicia Sesión', css: 'login_styles'})
            }else{
              let contrasenia = UserLog[0].password;
              if(bcrypt.compareSync(req.body.pass, contrasenia)){
              console.log(UserLog);
              UserLog.map(log => log.get({ plain: true }));
              req.session.userLog = UserLog[0].id;

              if (req.body.remember != undefined){
                res.cookie('recordame', UserLog[0].id, { maxAge: 1000 * 60 * 60 })
              }
              req.session.save(() =>
              res.redirect('/users/profile') )
            }else{
              let msg = 'Los datos son incorrectos'
              console.log('no anda');
              return res.render('users/login', {old: req.body, msg, title: 'Inicia Sesión', css: 'login_styles'});
            }
            }
          })
        } else {
          // si los hay
          console.log(errors.errors);
          return res.render('users/login', {errors: errors.errors, title: 'Inicia Sesión', css: 'login_styles'});
        }
      },

    registrarse: async function(req, res, next) {
      
        res.render('users/signin', { title: 'Registrate', css: 'signin_styles'});
      },

    registroForm: async function(req, res, next) {
        let errors = validationResult(req);
        let contrasena = false
        if(req.body.pass == req.body.pass2){
          contrasena = true
        }

        let usuarios = await db.User.findAll()
        let emails= []
        usuarios.forEach(user => {
        emails.push(user.email)
        });

        let mailTaken = false;
        emails.map(mail=>{
          if(mail == req.body.email){
            mailTaken = true;
          }
        })

        if(mailTaken==true){
          
            let msg = "El email ya está en uso"  
            return res.render('users/signin', {msg: msg, old: req.body, title: 'Registrate', css: 'signin_styles'})
          
        }else{


        if (errors.isEmpty() && contrasena){

          try{
            await db.User.create({
              first_name: req.body.userName,
              last_name: req.body.userSurname,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.pass, 10),
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
          return res.render('users/signin', {errors: errors.errors, old: req.body, title: 'Registrate', css: 'signin_styles'})
        }
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

      editForm: async function (req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()){

          try{
            let user = await db.User.findByPk(req.session.userLog)
            console.log(req.session.userLog);
            console.log(user);
            (console.log('UPDATED ' + user.id));

            let userID = req.session.userLog;

            await db.User.update({
              first_name: req.body.userName,
              last_name: req.body.userSurname,
              email: req.body.email
            }, {
              where: {id: userID}
            })
            
            res.redirect('/users/profile');
          }
          catch(error){
            console.log(error)
            console.log("----------SQL ERROR----------")
            res.render('error')
          }

        } else {
          let user = await db.User.findByPk(req.session.userLog);
            console.log(errors.errors);
            console.log("---------VALIDATION ERROR----------");
            return res.render('users/edit', {user: user, errors: errors.errors, old: req.body, title: 'Editar perfil', css: 'editUser_styles'})
        }
      },

      editAvatar: async function (req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()){
        try{

          const image_name = await db.User.findByPk(req.session.userLog)
          let img_nombre
          if(req.file == undefined){
            img_nombre = image_name.avatar
          }else if (image_name.avatar == null){
            img_nombre = req.file.filename
          }else{
            fs.unlinkSync(path.join(__dirname, '../../public/images/users/', image_name.avatar));
            img_nombre = req.file.filename
          }
          console.log(img_nombre);

          await db.User.update({
            avatar: img_nombre
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
        } else {
          let user = await db.User.findByPk(req.session.userLog)
          console.log(errors.errors);
          console.log("---------VALIDATION ERROR----------");
          return res.render('users/edit', {user: user, errors2: errors.errors, title: 'Editar perfil', css: 'editUser_styles'})
      }
      },

      editPass: async function (req, res, next) {
        let errors = validationResult(req);
        let contrasena = false
        if(req.body.passNew == req.body.passNew2){
          contrasena = true
        }

        let newContrasena = false
        if(req.body.passNew != req.body.passOld){
          newContrasena = true
        }

        if (errors.isEmpty() && contrasena && newContrasena){
        try{
          if(req.session.userLog){
            let usuario = await db.User.findByPk(req.session.userLog);
            let contrasenia = usuario.password;
            if(bcrypt.compareSync(req.body.passOld, contrasenia)){
              await db.User.update({
                password: bcrypt.hashSync(req.body.passNew, 10)
              }, {
                where: {id: usuario.id}
              })
              res.redirect('/users/profile')
            }else{
              console.log(errors.errors);
              let msg = 'Contraseña equivocada';
              console.log("---------VALIDATION ERROR----------");
              return res.render('users/edit', {user: usuario, msg: msg, old: req.body, title: 'Editar perfil', css: 'editUser_styles'})
            }
          }

        }catch(error){
          console.log(error);
        }
      } else {
        let user = await db.User.findByPk(req.session.userLog)
        console.log(errors.errors);
        console.log("---------VALIDATION ERROR----------");
        return res.render('users/edit', {user: user, errors3: errors.errors, old: req.body, title: 'Editar perfil', css: 'editUser_styles'})
    }

      }

}