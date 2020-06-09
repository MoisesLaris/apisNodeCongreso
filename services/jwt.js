'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'moisy_el_precioso';

exports.createToken = function(user)
{
    var payload = {
        sub: user._id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        correo: user.correo,
        tipoUsuario : user.tipoUsuario,
        semestre : user.semestre,
        grupo : user.grupo,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix()
    };

    return jwt.encode(payload, secret);
};