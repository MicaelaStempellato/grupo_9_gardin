const {body} = require("express-validator");
var path = require("path")

module.exports={
    product: [
        body("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .bail()
        .isLength({min: 5, max: 40})
        .withMessage("Debe tener entre 5 y 120 caracteres"),
        body("descripcion")
        .notEmpty()
        .withMessage("La descripción es obligatoria")
        .bail()
        .isLength({min: 20, max:400})
        .withMessage("La descripción debe tener mínimo 20 caracteres y máximo 400"),
        body("precio")
        .notEmpty()
        .withMessage("El precio es obligatorio")
        .bail()
        .isFloat()
        .withMessage("El precio debe ser un número"),
        body("image")
        .custom(function(values, {req}){
            if(req.file != undefined){
                return true
            }
            return false
        })
        .withMessage("Imagen Obligatoria")
        .bail()
        .custom(function(value, {req}){
            let ext = path.extname(req.file.originalname)
            if(ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".JPG" || ext == ".JPEG" || ext == ".PNG"){
                return true;
            }
            return false;
        })
        .withMessage("Imagen debe ser un archivo jpg, jpeg o png"),
        body("idioma")
        .notEmpty()
        .withMessage("El idioma es obligatorio"),
        body("unidades")
        .notEmpty()
        .withMessage("Las unidades son obligatorias")
        .bail()
        .isLength({min: 20})
        .withMessage("Las uidades deben tener mínimo 20 caracteres"),
        body("edad")
        .notEmpty()
        .withMessage("La edad es obligatoria"),
        body("experiencia")
        .notEmpty()
        .withMessage("La experiencia es obligatoria"),
        body("ambiente")
        .notEmpty()
        .withMessage("El embiente es obligatorio")
        

    ],
    
    update: [
        body("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .bail()
        .isLength({min: 5, max: 40})
        .withMessage("Debe tener entre 5 y 120 caracteres"),
        body("descripcion")
        .notEmpty()
        .withMessage("La descripción es obligatoria")
        .bail()
        .isLength({min: 20, max:400})
        .withMessage("La descripción debe tener mínimo 20 caracteres y máximo 400"),
        body("precio")
        .notEmpty()
        .withMessage("El precio es obligatorio")
        .bail()
        .isFloat()
        .withMessage("El precio debe ser un número"),
        body("image")
        .custom(function(values, {req}){
            if(req.file != undefined){
                let ext = path.extname(req.file.originalname)
                if(ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".JPG" || ext == ".JPEG" || ext == ".PNG"){
                    return true;
                }
                return false;
            } else {
                return true;
            }
             })
    
        .withMessage("Imagen debe ser un archivo jpg, jpeg o png"),
        body("idioma")
        .notEmpty()
        .withMessage("El idioma es obligatorio"),
        body("unidades")
        .notEmpty()
        .withMessage("Las unidades son obligatorias")
        .bail()
        .isLength({min: 20})
        .withMessage("Las uidades deben tener mínimo 20 caracteres"),
        body("edad")
        .notEmpty()
        .withMessage("La edad es obligatoria"),
        body("experiencia")
        .notEmpty()
        .withMessage("La experiencia es obligatoria"),
        body("ambiente")
        .notEmpty()
        .withMessage("El embiente es obligatorio")
        

    ]
}