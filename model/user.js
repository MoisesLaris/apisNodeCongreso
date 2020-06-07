'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSquema = Schema({
    folio: Number,
    nombre: String,
    apellidos: String
});

module.exports = mongoose.model('User', userSquema);