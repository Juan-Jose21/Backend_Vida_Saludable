const RegistroAgua = require('../models/agua.models');

exports.registrarAgua = (req, res) => {
  const { fecha, hora, cantidad, user_id } = req.body;

  RegistroAgua.create(fecha, hora, cantidad, user_id, (err, registroId) => {
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