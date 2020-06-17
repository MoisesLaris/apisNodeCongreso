'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actividadUsuarioFechaSchema = Schema({
    idActividadUsuarioFecha : Number,
    idActividad: { type: Schema.ObjectId, ref: 'Actividad'},
    idUsuario: { type: Schema.ObjectId, ref: 'Usuario'},
    fecha: Date
});

module.exports = mongoose.model('ActividadUsuarioFecha',actividadUsuarioFechaSchema,'actividadUsuarioFecha');