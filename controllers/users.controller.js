const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Keys = require('../config/keys');


module.exports = {

    login(req, res) {

        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {

            console.log('Usuario:', myUser);
            console.log('Error:', err);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error en la autenticacion',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrada',
                    error: err
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, Keys.secretOrKey, {});

                const data = {
                    id: `${myUser.id}`,
                    email: myUser.email,
                    name: myUser.name,
                    last_name: myUser.last_name,
                    phone: myUser.phone,
                    session_token: `JWT ${token}`
                }
                return res.status(201).json({
                    success: true,
                    message: 'El Usuario fue autenticado',
                    data: data
                });
            }

            else{
                return res.status(401).json({
                    success: false,
                    message: 'El Password es inconrrecto',
                });
            }

        });

    },

    register(req, res) {

        const user = req.body;
        User.create(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al registrar al usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data
            });

        });
        
    },

    getAllUsers (req, res) {
        User.findAll((err, users) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Hubo un error al obtener usuarios',
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Usuarios obtenidos correctamente',
                data: users
            });
        });
    },

    getAllRoles (req, res) {
        User.findAllRoles((err, roles) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Hubo un error al obtener los Roles',
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Roles obtenidos correctamente',
                data: roles
            });
        });
    }

}