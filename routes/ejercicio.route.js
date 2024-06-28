const ejercicioController = require('../controllers/ejercicio.controller')
module.exports = (app) => {

    app.post('/api/exercise/create', ejercicioController.registrarEjercicio);
    app.get('/api/exercise/:user_id', ejercicioController.mostrarEstadisticas);
    app.get('/api/exercise/tiempo/:user_id', ejercicioController.mostrarEstadisticasT);
    app.get('/api/exercise/tipo/:user_id/:tipo', ejercicioController.mostrarEstadisticasTipo);
}