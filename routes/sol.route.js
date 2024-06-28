const solController = require('../controllers/sol.controller')
module.exports = (app) => {

    app.post('/api/sun/create', solController.registrarSol);
    app.get('/api/sun/:user_id', solController.mostrarEstadisticasTiempo);
}