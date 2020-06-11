'use strict'

var mongoose = require('mongoose');

var Congreso = require('../model/congreso');
//encriptar contraseña

//Nuevo Congreso
function newCongreso(req, res) {
    var params = req.body; //Toma todos los campos que llegan por req en body, y los pone en params
    var congreso = new Congreso();
    if (params.nombre && params.idCarrera) {

        congreso.nombre = params.nombre;
        congreso.idCarrera = params.idCarrera;

        Congreso.find({nombre:congreso.nombre}).sort({ $natural: -1 }).exec(function(err, doc) {
            if (err) {
                res.status(404).send({ message: 'No se ha registrado el usuario' });
            }
            congreso.idCongreso = 0;
            congreso.save((err, congresoStored) => {
                if (err) {
                    return res.status(500).send({ message: 'Error al insertar el congreso ' + err })
                }
                if (congresoStored) {
                    res.status(200).send({ congreso : congresoStored });
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
    newCongreso
}