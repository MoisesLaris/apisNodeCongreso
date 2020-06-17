'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var congresoSquema = Schema({
    idCongreso: Number,
    nombre: String,
    idCarrera: { type: Schema.ObjectId, ref: 'Carrera'},
    fechaInicio : Date,
    fechaFin : Date
});

module.exports = mongoose.model('Congreso', congresoSquema, "congreso");
