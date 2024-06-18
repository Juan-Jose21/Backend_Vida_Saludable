const RegistroDormir = require('../models/dormir.models');

exports.registrarDormir = (req, res) => {
  const { fecha, hora, user_id } = req.body;

  RegistroDormir.create(fecha, hora, user_id, (err, registroId) => {
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