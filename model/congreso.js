'use strict'

var mongoose = require('mongoogse');
var Schema = mongoose.Schema;

var CongresoSchema = Schema({
    idCongreso: Number,
    nombre: String,
    idCarrera: {type: Schema.idCarrera, ref: 'Carrera'}
})