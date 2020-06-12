'use strict'

var express = require('express');
var actividadUFController = require('../controllers/actividadUsuarioFecha');

var api = express.Router();


api.post('/newActividadUF',actividadUFController.newActividadUsuarioFecha);
api.get('/getActividadUF/:id',actividadUFController.getActividadUsuarioFecha);
api.get('/getActividadUF/idUsuario/:id',actividadUFController.getActividadesUsuario);
api.get('/getActividadUF/idFecha/:id',actividadUFController.getActividadesFecha);
api.get('/getActividadUF/idActividad/:id',actividadUFController.getActividadesActividad);
api.get('/updateActividadUF/:id',actividadUFController.updateActividadUsuarioFecha);
api.get('/updateActividadUF/idUsuarioCero',actividadUFController.getActividadesUsuarioCero);


module.exports = api;