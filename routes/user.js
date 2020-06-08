'use strict'

var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();

api.get('/home', userController.home);
api.post('/pruebas', userController.pruebas);
api.post('/newUser',userController.newUser);

module.exports = api;