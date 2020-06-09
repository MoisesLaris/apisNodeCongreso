'use strict'

var express = require('express');
var congresoController = require('../controllers/congreso');

var api = express.Router();

api.post('/newCongreso',congresoController.newCongreso);

module.exports = api;