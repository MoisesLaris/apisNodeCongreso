'use strict'

var express = require('express');
var actividadController = require('../controllers/actividad');

var api = express.Router();


api.post('/newActividad',actividadController.newActividad);
api.get('/getActividad/:id',actividadController.getActividad);
api.get('/getActividades/:id',actividadController.getActividadesCongreso);
api.post('/updateActividad',actividadController.updateActividad);
api.post('/deleteActividad',actividadController.deleteActividad);

module.exports = api;