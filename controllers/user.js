'use strict'

var User = require('../model/user');

function home(req, res) {
    res.status(200).send({
        message: "Pruebas en nodeJs",
    });
}

function pruebas(req, res) {
    console.log(req.body);
    res.status(200).send({
        message: "Pruebas en nodeJs -> post",
    });
}

function newUser(req, res) {
    var params = req.body;
    var user = new User();
    if (params.nombre && params.apellidos && params.tipoUsuario && params.correo && params.password && params.semestre && params.grupo) {
        //Seguir con el video jeje

    }
}

module.exports = {
    home,
    pruebas
}