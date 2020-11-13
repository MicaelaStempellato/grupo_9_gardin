const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { users } = require('../middlewares/usersValidator');

const usersdbPatch = path.join(__dirname, '../data/usersDB.json');
let usersDb = JSON.parse(fs.readFileSync(usersdbPatch, 'utf-8'));

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

          let usersID;
          if(usersDb==""){
            usersID = 1
          } else{
            usersID = usersDb[usersDb.length-1].id+1
          };

          let newUsersDB = {
            id: usersID,
            userName: req.body.userName,
            userSurname: req.body.userSurname,
            email: req.body.email,
            pass: req.body.pass
            //image: req.file.filename
          }

          let usersdbJSON = JSON.stringify([...usersDb, newUsersDB]);
          fs.writeFileSync(usersdbPatch, usersdbJSON);

          res.render('users/login', { title: 'Inicia Sesión', css: 'login_styles'});

        } else {
          console.log(errors.errors);
          return res.render('users/signin', {errors: errors.errors, title: 'Registrate', css: 'signin_styles'})
        }
      }
}