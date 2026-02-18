var express=require('express');
var router=express.Router();
var pedidoController=require('../controllers/pedidoController');

router.post('/obtenerPedidos', pedidoController.obtenerPedidos);
router.post('/borrarPedido', pedidoController.borrarPedido);


module.exports=router;