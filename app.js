'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar rutas


//Cargar middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors

//Rutas

app.get('/', (req, res) => {
    res.status(200).send({
        message: "Pruebas en nodeJs",
    });
});
app.post('/pruebas', (req, res) => {
    console.log(req.body);
    res.status(200).send({
        message: "Pruebas en nodeJs -> post",
    });
});

//Exportar

module.exports = app;