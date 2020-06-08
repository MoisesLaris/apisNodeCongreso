'use strict'

var mongoose = require('mongoose');
var User = require('../model/user');
//encriptar contraseña
var bcrypt = require('bcrypt-nodejs');

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
    var params = req.body; //Toma todos los campos que llegan por req en body, y los pone en params
    var user = new User();
    if (params.nombre && params.apellidos && params.tipoUsuario && params.correo && params.password && params.semestre && params.grupo) {
        //Seguir con el video jeje



        user.nombre = params.nombre;
        user.apellidos = params.apellidos;
        user.tipoUsuario = params.tipoUsuario;
        user.correo = params.correo;
        user.semestre = params.semestre;
        user.grupo = params.grupo;

        bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;
            User.find({}).sort({ $natural: -1 }).exec(function(err, doc) {
                if (err) {
                    res.status(404).send({ message: 'No se ha registrado el usuario' });
                }
                var x = doc[0].idUsuario + 1;
                user.idUsuario = x;
                user.save((err, userStored) => {
                    if (err) {
                        return res.status(500).send({ message: 'Error al insertar el usuario ' + err })
                    }
                    if (userStored) {
                        res.status(200).send({ user: userStored });
                    } else {
                        res.status(404).send({ message: 'No se ha registrado el usuario' });
                    }
                });
            });

            //res.status(200).send({message:'Simon ' + valor.toString});
        });
    } else {
        res.status(200).send({
            message: "Hubo un problema al recibir los datos."
        });
    }
}

module.exports = {
    home,
    pruebas,
    newUser
}