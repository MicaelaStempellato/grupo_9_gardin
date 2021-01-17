var express = require('express');
var router = express.Router();
let usersController = require('../controllers/usersController')
let usersValidator = require ('../middlewares/usersValidator')
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/users'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
  })

var upload = multer({
    storage,
 
    // Validate image
    fileFilter: (req, file, cb) => {
 
       const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
 
       const ext = path.extname(file.originalname);
       
       if (!acceptedExtensions.includes(ext)) {
          req.file = file;
       }
 
       cb(null, acceptedExtensions.includes(ext));
    }
 });

// LogIn de usuarios.
router.get('/login', usersController.login);
router.post('/login', usersValidator.usersLog, usersController.loginForm);

//Registración de usuarios
router.get('/signin', usersController.registrarse);
router.post('/registro', usersValidator.usersReg, usersController.registroForm);

//Modificación de usuarios
router.get('/edit', usersController.edit)
router.post('/edit', usersValidator.userEdit, usersController.editForm)
router.post('/avatar', upload.single('avatar'), usersValidator.avatar, usersController.editAvatar)
router.post('/password', usersValidator.passEdit, usersController.editPass)

router.post('/logout', usersController.logout)

/* GET users profile. */
router.get('/profile', usersController.perfil);

module.exports = router;
