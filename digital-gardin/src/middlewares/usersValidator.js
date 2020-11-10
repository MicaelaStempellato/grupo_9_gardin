const { check, validationResult, body } = require("express-validator");
var path = require("path")

module.exports={
    users: [
        check('user-name')
        .isEmpty()
        .withMessage('Este campo no puede estar vacio')
        .isAlpha()
        .withMessage('El nombre no puede contener numeros')
        .isLength( {min:3, max:15} )
        .withMessage('El nombre debe tener entre 3 y 15 caracteres'),

        check('user-surname')
        .isEmpty()
        .withMessage('Este campo no puede estar vacio')
        .isAlpha()
        .withMessage('El apellido no puede contener numeros')
        .isLength( {min:3, max:15} )
        .withMessage('El apellido debe tener entre 3 y 15 caracteres'),

        check('email')
        .isEmpty()
        .withMessage('Este campo no puede estar vacio')
        .isEmail()
        .withMessage('Este campo debe contener un E-mail'),

        check('pass')
        .isEmpty()
        .withMessage('Este campo no puede estar vacio')
        .isLength( {min:6, max:20} )
        .withMessage('La contraseña debe tener entre 6 y 20 caracteres'),
        
        body('pass2')
        .custom(function (value) {
            if (value == req.body.pass){
                return true
            } else { return false}
        })
        .withMessage('las contraseñas deben coincidir')
    ]
}