'use strict'

var mongoose = require('mongoose');

var Pago = require('../model/pago');
var ActividadUsuarioFecha = require('../model/actividadUsuarioFecha');
//encriptar contraseña

//Nueva Actividad
function newPago(req, res) {
    var params = req.body; //Toma todos los campos que llegan por req en body, y los pone en params
    var pago = new Actividad();
    if (params.idUsuario && params.idCongreso && params.idTipoPago && params.cantidad && params.status) {

        pago.idUsuario = params.nombre;
        pago.idCongreso = params.descripcion;
        pago.idTipoPago = params.idCongreso;
        pago.cantidad = params.cantidad;
        pago.status = params.status;

            pago.idPago = 0;
            pago.save((err, pagoStored) => {
                if (err) {
                    return res.status(200).send({ message: 'Error al insertar el pago ' + err })
                }
                if (pagoStored) {
                    res.status(200).send({ actividad : actividadStored });
                } else {
                    res.status(200).send({ message: 'No se ha registrado el pago' });
                }
            });
    } else {
        res.status(200).send({
            message: "Hubo un problema al recibir los datos."
        });
    }
}

//get Actividad
function getPago(req,res) {
    var pagoId = req.params.id;

    Pago.findById(pagoId, (err, pago) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion' ,success:false});

        if (!pago) return res.status(200).send({ message: 'El pago no existe' ,success:false});

        return res.status(200).send({ pago });
    });
}

//get actividades con id usuario
function getPagosUsuario(req, res){
    var idUsuario = req.params.id;
    Pago.find({idUsuario:idUsuario},(err, pagos) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion' ,success:false});

        if (!pagos) return res.status(200).send({ message: 'No hay pagos disponibles' ,success:false});

        return res.status(200).send({
            pagos
        });
    }).sort('_id');
}

//get actividades con id tipo pago
function getPagosTipoPago(req, res){
    var tipoPagoId = req.params.id;
    Pago.find({idTipoPago:tipoPagoId},(err, pagos) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion' ,success:false});

        if (!pagos) return res.status(200).send({ message: 'No hay pagos disponibles' ,success:false});

        return res.status(200).send({
            pagos
        });
    }).sort('_id');
}

//get actividades con id congreso
function getPagosCongreso(req, res){
    var congresoId = req.params.id;
    Pago.find({idCongreso:congresoId},(err, pagos) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion' ,success:false});

        if (!pagos) return res.status(200).send({ message: 'No hay pagos disponibles' ,success:false});

        return res.status(200).send({
            pagos
        });
    }).sort('_id');
}

//Actualizar Pago
function updatePago(req,res){
    var pagoId = req.params.id;
    var update = req.body;

    Pago.findByIdAndUpdate(actividadId, update, { new: true }, (err, actividadUpdated) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!actividadUpdated) return res.status(200).send({ message: 'No se ha podido actualizar', success: false });

        return res.status(200).send({
            message: "Se edito la actividad correctamente",
            success: true
        });
    });
}

//Borrar Actividad
/*
async function deleteActividad(req, res) {
    var actividadId = req.params.id;

   var actividadesUsuarioFecha = await getActividadesUsuarioFecha(actividadId);

    if(actividadesUsuarioFecha >= 1)
    {
        return res.status(200).send({message:"No se puede borrar la actividad, por que tiene actividades asignadas",success:false});
    }

    Actividad.findById(actividadId).remove(err => {
        if (err) return res.status(500).send({ message: 'Error al eliminar la actividad', success: false });

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
}*/

module.exports = {
    newPago,
    getPago,
    getPagosCongreso,
    getPagosTipoPago,
    getPagosUsuario,
    updatePago
}