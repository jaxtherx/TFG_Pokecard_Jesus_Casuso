const dbconfig = require('../dbConfig');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool(dbconfig);

module.exports = {
    agregarProducto:async(req,res) => {
        const {usuario_id, producto_id, cantidad} = req.body
        let client;
        try{
            client = await pool.connect()
            var query = `INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES ($1, $2, $3) ON CONFLICT (usuario_id, producto_id) DO UPDATE SET cantidad = EXCLUDED.cantidad + carrito.cantidad`
            var valoresQuery=[usuario_id, producto_id, cantidad]
            var result =  await client.query(query, valoresQuery)
            res.json({codigo:0, mensaje:'Agregado'})


        }catch(error){
            res.send(error)
        }
        finally{
            client.release()
        }
    },
    obtenerCarrito:async(req,res) => {
        const {usuario_id} = req.body
        let client;
        try{
            client = await pool.connect()
            var query = `SELECT p.id , p.nombre, p.precio, p.ruta_imagen, c.cantidad, (p.precio * c.cantidad) AS subtotal FROM carrito c JOIN producto p ON c.producto_id = p.id WHERE c.usuario_id = $1;`
            var valoresQuery=[usuario_id]
            var result =  await client.query(query, valoresQuery)
            res.json({codigo:0, mensaje:'Obtenido', data:result.rows})


        }catch(error){
            res.send(error)
        }
        finally{
            client.release()
        }
    },
    eliminarProducto:async(req,res) => {
        const {usuario_id, producto_id} = req.body
        let client;
        try{
            client = await pool.connect()
            var query = `DELETE FROM carrito WHERE usuario_id = $1 AND producto_id = $2`
            var valoresQuery=[usuario_id, producto_id]
            var result =  await client.query(query, valoresQuery)
            res.json({codigo:0, mensaje:'Eliminado'})


        }catch(error){
            res.send(error)
        }
        finally{
            client.release()
        }
    },
    actualizarCantidad:async(req,res) => {
        const {usuario_id, producto_id, cantidad} = req.body
        let client;
        try{
            client = await pool.connect()
            var query = `UPDATE carrito SET cantidad = $1 WHERE usuario_id = $2 AND producto_id = $3`
            var valoresQuery=[cantidad, usuario_id, producto_id]
            var result =  await client.query(query, valoresQuery)
            res.json({codigo:0, mensaje:'Actualizado'})


        }catch(error){
            res.send(error)
        }
        finally{
            client.release()
        }
    },
    cantidadTotal:async(req,res) => {
        const {usuario_id} = req.body
        let client;
        try{
            client = await pool.connect()
            var query = `SELECT SUM(cantidad) as cantidad FROM carrito WHERE usuario_id = $1`
            var valoresQuery=[usuario_id]
            var result =  await client.query(query, valoresQuery)
            res.json({codigo:0, mensaje:'Cantidad total', data:result.rows})


        }catch(error){
            res.send(error)
        }
        finally{
            client.release()
        }
    },
    finalizarCompra:async(req,res) => {
        const {usuario_id} = req.body
        let client;
        try{
            client = await pool.connect()
            const carritoQuery = `
            SELECT c.producto_id, c.cantidad, p.precio 
            FROM carrito c 
            JOIN producto p ON c.producto_id = p.id 
            WHERE c.usuario_id = $1`;
        const resCarrito = await client.query(carritoQuery, [usuario_id]);
        
        const total = resCarrito.rows.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

        const pedidoInsert = `
            INSERT INTO pedidos (usuarios_id, fecha, total, metodo_pago) 
            VALUES ($1, NOW(), $2, $3) RETURNING id`;
        const resPedido = await client.query(pedidoInsert, [usuario_id, total, 1]);
        const nuevoPedidoId = resPedido.rows[0].id;

        for (const item of resCarrito.rows) {
            await client.query(
                `INSERT INTO detalles_pedidos (pedido_id, producto_id, cantidad, precio_unidad) 
                 VALUES ($1, $2, $3, $4)`,
                [nuevoPedidoId, item.producto_id, item.cantidad, item.precio]
            );

            const updateStockQuery = `
        UPDATE producto 
        SET stock = stock - $1 
        WHERE id = $2 AND stock >= $1
        RETURNING stock`;
    
    const resUpdate = await client.query(updateStockQuery, [item.cantidad, item.producto_id]);

    if (resUpdate.rowCount === 0) {
        throw new Error(`Stock insuficiente para el producto ID: ${item.producto_id}`);
    }
        }

        await client.query('DELETE FROM carrito WHERE usuario_id = $1', [usuario_id]);

        await client.query('COMMIT');
        res.json({ success: true, pedidoId: nuevoPedidoId });


        }catch(error){
            res.send(error)
        }
        finally{
            client.release()
        }
    }
}