const dbconfig = require('../dbConfig');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool(dbconfig);

module.exports = {

  login: async (req, res) => {
    const { email, passwd } = req.body;
    let client;

    try {
      client = await pool.connect();

      const query = 'SELECT * FROM usuarios WHERE email = $1';
      const result = await client.query(query, [email]);

      if (!result.rows[0]) {
        return res.send({
          codigo: 1,
          mensaje: 'No hay ningún usuario con ese email'
        });
      }

      const usuario = result.rows[0];


      if (usuario.contraseña !== passwd) {
        return res.send({
          codigo: 2,
          mensaje: 'Contraseña incorrecta'
        });
      }

      return res.status(200).json({
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol
      });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    } finally {
      client.release();
    }
  },
   registro:async(req,res) => {
        const {nombre, email, passwd} = req.body
        let client;
        try{
            client = await pool.connect()
            var query = `SELECT * FROM usuarios WHERE email = $1`
            var queryValores = [email]
            var result  = await client.query(query, queryValores)
            if(result.rows[0]){
              return res.json({codigo:1, mensaje:"Ya ha un usuario con ese email"})
            }
            var query2 = `INSERT INTO usuarios (nombre, email, contraseña) VALUES ($1, $2, $3)`
            var valoresQuery2=[nombre, email, passwd]
            var result2 =  await client.query(query2, valoresQuery2)
            res.json({codigo:0, mensaje:'Creado'})



        }catch(error){
            res.send(error)
        }
        finally{
            client.release()
        }
    },
    cambiarContrasena:async(req,res) => {
        const {id, passwd} = req.body
        let client;
        try{
          console.log(req.body)
            client = await pool.connect()
            var query = `UPDATE usuarios SET contraseña = $1 WHERE id = $2`
            var valoresQuery=[passwd, id]
            var result =  await client.query(query, valoresQuery)
            res.json({codigo:0, mensaje:'Cambiado'})


        }catch(error){
            res.send(error)
        }
        finally{
            client.release()
        }
    
    },
};
