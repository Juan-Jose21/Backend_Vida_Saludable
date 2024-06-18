const { use } = require('passport');
const RegistroEsperanza = require('../models/esperanza.model');

exports.registrarEsperanza = (req, res) => {
  const { fecha, tipo_practica, user_id } = req.body;

  RegistroEsperanza.create(fecha, tipo_practica, user_id, (err, registroId) => {
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