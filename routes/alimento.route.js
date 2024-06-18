const feedingRegister = require('../controllers/alimento.controller')
module.exports = (app) => {

    app.post('/api/feeding/create', feedingRegister.registrarAlimento);

}