const Proyecto = require('../models/proyecto.models');


module.exports = {
    registrarProyecto (req, res) {
        const { nombre, fecha_inicio, fecha_fin } = req.body;
      
        Proyecto.create(nombre, fecha_inicio, fecha_fin, (err, registroId) => {
          if (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
          }
          return res.status(201).json({
            success: true,
            message: 'El registro se realizo correctamente',
            data: registroId
          });
        });
      },

    getAllProyecto (req, res) {
        Proyecto.findAll((err, roles) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Hubo un error al obtener los Proyectos',
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Proyectos obtenidos correctamente',
                data: roles
            });
        });
    }

}