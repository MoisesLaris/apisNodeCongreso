'use strict'

var express = require('express');
var carreraController = require('../controllers/carrera');

var api = express.Router();

api.post('/newCarrera',carreraController.newCarrera);
api.get('/getCarreras',carreraController.getCarreras);
api.get('/getCarrera/:id',carreraController.getCarrera);
api.put('/updateCarrera/:id',carreraController.updateCarrera);
api.put('/deletecarrera/:id',carreraController.deleteCarrera);

module.exports = api;