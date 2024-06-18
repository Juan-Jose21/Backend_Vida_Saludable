const waterRegister = require('../controllers/tipo_alimento_controller')
module.exports = (app) => {

    app.post('/api/type/feeding/create', waterRegister.register);

}