'use strict'

var express = require('express');
var fechaController = require('../controllers/fecha');

var api = express.Router();

var md_auth = require('../middleware/authenticated');

api.post('/newFecha', fechaController.newFecha);
api.get('/getFecha/:id', fechaController.getFecha);
api.get('/getFechas', fechaController.getFechas);
api.post('/updateFecha/:id', fechaController.updateFecha);
api.post('/deleteFecha/:id', fechaController.deleteFecha);

module.exports = api;