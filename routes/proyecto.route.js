const proyectoController = require('../controllers/proyecto.controller');

module.exports = (app) => {

    app.post('/api/proyecto/create', proyectoController.registrarProyecto);
    app.get('/api/proyecto/list', proyectoController.getAllProyecto);

}