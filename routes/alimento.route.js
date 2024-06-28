const alimentacionController = require('../controllers/alimento.controller')
module.exports = (app) => {

    app.post('/api/feeding/create', alimentacionController.registrarAlimento);
    app.get('/api/feeding/:user_id/:tipo_alimento', alimentacionController.mostrarEstadisticasTipo);
    app.get('/api/feeding/:user_id', alimentacionController.mostrarEstadisticas);

}