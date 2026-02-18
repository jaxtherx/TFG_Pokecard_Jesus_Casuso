var express=require('express');
var router=express.Router();
var carritoController=require('../controllers/carritoController');

router.post('/agregarProducto', carritoController.agregarProducto);
router.post('/obtenerCarrito', carritoController.obtenerCarrito);
router.post('/eliminarProducto', carritoController.eliminarProducto);
router.post('/actualizarCantidad', carritoController.actualizarCantidad);
router.post('/cantidadTotal', carritoController.cantidadTotal);
router.post('/finalizarCompra', carritoController.finalizarCompra);


module.exports=router;