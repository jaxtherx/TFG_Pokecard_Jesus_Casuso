var express=require('express');
var router=express.Router();
var productosController=require('../controllers/productosController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


router.get('/listar',productosController.getProductos);
router.post('/crear',upload.single('image'),productosController.crearProducto);
router.post('/eliminar',productosController.eliminarProducto);
router.post('/editar',productosController.actualizarProducto);
router.post('/obtener',productosController.obtenerProducto);
router.get('/obtenerCategorias',productosController.obtenerCategorias);
router.get('/obtenerOfertas',productosController.obtenerOfertas);
router.post('/obtenerOferta',productosController.obtenerOferta);

module.exports=router;