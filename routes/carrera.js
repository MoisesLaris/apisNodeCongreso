'use strict'

var express = require('express');
var carreraController = require('../controllers/carrera');

var api = express.Router();

api.post('/newCarrera',carreraController.newCarrera);

module.exports = api;