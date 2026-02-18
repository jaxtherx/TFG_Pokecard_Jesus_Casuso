const dbconfig = require('../dbConfig');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool(dbconfig);

module.exports = {
    crearProducto: async (req, res) => {
        let client;
        const {nombre, precio, stock, categoria_id, idioma, descripcion} = req.body
        const imagen = req.file.filename;

        try {
            console.log(req.body)
            client = await pool.connect();

            const query = 'INSERT INTO producto (nombre, precio, stock, ruta_imagen, categoria_id, idioma, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7)';
            const valoresQuery = [nombre, precio, stock, imagen, categoria_id, idioma, descripcion]
            const result = await client.query(query, valoresQuery);

            return res.status(200).json(result.rows);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        } finally {
            client.release();
        }
    },
    eliminarProducto: async (req, res) => {
        let client;
        const {id} = req.body

        try {
            client = await pool.connect();

            const querySelect = 'SELECT ruta_imagen FROM producto WHERE id = $1';
            const resultSelect = await client.query(querySelect, [id]);

            const query = 'DELETE FROM producto WHERE id = $1';
            const valoresQuery = [id]
            const result = await client.query(query, valoresQuery);

            if (resultSelect.rows.length > 0) {
                const imagen = resultSelect.rows[0].ruta_imagen;
                if (imagen) {
                    const rutaImagen = path.join(__dirname, '../uploads', imagen);
                    if (fs.existsSync(rutaImagen)) {
                        fs.unlinkSync(rutaImagen);
                    }
                }
            }

            return res.status(200).json(result.rows);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        } finally {
            client.release();
        }
    },
    actualizarProducto: async (req, res) => {
        let client;
        const {id, nombre, precio, stock, categoria_id, idioma, descripcion} = req.body

        try {
            client = await pool.connect();

            const query = 'UPDATE producto SET nombre = $1, precio = $2, stock = $3, categoria_id = $4, idioma = $5, descripcion = $6 WHERE id = $7';
            const valoresQuery = [nombre, precio, stock, categoria_id, idioma, descripcion, id]
            const result = await client.query(query, valoresQuery);

            return res.status(200).json(result.rows);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        } finally {
            client.release();
        }
    },
    getProductos: async (req, res) => {
        let client;

        try {
            client = await pool.connect();

            const query = 'SELECT * FROM producto';
            const result = await client.query(query);

            return res.status(200).json(result.rows);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        } finally {
            client.release();
        }
    },
    obtenerProducto: async (req, res) => {
            let client;
            const {id} = req.body

            try {
                client = await pool.connect();

                const query = 'SELECT * FROM producto WHERE id = $1';
                const valoresQuery = [id]
                const result = await client.query(query, valoresQuery);

                return res.status(200).json(result.rows);

            } catch (error) {
                return res.status(500).json({ error: error.message });
            } finally {
                client.release();
            }
        },
    obtenerCategorias: async (req, res) => {
        let client;

        try {
            client = await pool.connect();

            const query = 'SELECT * FROM categoria';
            const result = await client.query(query);

            return res.status(200).json(result.rows);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        } finally {
            client.release();
        }
    },
    getProductos: async (req, res) => {
        let client;

        try {
            client = await pool.connect();

            const query = 'SELECT * FROM producto';
            const result = await client.query(query);

            return res.status(200).json(result.rows);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        } finally {
            client.release();
        }
    },
    obtenerOferta: async (req, res) => {
        let client;
        const {id} = req.body

        try {
            client = await pool.connect();

            const query = 'SELECT * FROM ofertas WHERE id = $1';
            const valoresQuery = [id]
            const result = await client.query(query, valoresQuery);

            return res.status(200).json(result.rows);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        } finally {
            client.release();
        }
    },
    obtenerOfertas: async (req, res) => {
        let client;
        const {id} = req.body

        try {
            client = await pool.connect();

            const query = 'SELECT * FROM ofertas';
            const valoresQuery = [id]
            const result = await client.query(query, valoresQuery);

            return res.status(200).json(result.rows);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        } finally {
            client.release();
        }
    },

};