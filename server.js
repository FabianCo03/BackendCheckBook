/*
const express es igual al módulo que voy a requerir ('express').
método express a través del cual lo voy a ejecutar.
set. = setear.
process.env.PORT, (variable de ambiente) es útil para cuando despliego la aplicación y el hosting me da una puerta que puedo usar.
app.listen = que mi servidor empiece a escuchar en una puerta.
app.get = obtenemos valor del puerto.
arrow function nos permite saber a través de un console.log si nuestro servidor está corriendo.
app.get('port') es útil para cuando la aplicación crece y estoy usando el valor del puerto en muchas partes del código, entonces si lo necesito modificar solo debo modificarlo en app.set("port", process.env.PORT || 9000);.
Ruta principal de nuestra aplicación, a través del slash empieza la ruta principal, 

Debo manipular mi servidor manualmente, esto se torna engorroso, por lo tanto está automatizado en 
*/
const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const clientes = require('./routes/clientes');
const mesas = require('./routes/mesas');
const reservas = require('./routes/reservas');
const cors = require('cors');

const app = express();
app.set('port', process.env.PORT || 9000);
//objeto de configuraciones - puerto por defecto MYSQL = 3306 - user por defecto es root
const db_options = {
    host: 'localhost',
    port: 3306,
    user: 'fabian',
    password: 'fabianco',
    database: 'db_reservas'
};

const optionsCors = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(optionsCors));

//middlewars -------------------------------
//estrategia de conexión 'single'
app.use(myconn(mysql, db_options, 'single'));
app.use(express.json());
// routes ----------------------------------
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});
app.use('/api', clientes);
app.use('/api', mesas);
app.use('/api', reservas);


// server running --------------------------
//routes
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
});