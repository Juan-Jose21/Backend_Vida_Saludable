const waterController = require('../controllers/agua.controller')
module.exports = (app) => {

    app.post('/api/water/create', waterController.registrarAgua);

}