const dormirController = require('../controllers/dormir.controller')
module.exports = (app) => {

    app.post('/api/sleep/create', dormirController.registrarDormir);

}