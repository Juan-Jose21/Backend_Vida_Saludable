const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

/*
* IMPORTAR RUTAS
*/
const usersRoutes = require('./routes/user.route');
const feedingRegister = require('./routes/alimento.route');
const waterRegister = require('./routes/agua.route');
const hopeRegister = require('./routes/esperanza.route');
const sunRegister = require('./routes/sol.route');
const airRegister = require('./routes/aire.route');
const sleepRegister = require('./routes/dormir.route');
const wake_upRegister = require('./routes/despertar.route');
const exerciseRegister = require('./routes/ejercicio.route');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

/*
* IMPORTAR RUTAS
*/
usersRoutes(app);
feedingRegister(app);
waterRegister( app);
hopeRegister( app);
sunRegister( app);
airRegister( app);
sleepRegister( app);
wake_upRegister( app);
exerciseRegister( app);

server.listen(3000,'192.168.1.100' || 'localhost', function(){
    console.log('Aplicacion de Nodejs ' + port + ' Iniciada....');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

app.get('/', (req, res) => {
    res.send('Ruta Raiz del Backend');
});


module.exports = {
    app: app,
    server: server
}