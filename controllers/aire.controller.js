const RegistroAire = require('../models/aire.models');

exports.registrarAire = (req, res) => {
  const { fecha, tiempo, user_id } = req.body;

  RegistroAire.create(fecha, tiempo, user_id, (err, registroId) => {
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