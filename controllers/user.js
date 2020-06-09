'use strict'

var mongoose = require('mongoose');
var User = require('../model/user');
var mongoosePaginate = require('mongoose-pagination');
//encriptar contraseña
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');

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

        //Controlar los usuarios repetidos por correo
        User.findOne({ correo: user.correo.toLowerCase() }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error en peticion usuario ' + err })
            if (users) {
                return res.status(200).send({
                    message: "El correo ya esta siendo usado por otro usuario."
                });
            } else {
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
            }
        });


    } else {
        res.status(200).send({
            message: "Hubo un problema al recibir los datos."
        });
    }
}

//Log In
function loginUser(req, res) {
    var params = req.body;

    var email = params.correo;
    var password = params.password;

    /*if(params.correo && params.password)
    {
        return res.status(200).send({message: 'Recibi esto '+params.correo + ' ' + params.password});
    }*/

    User.findOne({ correo: email }, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        //return res.status(200).send({message: 'Recibi esto '+params.correo + ' ' + params.password});
        if (user) {

            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    //Devolver datos de usuario
                    //Devolver token
                    //generar token
                    return res.status(200).send({
                        token: jwt.createToken(user)
                    });

                } else {
                    return res.status(404).send({ message: 'El usuario no se ha podido identificar' });
                }
            });
        } else {
            return res.status(404).send({ message: 'El usuario no existe' });
        }
    });
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

//Actualizar usuario
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    //borrar propiedad password
    delete update.password;

    if (userId != req.user.sub) {
        return res.status(200).send({ message: 'No tienes permisos para esto' });
    }

    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar' });

        return res.status(200).send({
            user: userUpdated,
        })
    });
}

//Borrar usuario
function deleteUser(req, res) {
    var tipoUsuario = req.user.tipoUsuario;
    var usuario = req.user.sub;

    /*if(tipoUsuario != 0)
    {
        return res.status(200).send({message:'No tienes permisos para esto'});
    }*/

    User.findById(usuario).remove(err => {
        if (err) return res.status(500).send({ message: 'Error al eliminar usuario' });

        return res.status(200).send({ message: 'Usuario Eliminado' });
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
    deleteUser
}