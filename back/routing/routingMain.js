const routingLogin = require('./routingLogin');
const routingProductos = require('./routingProductos');
const routingCarrito = require('./routingCarrito');
const routingPedidos = require('./routingPedidos');
var cabecera= (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
    
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
};


module.exports = function(app) {
    app.use('/login', cabecera,routingLogin);
    app.use('/productos', cabecera,routingProductos);
    app.use('/carrito', cabecera,routingCarrito);
    app.use('/pedidos', cabecera,routingPedidos);
};