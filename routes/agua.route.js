const aguaController = require('../controllers/agua.controller')
module.exports = (app) => {

    app.post('/api/water/create', aguaController.registrarAgua);
    app.get('/api/water/:user_id', aguaController.mostrarEstadisticasAgua);

}