'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar rutas

var user_routes = require('./routes/user');
var congreso_routes = require('./routes/congreso');
var FAQ_routes = require('./routes/FAQ');

//Cargar middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors

//Rutas
app.use('/api', user_routes);
app.use('/api', congreso_routes);
app.use('/api', congreso_routes);

//Exportar

module.exports = app;