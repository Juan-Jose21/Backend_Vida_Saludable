const TypeFeeding = require('../models/tipo_alimento');

module.exports = {

    register(req, res) {

        const type = req.body; // CAPTURA LOS DATOS QUE ENVIA EL CLIENTE
        TypeFeeding.create(type, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al registrar el Tipo de Alimento',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data 
            });

        });
        
    }

}