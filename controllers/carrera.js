'use strict'

var mongoose = require('mongoose');

var Carrera = require('../model/carrera');
//encriptar contraseña

function newCarrera(req, res) {
    var params = req.body; //Toma todos los campos que llegan por req en body, y los pone en params
    var carrera = new Carrera();
    if (params.nombre && params.centro) {

        carrera.nombre = params.nombre;
        carrera.centro = params.centro;

        Carrera.find({}).sort({ $natural: -1 }).exec(function(err, doc) {
            if (err) {
                res.status(404).send({ message: 'No se ha registrado el usuario' });
            }
            carrera.idCarrera = 0;
            carrera.save((err, carreraStored) => {
                if (err) {
                    return res.status(500).send({ message: 'Error al insertar el congreso ' + err })
                }
                if (carreraStored) {
                    res.status(200).send({ carrera : carreraStored });
                } else {
                    res.status(404).send({ message: 'No se ha registrado el congreso' });
                }
            });
        });
    } else {
        res.status(200).send({
            message: "Hubo un problema al recibir los datos."
        });
    }
}

module.exports = {
    newCarrera
}