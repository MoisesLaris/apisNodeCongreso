'use strict'

var express = require('express');
var tipoPagoController = require('../controllers/tipoPago');

var api = express.Router();

var md_auth = require('../middleware/authenticated');

api.post('/newTipoPago', tipoPagoController.newTipoPago);
api.get('/getTipoPago/:id', tipoPagoController.getTipoPago);
api.get('/getTipoPagos', tipoPagoController.getTipoPagos);
api.get('/getTipoPagos/idCongreso/:id', tipoPagoController.getTipoPagosCongreso);
api.post('/updateTipoPago/:id', tipoPagoController.updateTipoPago);
api.post('/deleteTipoPago/:id', tipoPagoController.deleteTipoPago);

module.exports = api;