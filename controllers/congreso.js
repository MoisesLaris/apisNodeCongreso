'use strict'

var mongoose = require('mongoose');

var Congreso = require('../model/congreso');
var Actividad = require('../model/actividad');
var Pago = require('../model/pago');
var TipoPago = require('../model/tipoPago');
//encriptar contraseña

//Nuevo Congreso
function newCongreso(req, res) {
    var params = req.body; //Toma todos los campos que llegan por req en body, y los pone en params
    var congreso = new Congreso();
    if (params.nombre && params.idCarrera && params.fechaInicio && params.fechaFin) {

        congreso.nombre = params.nombre;
        congreso.idCarrera = params.idCarrera;
        congreso.fechaInicio = params.fechaInicio;
        congreso.fechaFin = params.fechaFin;

        Congreso.find({ nombre: congreso.nombre }).sort({ $natural: -1 }).exec(function(err, doc) {
            if (err) {
                res.status(200).send({ message: 'No se ha registrado el congreso' });
            }
            congreso.idCongreso = 0;
            congreso.save((err, congresoStored) => {
                if (err) {
                    return res.status(200).send({ message: 'Error al insertar el congreso ' + err })
                }
                if (congresoStored) {
                    res.status(200).send({ message: "Se ha creado el congreso correctamente", success: true });
                } else {
                    res.status(200).send({ message: 'No se ha registrado el congreso' });
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
function getCongreso(req, res) {
    var congresoId = req.params.id;

    Congreso.findById(congresoId, (err, congreso) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!congreso) return res.status(200).send({ message: 'El congreso no existe', success: false });

        return res.status(200).send({ congreso });
    });
}

//get congresos
function getCongresos(req, res) {
    Congreso.find((err, congresos) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!congresos) return res.status(200).send({ message: 'No hay congresos disponibles', success: false });

        return res.status(200).send({
            congresos
        });
    }).sort('_id').populate({ path: 'idCarrera' });
}

//get congresos
function getCongresosCarrera(req, res) {

    var carreraId = req.params.id;

    Congreso.find({ idCarrera: carreraId }, (err, congresos) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!congresos) return res.status(200).send({ message: 'No hay congresos disponibles', success: false });

        return res.status(200).send({
            congresos
        });
    }).sort('_id').populate({ path: 'idCarrera' });
}

//Get congresos en los que esta inscrito el usuario
function getCongresoUsers(req, res)
{
    //var usuarioId = req.user.sub;//Lo tomamos de el token de JWT
    var usuarioId = req.params.id;

    Pago.aggregate([//Sobre la coleccion de pago, puede ser cualquier otra
       // { "$match": {idUsuario: ObjectId(/*"5ee3bbf17853d008ffed8e01"*/usuarioId)}},//Este es como el where
        {"$lookup"://Join, une dos tablas
            {
                //En est parte se une pago con usuario
              from: "usuario",
              localField: "idUsuario",
              foreignField:"_id",
              as: "usuario"
            }},{
                "$unwind": "$usuario"//Para regresar solo uno, no un array
              },
              //En esta parte se une pago con tipoPago
              {"$lookup":
            {
              from: "idTipoPago",
              localField: "idTipoPago",
              foreignField:"_id",
              as: "tipoPago"
            }},{"$group":{
                _id: "$tipoPago._id",
                idCongreso : {"$first":"$tipoPago.idCongreso"},
                total: {"$first":"$tipoPago.precio"},
                pagado: {"$sum":"$cantidad"},
                usuario: {"$first":"$usuario.idUsuario"}
            }},
            {"$lookup":
            {
              from: "congreso",
              localField: "idCongreso",
              foreignField:"_id",
              as: "congreso"
            }},
            {
                "$unwind": {"path":"$congreso", "preserveNullAndEmptyArrays":true}//Para regresar solo uno, no un array
            },
            
    ]).exec((err,result) => {
        console.log(`result`,result);
        console.log(`err`,err);

        var usuarios = [];

        
        result.forEach((usuario) => {
            if(usuario.idCongreso[0] == req.params.id)
            {
                usuarios.push(usuario);
            }
        });

        return res.status(200).send({
            message: "Se edito el usuario correctamente",
            success: true,
            usuarios: result
        });
    });
}

//Actualizar Congreso
function updateCongreso(req, res) {
    var congresoId = req.params.id;
    var update = req.body;

    Congreso.findByIdAndUpdate(congresoId, update, { new: true }, (err, congresoUpdated) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!congresoUpdated) return res.status(200).send({ message: 'No se ha podido actualizar', success: false });

        return res.status(200).send({
            message: "Se edito el congreso correctamente",
            success: true
        });
    });
}

//Borrar Congreso
async function deleteCongreso(req, res) {
    var congresoId = req.params.id;

    var actividades = await getActividades(congresoId);

    //return res.status(200).send({message:"Regreso de actividades " + actividades});
    //if(actividades == null)//Calando cosas
    //actividades = 0;
    if (actividades >= 1) {
        return res.status(200).send({ message: "No se puede borrar el congreso, por que tiene actividades asignadas", success: false });
    }

    Congreso.deleteOne({ _id: congresoId }, err => {
        if (err) return res.status(200).send({ message: 'Error al eliminar el congreso', success: false });

        return res.status(200).send({ message: 'Congreso eliminado', success: true });
    });
}

async function getActividades(congresoId) {
    var actividades = await Actividad.countDocuments({ idCongreso: congresoId }, function(err, c) {
        if (err) return handleError(err);
        console.log('Count is ' + c);
        return c;
    });
    return actividades;
}

module.exports = {
    newCongreso,
    getCongreso,
    getCongresos,
    updateCongreso,
    deleteCongreso,
    getCongresosCarrera,
    getCongresoUsers
}