'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FAQSquema = Schema({
    idFAQ: Number,
    idUsuario: { type: Schema.ObjectId, ref: 'User'},
    comentario: String,
    respuesta: String
});

module.exports = mongoose.model('FAQ', FAQSquema, "faq");