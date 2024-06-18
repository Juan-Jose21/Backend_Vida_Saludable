const usersController = require('../Controllers/users.controller');

module.exports = (app) => {

    app.post('/api/users/create', usersController.register);
    app.post('/api/users/login', usersController.login);
    app.get('/api/users/list', usersController.getAllUsers);

}