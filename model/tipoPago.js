'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tipoPagoSquema = Schema({
    idTipoPago: Number,
    nombre: String,
    descripcion: String,
    precio: Number,
    idCongreso: { type: Schema.ObjectId, ref: 'Congreso'},
});
//},{ shardKey: { _id : 1 }});

module.exports = mongoose.model('TipoPago', tipoPagoSquema, "idTipoPago");