'use strinc'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/AutoInc', { useMongoClient: true })
    .then(() => {
        console.log('Conexión exitosa!');

        //Crear servidor
        app.listen(port, () => {
            console.log("Servidor corriendo en localhost:3800");
        });
    })
    .catch((err) => {
        console.log(err);
    })