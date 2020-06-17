'use strict'

var mongoose = require('mongoose');

var Actividad = require('../model/actividad');
var ActividadUsuarioFecha = require('../model/actividadUsuarioFecha');
//encriptar contraseña

//Nueva Actividad
function newActividad(req, res) {
    var params = req.body; //Toma todos los campos que llegan por req en body, y los pone en params
    var actividad = new Actividad();
    if (params.nombre && params.descripcion && params.idCongreso && params.fechas) {

        actividad.nombre = params.nombre;
        actividad.descripcion = params.descripcion;
        actividad.idCongreso = params.idCongreso;
        actividad.fechas = params.fechas;

        Actividad.find({nombre:actividad.nombre,idCongreso:actividad.idCongreso}).sort({ $natural: -1 }).exec(function(err, doc) {
            if (err) {
                res.status(200).send({ message: 'No se ha registrado la actividad' });
            }
            actividad.idActividad = 0;
            actividad.save((err, actividadStored) => {
                if (err) {
                    return res.status(200).send({ message: 'Error al insertar la actividad ' + err })
                }
                if (actividadStored) {
                    res.status(200).send({ actividad : actividadStored });
                } else {
                    res.status(200).send({ message: 'No se ha registrado la actividad' });
                }
            });
        });
    } else {
        res.status(200).send({
            message: "Hubo un problema al recibir los datos."
        });
    }
}

//get Actividad
function getActividad(req,res) {
    var actividadId = req.params.id;

    Actividad.findById(actividadId, (err, actividad) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion' ,success:false});

        if (!actividad) return res.status(200).send({ message: 'La actividad no existe' ,success:false});

        return res.status(200).send({ actividad });
    });
}

//get actividades con id congreso
function getActividadesCongreso(req, res){
    var idCongreso = req.params.id;
    Actividades.find({idCongreso:idCongreso},(err, actividades) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion' ,success:false});

        if (!actividades) return res.status(200).send({ message: 'No hay actividades disponibles' ,success:false});

        return res.status(200).send({
            actividades
        });
    }).sort('_id');
}

//Actualizar Actividad
function updateActividad(req,res){
    var actividadId = req.params.id;
    var update = req.body;

    Actividad.findByIdAndUpdate(actividadId, update, { new: true }, (err, actividadUpdated) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!actividadUpdated) return res.status(200).send({ message: 'No se ha podido actualizar', success: false });

        return res.status(200).send({
            message: "Se edito la actividad correctamente",
            success: true
        });
    });
}

//Borrar Actividad
async function deleteActividad(req, res) {
    var actividadId = req.params.id;

   var actividadesUsuarioFecha = await getActividadesUsuarioFecha(actividadId);

    if(actividadesUsuarioFecha >= 1)
    {
        return res.status(200).send({message:"No se puede borrar la actividad, por que tiene actividades asignadas",success:false});
    }

    Actividad.deleteOne({_id:actividadId},err => {
        if (err) return res.status(200).send({ message: 'Error al eliminar la actividad', success: false });

        return res.status(200).send({ message: 'Actividad eliminada', success: true });
    });
}

async function getActividadesUsuarioFecha(actividadId)
{
    var actividades = await ActividadUsuarioFecha.countDocuments({idActividad: actividadId}, function(err, c) {
        if(err) return handleError(err);
        console.log('Count is ' + c);
        return c;
    });
    return actividades;
}

module.exports = {
    newActividad,
    getActividad,
    getActividadesCongreso,
    updateActividad,
    deleteActividad
}