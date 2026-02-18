const {Pool} = require('pg');
const dotenv = require('dotenv').config();

let bbddElegida=process.env.POSTGRE_DATABASE;


const dbConfig = {
  user: process.env.POSTGRE_USER,
  password: process.env.POSTGRE_PASSWORD,
  database: process.env.POSTGRE_DATABASE,
  host: process.env.POSTGRE_HOST,
  port: process.env.POSTGRE_PORT, 
  max: 90, // Número máximo de clientes en el pool
  idleTimeoutMillis: 30000, // Tiempo máximo en milisegundos que un cliente puede estar inactivo en el pool antes de ser eliminado
  connectionTimeoutMillis: 2000,
};

module.exports = dbConfig