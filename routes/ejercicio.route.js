const exerciseController = require('../controllers/ejercicio.controller')
module.exports = (app) => {

    app.post('/api/exercise/create', exerciseController.registrarEjercicio);

}