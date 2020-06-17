'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actividadSchema = Schema({
    idActividad: Number,
    idCongreso: { type: Schema.ObjectId, ref: 'Congreso'},
    nombre: String,
    descripcion: String,
    fechas : []
});

module.exports = mongoose.model('Actividad',actividadSchema,'actividad');