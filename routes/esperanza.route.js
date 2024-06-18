const esperanzaController = require('../controllers/esperanza.controller')
module.exports = (app) => {

    app.post('/api/hope/create', esperanzaController.registrarEsperanza);

}