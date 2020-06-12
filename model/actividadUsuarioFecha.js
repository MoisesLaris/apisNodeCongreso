'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actividadUsuarioFechaSchema = Schema({
    idActividadUsuarioFecha : Number,
    idActividad: { type: Schema.ObjectId, ref: 'Actividad'},
    idUsuario: { type: Schema.ObjectId, ref: 'Usuario'},
    idFecha: { type: Schema.ObjectId, ref: 'Fecha'},
    horario: Date
});

module.exports = mongoose.model('ActividadUsuarioFecha',actividadUsuarioFechaSchema,'actividadUsuarioFecha');