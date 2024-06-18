const RegistroEjercicio = require('../models/ejercicio.model');

exports.registrarEjercicio = (req, res) => {
  const { fecha, tipo, tiempo, user_id } = req.body;

  RegistroEjercicio.create(fecha, tipo, tiempo, user_id, (err, registroId) => {
    if (err) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    return res.status(201).json({
      success: true,
      message: 'El registro se realizo correctamente',
      data: registroId
    });
  });
};