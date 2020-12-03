var express = require('express');
var router = express.Router();
let usersController = require('../controllers/usersController')
let usersValidator = require ('../middlewares/usersValidator')
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/usersAvatars'))
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

/* GET users listing. */
router.get('/login', usersController.login);
router.post('/login', usersValidator.usersLog, usersController.loginForm);
router.get('/signin', usersController.registrarse);
router.post('/registro', upload.single('image'), usersValidator.usersReg, usersController.registroForm);

module.exports = router;
