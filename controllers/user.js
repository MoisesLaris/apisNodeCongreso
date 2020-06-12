'use strict'

var mongoose = require('mongoose');
var User = require('../model/user');
var mongoosePaginate = require('mongoose-pagination');
//encriptar contraseña
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');

var md_auth = require('../middleware/authenticated');

//Metodo de prueba
function home(req, res) {
    res.status(200).send({
        message: "Pruebas en nodeJs",
    });
}

//Metodos de prueba
function pruebas(req, res) {
    console.log(req.body);
    res.status(200).send({
        message: "Pruebas en nodeJs -> post",
    });
}

//Crear nuevo usuario
function newUser(req, res) {
    var params = req.body; //Toma todos los campos que llegan por req en body, y los pone en params
    var user = new User();
    if (params.nombre && params.apellidos && params.correo && params.password && params.semestre && params.grupo) {
        //Seguir con el video jeje

        user.nombre = params.nombre;
        user.apellidos = params.apellidos;
        user.tipoUsuario = 1;
        user.correo = params.correo.toLowerCase();
        user.semestre = params.semestre;
        user.grupo = params.grupo;
        user.idCarrera = null;

        //Controlar los usuarios repetidos por correo
        User.findOne({ correo: user.correo.toLowerCase() }).exec((err, users) => {
            if (err) return res.status(500).send({ message: "Error en la busqueda", success: false })
            if (users) {
                return res.status(200).send({
                    message: "El correo ya esta siendo usado por otro usuario.",
                    success: false
                });
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    if (err) return res.status(500).send({ message: "Error al encryptar la contraseña", success: false })
                    user.password = hash;
                    User.find({}).sort({ $natural: -1 }).exec(function(err, doc) {
                        if (err) {
                            res.status(200).send({ message: 'No se ha registrado el usuario', success: false });
                        }
                        var x = doc[0].idUsuario + 1;
                        user.idUsuario = x;
                        user.save((err, userStored) => {
                            if (err) {
                                return res.status(200).send({ message: 'Error al insertar el usuario ' + err, success: false })
                            }
                            if (userStored) {
                                res.status(200).send({ message: "Se creo el usuario correctamente", success: true });
                            } else {
                                res.status(200).send({ message: 'No se ha registrado el usuario', success: false });
                            }
                        });
                    });

                    //res.status(200).send({message:'Simon ' + valor.toString});
                });
            }
        });


    } else {
        res.status(200).send({
            message: "Hubo un problema al recibir los datos.",
            success: false
        });
    }
}

//Log In
function loginUser(req, res) {
    var params = req.body;

    var email = params.correo;
    var password = params.password;

    User.findOne({ correo: email }, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion', success: false });
        //return res.status(200).send({message: 'Recibi esto '+params.correo + ' ' + params.password});
        if (user) {

            bcrypt.compare(password, user.password, (err, check) => {
                if (err) return res.status(200).send({ message: 'Correo o contraseña incorrecta', success: false });
                //console.log(user);
                if (check) {
                    var userReturn = user;
                    userReturn.password = undefined;
                    return res.status(200).send({
                        token: jwt.createToken(user),
                        success: true,
                        tipoUsuario: user.tipoUsuario,
                        message: "Se inicio sesion correctamente",
                        user: userReturn
                    });

                } else {
                    return res.status(200).send({ message: 'Correo o contraseña incorrecta', success: false });
                }
            });
        } else {
            return res.status(200).send({ message: 'El usuario no existe', success: false });
        }
    });
}

//Consultar usuarios
function getUser(req, res) {
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion', success: false });

        if (!user) return res.status(404).send({ message: 'El usuario no existe', success: false });

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

    User.find((err, users, total) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion', success: false });

        if (!users) return res.status(404).send({ message: 'No hay usuarios disponibles', success: false });

        return res.status(200).send({
            users
        });
    }).sort('_id');

}

//Actualizar usuario
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    //borrar propiedad password
    delete update.password;

    if (req.user.tipoUsuario != 0) {
        return res.status(200).send({ message: 'No tienes permisos para esto', success: false });
    }

    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion', success: false });

        if (!userUpdated) return res.status(200).send({ message: 'No se ha podido actualizar', success: false });

        return res.status(200).send({
            message: "Se edito el usuario correctamente",
            success: true
        });
    });
}

//Borrar usuario
function deleteUser(req, res) {
    var tipoUsuario = req.user.tipoUsuario;
    //var usuario = req.user.sub;

    var usuario = req.params.id;

    if (tipoUsuario != 0) {
        return res.status(200).send({ message: 'No tienes permisos para esto', success: false });
    }

    User.deleteOne(usuario,err => {
        if (err) return res.status(200).send({ message: 'Error al eliminar usuario', success: false });

        return res.status(200).send({ message: 'Usuario Eliminado', success: true });
    });
}

function getUserByToken(req, res) {
    var userReturn = req.user;
    userReturn.password = undefined;
    return res.status(200).send({
        token: req.headers.authorization,
        success: true,
        tipoUsuario: userReturn.tipoUsuario,
        message: "Informacion de usuario",
        user: userReturn
    });
}

module.exports = {
    home,
    pruebas,
    newUser,
    loginUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    getUserByToken
}