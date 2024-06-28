const esperanzaController = require('../controllers/esperanza.controller')
module.exports = (app) => {

    app.post('/api/hope/create', esperanzaController.registrarEsperanza);
    app.get('/api/hope/:user_id', esperanzaController.mostrarEstadisticasEsperanza);
}