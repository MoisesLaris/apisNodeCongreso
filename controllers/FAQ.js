'use strict'

var mongoose = require('mongoose');
var FAQ = require('../model/FAQ');
var mongoosePaginate = require('mongoose-pagination');
//encriptar contraseña
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');

var md_auth = require('../middleware/authenticated');

//Crear nuevo usuario
function newFAQ(req, res) {
    var params = req.body; //Toma todos los campos que llegan por req en body, y los pone en params
    var Faq = new FAQ();
    if (params.idUsuario && params.comentario && params.respuesta) {
        //Seguir con el video jeje
        Faq.idUsuario = params.idUsuario;
        Faq.comentario = params.comentario;
        Faq.respuesta = params.respuesta;

        FAQ.find({}).sort({ $natural: -1 }).exec(function(err, doc) {
            if (err) {
                res.status(200).send({ message: 'No se guardo la pregunta', success: false });
            }
            var x = doc[0].idUsuario + 1;
            Faq.idFAQ = x;
            Faq.save((err, faqStored) => {
                if (err) {
                    return res.status(200).send({ message: 'Error al insertar la nueva pregunta ' + err, success: false })
                }
                if (faqStored) {
                    res.status(200).send({ message: "Se creo la pregunta correctamente", success: true });
                } else {
                    res.status(200).send({ message: 'No se ha registrado la nueva pregunta', success: false });
                }
            });
        });


    } else {
        res.status(200).send({
            message: "Hubo un problema al recibir los datos.",
            success: false
        });
    }
}

//Consultar usuarios
function getUser(req, res) {
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!user) return res.status(404).send({ message: 'El usuario no existe' });

        return res.status(200).send({ user });
    });
}

//Consultar usuarios por paginas
function getUsers(req, res) {
    var identity_user_id = req.user.sub;

    var page = 1;

    if (req.params.page) {
        page = req.params.page;
    }

    var itemsPerPage = 5;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!users) return res.status(404).send({ message: 'No hay usuarios disponibles' });

        return res.status(200).send({
            users,
            total,
            pages: Math.ceil(total / itemsPerPage),
        });
    });

}

//Borrar usuario
function deleteUser(req, res) {
    var tipoUsuario = req.user.tipoUsuario;
    var usuario = req.user.sub;

    if (tipoUsuario != 0) {
        return res.status(200).send({ message: 'No tienes permisos para esto', success: false });
    }

    User.findById(usuario).remove(err => {
        if (err) return res.status(500).send({ message: 'Error al eliminar usuario', success: false });

        return res.status(200).send({ message: 'Usuario Eliminado', success: true });
    });
}

module.exports = {
    newFAQ
}