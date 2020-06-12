'use strict'

var mongoose = require('mongoose');
var Fecha = require('../model/fecha');
var mongoosePaginate = require('mongoose-pagination');
//encriptar contraseña
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');

var md_auth = require('../middleware/authenticated');

//Nuevo Congreso
function newFecha(req, res) {
    var params = req.body; //Toma todos los campos que llegan por req en body, y los pone en params
    var fecha = new Fecha();
    if (params.fecha) {

        fecha.fecha = params.fecha;

        Fecha.find({fecha:fecha.fecha}).sort({ $natural: -1 }).exec(function(err, doc) {
            if (err) {
                res.status(200).send({ message: 'No se ha registrado la fecha' });
            }
            fecha.idFecha = 0;
            fecha.save((err, fechaStored) => {
                if (err) {
                    return res.status(200).send({ message: 'Error al insertar la fecha ' + err })
                }
                if (fechaStored) {
                    res.status(200).send({ fecha : fechaStored });
                } else {
                    res.status(200).send({ message: 'No se ha registrado la fecha' });
                }
            });
        });
    } else {
        res.status(200).send({
            message: "Hubo un problema al recibir los datos."
        });
    }
}

//get Congreso
function getFecha(req,res) {
    var fechaId = req.params.id;

    Fecha.findById(fechaId, (err, fecha) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion' ,success:false});

        if (!fecha) return res.status(200).send({ message: 'La fecha no existe' ,success:false});

        return res.status(200).send({ fecha });
    });
}

//get congresos
function getFechas(req, res){
    Fecha.find((err, fechas) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion' ,success:false});

        if (!fechas) return res.status(200).send({ message: 'No hay fechas disponibles' ,success:false});

        return res.status(200).send({
            fechas
        });
    }).sort('fecha');//Posible error
}

//Actualizar Congreso
function updateFecha(req,res){
    var fechaId = req.params.id;
    var update = req.body;

    Fecha.findByIdAndUpdate(fechaId, update, { new: true }, (err, fechaUpdated) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!fechaUpdated) return res.status(200).send({ message: 'No se ha podido actualizar', success: false });

        return res.status(200).send({
            message: "Se edito la fecha correctamente",
            success: true
        });
    });
}

//Borrar Congreso
async function deleteFecha(req, res) {
    var fechaId = req.params.id;

   var actividadesUsuariosFecha = await getActividadesUsuarioFecha(fechaId);

    if(actividadesUsuariosFecha >= 1)
    {
        return res.status(200).send({message:"No se puede borrar el congreso, por que tiene pagos asignados",success:false});
    }

    Fecha.deleteOne({_id:fechaId},err => {
        if (err) return res.status(200).send({ message: 'Error al eliminar la fecha', success: false });

        return res.status(200).send({ message: 'Fecha eliminada', success: true });
    });
}

async function getActividadesUsuarioFecha(idFecha)
{
    var actividadesUsuariosFecha = await ActividadUsuarioFecha.countDocuments({idFecha: idFecha}, function(err, c) {
        if(err) return handleError(err);
        console.log('Count is ' + c);
        return c;
    });
    return actividadesUsuariosFecha;
}

module.exports = {
    newFecha,
    getFecha,
    getFechas,
    updateFecha,
    deleteFecha
}