const Despertar = require('../models/despertar.models');

module.exports = {

  registrarDespertar (req, res)  {
    const { fecha, hora, estado, user_id } = req.body;
  
    Despertar.create(fecha, hora, estado, user_id, (err, registroId) => {
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

  mostrarEstadisticasD (req, res)  {
    const { user_id} = req.params;
  
    Despertar.mostrarEstadisticas(user_id, (err, data) => {
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