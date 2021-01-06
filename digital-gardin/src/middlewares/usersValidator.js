const { check, validationResult, body } = require("express-validator");
var path = require("path")
const db = require('../database/models');

let verifyPasswordsMatch = function(req, res, next) {
    check('pass')
    .notEmpty()
    .withMessage('Este campo no puede estar vacio')
    .isLength( {min:6, max:20} )
    .withMessage('La contraseña debe tener entre 6 y 20 caracteres')
    .equals(req.body.pass2)
    .withMessage('Las contraseñas deben coincidir')
}

module.exports={
    usersReg: [
        body('userName')
        .notEmpty()
        .withMessage('Este campo no puede estar vacio')
        .isAlpha()
        .withMessage('El nombre no puede contener numeros')
        .isLength( {min:3, max:15} )
        .withMessage('El nombre debe tener entre 3 y 15 caracteres'),

        body('userSurname')
        .notEmpty()
        .withMessage('Este campo no puede estar vacio')
        .isAlpha()
        .withMessage('El apellido no puede contener numeros')
        .isLength( {min:2, max:15} )
        .withMessage('El apellido debe tener entre 2 y 15 caracteres'),

        body('email')
        .notEmpty()
        .withMessage('Este campo no puede estar vacio')
        .isEmail()
        .withMessage('Este campo debe contener un E-mail'),

        /* verifyPasswordsMatch, */

        /* body('pass')
        .notEmpty()
        .withMessage('Este campo no puede estar vacio')
        .isLength( {min:6, max:20} )
        .withMessage('La contraseña debe tener entre 6 y 20 caracteres')
        .equals('pass2')
        .withMessage('Las contraseñas deben coincidir'),

    */
        
        /*
        body('pass2')
        .custom(function (value) {
            if (value == req.body.pass){
                return true
            } else { return false}
        })
        .withMessage('las contraseñas deben coincidir')
        */

        body('category')
        .notEmpty()
        .withMessage('Por favor, seleccione una opción')
    ],
    usersLog: [
        body('email')
        .notEmpty()
        .withMessage('El campo no puede estar vacío')
        .isEmail()
        .withMessage('Por favor, ingrese su E-mail'),

        body('pass')
        .notEmpty()
        .withMessage('Por favor, ingrese su contraseña')
    ],
    userEdit: [
        body('userName')
        .notEmpty()
        .withMessage('Este campo no puede estar vacio')
        .isAlpha()
        .withMessage('El nombre no puede contener numeros')
        .isLength( {min:3, max:15} )
        .withMessage('El nombre debe tener entre 3 y 15 caracteres'),

        body('userSurname')
        .notEmpty()
        .withMessage('Este campo no puede estar vacio')
        .isAlpha()
        .withMessage('El apellido no puede contener numeros')
        .isLength( {min:2, max:15} )
        .withMessage('El apellido debe tener entre 2 y 15 caracteres'),

        body('email')
        .notEmpty()
        .withMessage('Este campo no puede estar vacio')
        .isEmail()
        .withMessage('Este campo debe contener un E-mail')
    ]
}