const dbconfig = require('../dbConfig');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const pool = new Pool(dbconfig);

module.exports = {
    obtenerPedidos:async(req,res) => {
        const {usuario_id} = req.body
        const pool = new Pool(dbconfig);
        let client;
        try{
            client = await pool.connect()
            var query = `SELECT * FROM pedidos WHERE usuarios_id = $1`
            var valoresQuery=[usuario_id]
            var result =  await client.query(query, valoresQuery)
            res.json({codigo:0, mensaje:'Pedidos obtenidos', data:result.rows})


        }catch(error){
            res.send(error)
        }
        finally{
            if (client) client.release()
        }
    },
    borrarPedido:async(req,res) => {
        const {id} = req.body
        const pool = new Pool(dbconfig);
        let client;
        try{
            client = await pool.connect()
            var query = `DELETE FROM pedidos WHERE id = $1`
            var valoresQuery=[id]
            var result =  await client.query(query, valoresQuery)
            res.json({codigo:0, mensaje:'Pedido borrado', data:result.rows})


        }catch(error){
            res.send(error)
        }
        finally{
            if (client) client.release()
        }
    }
}