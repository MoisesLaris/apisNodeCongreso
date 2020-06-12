'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tipoPagoSquema = Schema({
    idTipoPago: Number,
    nombre: String,
    descripcion: String,
    precio: Number
});

module.exports = mongoose.model('TipoPago', tipoPagoSquema, "idTipoPago");