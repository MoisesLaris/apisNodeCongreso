'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actividadSchema = Schema({
    idActividad: Number,
    idCongreso: { type: Schema.ObjectId, ref: 'Congreso'},
    nombre: String,
    descripcion: String,
    fechas : [],
    color: String
});
//},{ shardKey: { _id : 1 }});

module.exports = mongoose.model('Actividad',actividadSchema,'actividad');