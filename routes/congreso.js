'use strict'

var express = require('express');
var congresoController = require('../controllers/congreso');

var api = express.Router();

api.post('/newCongreso',congresoController.newCongreso);
api.get('/getCongreso/:id',congresoController.getCongreso);
api.get('/getCongresos',congresoController.getCongresos);
api.post('/updateCongreso',congresoController.updateCongreso);
api.post('/deleteCongreso',congresoController.deleteCongreso);

module.exports = api;