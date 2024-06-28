const despertarController = require('../controllers/despertar.controller')
module.exports = (app) => {

    app.post('/api/wake_up/create', despertarController.registrarDespertar);
    app.get('/api/wake_up/:user_id', despertarController.mostrarEstadisticasD);
}