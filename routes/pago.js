'use strict'

var express = require('express');
var pagoController = require('../controllers/pago');

var api = express.Router();


api.post('/newPago', pagoController.newPago);
api.get('/getPagos/:id', pagoController.getPago);
api.get('/getPagos/idUsuario/:id', pagoController.getPagosUsuario);
api.get('/getPagos/idTipoPago/:id', pagoController.getPagosTipoPago);
api.get('/getPagos/idCongreso/:id', pagoController.getPagosCongreso);
api.post('/updatePagos/:id', pagoController.updatePago);


module.exports = api;