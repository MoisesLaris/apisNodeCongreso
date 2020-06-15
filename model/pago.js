'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pagoSquema = Schema({
    idPago: Number,
    idUsuario: { type: Schema.ObjectId, ref: 'User'},
    idTipoPago: { type: Schema.ObjectId, ref: 'TipoPago'},
    cantidad: Number,
    status: Boolean
});

module.exports = mongoose.model('Pago', pagoSquema, "pago");