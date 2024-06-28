// const { use } = require('passport');
const Esperanza = require('../models/esperanza.model');

module.exports = {

  registrarEsperanza (req, res) {
    const { fecha, tipo_practica, user_id } = req.body;
  
    Esperanza.create(fecha, tipo_practica, user_id, (err, registroId) => {
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

  mostrarEstadisticasEsperanza (req, res)  {
    const { user_id} = req.params;
  
    Esperanza.mostrarEstadisticasE(user_id, (err, data) => {
      if (err) {
        console.error('Error al obtener estadísticas:', err);
        res.status(500).json({ error: 'Error al obtener estadísticas' });
      } else {
        console.log('Datos obtenidos:', data);
        res.json(data);
      }
    });
  },

}