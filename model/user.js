'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSquema = Schema({
    idUsuario: Number,
    nombre: String,
    apellidos: String,
    tipoUsuario: Number,
    correo: String,
    password: String,
    semestre: Number,
    grupo: String,
    idCarrera: { type: Schema.ObjectId, ref: 'Carrera' }
});

module.exports = mongoose.model('User', userSquema, "usuario");