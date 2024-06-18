const solController = require('../controllers/sol.controller')
module.exports = (app) => {

    app.post('/api/sun/create', solController.registrarSol);

}