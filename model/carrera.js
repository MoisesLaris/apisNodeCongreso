'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarreraSchema = Schema({
    idCarrera: Number,
    nombre: String,
    centro: String
//});
},{ shardKey: { _id : 1 }});

module.exports = mongoose.model('Carrera',CarreraSchema,'carrera');
