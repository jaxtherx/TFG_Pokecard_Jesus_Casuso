var express=require('express');
var router=express.Router();
var loginController=require('../controllers/loginController');


router.post('/login',loginController.login);
router.post('/registro',loginController.registro);
router.post('/cambiarContrasena',loginController.cambiarContrasena);


module.exports=router;