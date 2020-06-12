'use strict'

var express = require('express');
var tipoPagoController = require('../controllers/tipoPago');

var api = express.Router();

var md_auth = require('../middleware/authenticated');

api.post('/newTipoPago', tipoPagoController.newTipoPago);
api.get('/getTipoPago/:id', tipoPagoController.getTipoPago);
api.get('/getTipoPagos', tipoPagoController.getTipoPagos);
api.post('/updateTipoPago', tipoPagoController.updateTipoPago);
api.post('/deleteTipoPago', tipoPagoController.deleteTipoPago);

module.exports = api;