'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fechaSquema = Schema({
    idFecha: Number,
    fecha: Date
//});
},{ shardKey: { _id : 1 }});

module.exports = mongoose.model('Fecha', fechaSquema, "fecha");