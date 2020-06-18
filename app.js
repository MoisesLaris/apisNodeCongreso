'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar rutas

var user_routes = require('./routes/user');
var congreso_routes = require('./routes/congreso');
var FAQ_routes = require('./routes/FAQ');
var carrera_routes = require('./routes/carrera');
var fecha_routes = require('./routes/fecha');
var actividad_routes = require('./routes/actividad');
var actividadUF_routes = require('./routes/actividadUsuarioFecha');
var tipo_pago = require('./routes/tipoPago');

//Cargar middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors

//Rutas
app.use('/api', user_routes);
app.use('/api', congreso_routes);
app.use('/api', congreso_routes);
app.use('/api', carrera_routes);
app.use('/api', FAQ_routes);
app.use('/api', fecha_routes);
app.use('/api', actividad_routes);
app.use('/api', actividadUF_routes);
app.use('/api', tipo_pago);

//Exportar

module.exports = app;