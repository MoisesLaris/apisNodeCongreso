'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CongresoSchema = Schema({
    idCongreso: Number,
    nombre: String,
    idCarrera: { type: Schema.idCarrera, ref: 'Carrera' }
})