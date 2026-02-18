var express = require('express');
var path = require('path');
const multer = require('multer');
var cookiParser = require('cookie-parser');
var cors = require('cors');
var routing = require('./routing/routingMain.js');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const bodyParser = require('body-parser');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ¡Asegúrate de crear esta carpeta en /back!
  },
  filename: (req, file, cb) => {
    // Usamos timestamp para que no haya nombres repetidos
    cb(null, Date.now() + path.extname(file.originalname));
  }
});



module.exports = function (servidorweb) {
    servidorweb.use(cors({
        origin: ['http://localhost:4200'],
        credentials: true,
        optionsSuccessStatus: 204
    }));






    servidorweb.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    servidorweb.use(cookiParser());
    servidorweb.use(express.urlencoded({ extended: true }));
    servidorweb.use(bodyParser.json({ limit: '30mb' }));
    servidorweb.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
    servidorweb.use(express.json());
   




    routing(servidorweb)
}