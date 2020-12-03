const {body} = require("express-validator");
var path = require("path")

module.exports={
    product: [
        body("name")
        .notEmpty()
        .withMessage("El nombre del curso es obligatorio")
        .bail()
        .isLength({min: 5, max: 40})
        .withMessage("Debe tener entre 5 y 120 caracteres"),
        body("description")
        .notEmpty()
        .withMessage("La descripción es obligatoria")
        .bail()
        .isLength({min: 20, max:400})
        .withMessage("La descripción debe tener mínimo 20 caracteres y máximo 400"),
        body("price")
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
        body("professor")
        .notEmpty()
        .withMessage("El nombre del profesor es obligatorio")
        .bail()
        .isLength({min: 5, max: 120})
        .withMessage("El nombre del profesor debe tener mínimo 5 caracteres y máximo 120"),
        body("duration")
        .notEmpty()
        .withMessage("La duración del curso es obligatoria")
        .bail()
        .isLength({min: 5, max: 120})
        .withMessage("La duración del curso debe tener mínimo 5 caracteres y máximo 120"),
        body("language")
        .notEmpty()
        .withMessage("El idioma es obligatorio"),
        body("unit_name")
        .notEmpty()
        .withMessage("Las unidades son obligatorias")
        .bail()
        .isLength({min: 5})
        .withMessage("Las uidades deben tener mínimo 5 caracteres"),
        body("req_name")
        .notEmpty()
        .withMessage("Los requisitos son obligatorios")
        .bail()
        .isLength({min: 4})
        .withMessage("Los requisitos deben tener mínimo 4 caracteres"),
        body("age_id")
        .notEmpty()
        .withMessage("La edad es obligatoria"),
        body("experience_id")
        .notEmpty()
        .withMessage("La experiencia es obligatoria"),
        body("environment_id")
        .notEmpty()
        .withMessage("El embiente es obligatorio")
        

    ],
    
    update: [
        body("name")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .bail()
        .isLength({min: 5, max: 40})
        .withMessage("Debe tener entre 5 y 120 caracteres"),
        body("description")
        .notEmpty()
        .withMessage("La descripción es obligatoria")
        .bail()
        .isLength({min: 20, max:400})
        .withMessage("La descripción debe tener mínimo 20 caracteres y máximo 400"),
        body("price")
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
        body("professor")
        .notEmpty()
        .withMessage("El nombre del profesor es obligatorio")
        .bail()
        .isLength({min: 5, max: 120})
        .withMessage("El nombre del profesor debe tener mínimo 5 caracteres y máximo 120"),
        body("duration")
        .notEmpty()
        .withMessage("La duración del curso es obligatoria")
        .bail()
        .isLength({min: 5, max: 120})
        .withMessage("La duración del curso debe tener mínimo 5 caracteres y máximo 120"),
        body("language")
        .notEmpty()
        .withMessage("El idioma es obligatorio"),
        body("unit_name")
        .notEmpty()
        .withMessage("Las unidades son obligatorias")
        .bail()
        .isLength({min: 5})
        .withMessage("Las uidades deben tener mínimo 5 caracteres"),
        body("req_name")
        .notEmpty()
        .withMessage("Los requisitos son obligatorios")
        .bail()
        .isLength({min: 4})
        .withMessage("Los requisitos deben tener mínimo 4 caracteres"),
        body("age_id")
        .notEmpty()
        .withMessage("La edad es obligatoria"),
        body("experience_id")
        .notEmpty()
        .withMessage("La experiencia es obligatoria"),
        body("environment_id")
        .notEmpty()
        .withMessage("El embiente es obligatorio")
        

    ]
}