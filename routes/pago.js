'use strict'

var express = require('express');
var pagoController = require('../controllers/pago');

var api = express.Router();


api.post('/newAPago',pagoController.newPago);
api.get('/getPagos/:id',pagoController.getPago);
api.get('/getPagos/idUsuario/:id',pagoController.getPagosUsuario);
api.get('/getPagos/idTipoPago/:id',pagoController.getPagosTipoPago);
api.get('/getPagos/idCongreso/:id',pagoController.getPagosCongreso);
api.get('/updatePagos/:id',pagoController.updatePago);


module.exports = api;