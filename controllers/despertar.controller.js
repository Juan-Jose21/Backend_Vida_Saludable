const RegistroDespertar = require('../models/despertar.models');

exports.registrarDespertar = (req, res) => {
  const { fecha, hora, estado, user_id } = req.body;

  RegistroDespertar.create(fecha, hora, estado, user_id, (err, registroId) => {
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