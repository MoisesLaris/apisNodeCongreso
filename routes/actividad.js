'use strict'

var express = require('express');
var actividadController = require('../controllers/actividad');

var api = express.Router();


api.post('/newActividad',actividadController.newActividad);
api.get('/getActividad/:id',actividadController.getActividad);
api.get('/getActividades/idCongreso/:id',actividadController.getActividadesCongreso);
api.post('/updateActividad/:id',actividadController.updateActividad);
api.post('/deleteActividad/:id',actividadController.deleteActividad);

module.exports = api;