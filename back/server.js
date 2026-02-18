const express = require('express');
const app = express();
const port = 3000;

var pipeline=require('./middlewares.js');

pipeline(app);

app.listen(port, () => {
    console.log(`Servidor activo en enhttp://localhost:${port}`);
});