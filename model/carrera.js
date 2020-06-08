'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarreraSchema = Schema({
    idCarrera: Number,
    nombre: String,
    centro: String
});

module.exports = mongoose.model('Carrera',CarreraSchema);