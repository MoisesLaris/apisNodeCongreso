'use strict'

var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();

var md_auth = require('../middleware/authenticated');

api.get('/home', userController.home);
api.get('/pruebas', md_auth.ensureAuth, userController.pruebas);
api.post('/newUser', userController.newUser);
api.post('/login', userController.loginUser);
api.get('/getUser/:id', md_auth.ensureAuth, userController.getUser);
api.get('/getUsers', md_auth.ensureAuth, userController.getUsers);
api.put('/updateUser/:id', md_auth.ensureAuth, userController.updateUser);
api.put('/deleteUser/:id', md_auth.ensureAuth, userController.deleteUser);
api.get('/getUserByToken', md_auth.ensureAuth, userController.getUserByToken);

module.exports = api;