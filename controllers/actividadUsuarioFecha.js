'use strict'

var mongoose = require('mongoose');

var Actividad = require('../model/actividad');
var ActividadUsuarioFecha = require('../model/actividadUsuarioFecha');
//encriptar contraseña

//Nueva Actividad
function newActividadUsuarioFecha(req, res) {
    var params = req.body; //Toma todos los campos que llegan por req en body, y los pone en params
    var actividadUsuarioFecha = new ActividadUsuarioFecha();
    if (params.idUsuario && params.idActividad && params.fecha) {

        actividadUsuarioFecha.idUsuario = params.idUsuario;
        actividadUsuarioFecha.fecha = params.fecha;
        actividadUsuarioFecha.idActividad = params.idActividad;

        ActividadUsuarioFecha.find({ idUsuario: actividadUsuarioFecha.idUsuario, idFecha: actividadUsuarioFecha.idFecha, horario: actividadUsuarioFecha.horario }).sort({ $natural: -1 }).exec(function(err, doc) {
            if (err) {
                res.status(200).send({ message: 'No se ha registrado la actividad', success: false });
            }
            actividadUsuarioFecha.idActividadUsuarioFecha = 0;
            actividadUsuarioFecha.save((err, actividadStored) => {
                if (err) {
                    return res.status(200).send({ message: 'Error al insertar la actividad ', success: true })
                }
                if (actividadStored) {
                    res.status(200).send({ message: 'Se ha registrado la actividad', success: true });
                } else {
                    res.status(200).send({ message: 'No se ha registrado la actividad', success: false });
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

//get Actividad por id ActividadUsuarioFecha
function getActividadUsuarioFecha(req, res) {
    var actividadId = req.params.id;

    ActividadUsuarioFecha.findById(actividadId, (err, actividad) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!actividad) return res.status(200).send({ message: 'La actividad no existe', success: false });

        return res.status(200).send({ actividad });
    });
}

//get actividadesUsuarioFecha por idUsuario
function getActividadesUsuario(req, res) {
    var idUsuario = req.params.id;
    ActividadUsuarioFecha.find({ idUsuario: idUsuario }, (err, actividades) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!actividades) return res.status(200).send({ message: 'No hay actividades disponibles', success: false });

        return res.status(200).send({
            actividades
        });
    }).sort('_id');
}

//get actividadesUsuarioFecha por idActividad
function getActividadesActividad(req, res) {
    var actividadId = req.params.id;
    ActividadUsuarioFecha.find({ idActividad: actividadId }, (err, actividades) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!actividades) return res.status(200).send({ message: 'No hay congresos disponibles', success: false });

        return res.status(200).send({
            actividades
        });
    }).sort('_id').populate({ path: 'idUsuario' });
}

//get actividadesUsuarioFecha por idFecha
function getActividadesFecha(req, res) {
    var idFecha = req.params.id;
    ActividadUsuarioFecha.find({ idFecha: idFecha }, (err, actividades) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!actividades) return res.status(200).send({ message: 'No hay actividades disponibles', success: false });

        return res.status(200).send({
            actividades
        });
    }).sort('_id');
}

function getActividadesUsuarioCero(req, res) {
    var id = req.params.id;
    ActividadUsuarioFecha.find({ idUsuario: 0 }, (err, actividades) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!actividades) return res.status(200).send({ message: 'No hay actividades disponibles', success: false });

        return res.status(200).send({
            actividades
        });
    });
}

//Actualizar Actividad
function updateActividadUsuarioFecha(req, res) {
    var actividadId = req.params.id;
    var update = req.body;

    ActividadUsuarioFecha.findByIdAndUpdate(actividadId, update, { new: true }, (err, actividadUpdated) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!actividadUpdated) return res.status(200).send({ message: 'No se ha podido actualizar', success: false });

        return res.status(200).send({
            message: "Se edito la actividad correctamente",
            success: true
        });
    });
}

//Borrar Actividad
/*async function deleteActividadUsuarioFecha(req, res) {
    var actividadId = req.params.id;

   var actividadesUsuarioFecha = await getActividadesUsuarioFecha(actividadId);

    if(actividadesUsuarioFecha >= 1)
    {
        return res.status(200).send({message:"No se puede borrar la actividad, por que tiene actividades asignadas",success:false});
    }

    ActividadUsuarioFecha.findById(actividadId).remove(err => {
        if (err) return res.status(500).send({ message: 'Error al eliminar la actividad', success: false });

        return res.status(200).send({ message: 'Actividad eliminada', success: true });
    });
}
/*
async function getActividadesUsuarioFecha(actividadId)
{
    var actividades = await ActividadUsuarioFecha.countDocuments({idActividad: actividadId}, function(err, c) {
        if(err) return handleError(err);
        console.log('Count is ' + c);
        return c;
    });
    return actividades;
}*/

module.exports = {
    newActividadUsuarioFecha,
    getActividadesUsuario,
    getActividadesActividad,
    getActividadesUsuario,
    getActividadesFecha,
    updateActividadUsuarioFecha,
    getActividadUsuarioFecha,
    getActividadesUsuarioCero
}