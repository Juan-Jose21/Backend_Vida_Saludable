const aireController = require('../controllers/aire.controller')
module.exports = (app) => {

    app.post('/api/air/create', aireController.registrarAire);
    app.get('/api/air/:user_id', aireController.mostrarEstadisticasTiempo);

}