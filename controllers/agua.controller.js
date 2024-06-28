const Agua = require('../models/agua.models');

module.exports = {

  registrarAgua (req, res) {
    const { fecha, hora, cantidad, user_id } = req.body;
  
    Agua.create(fecha, hora, cantidad, user_id, (err, registroId) => {
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

  mostrarEstadisticasAgua (req, res) {
    const { user_id } = req.params;
  
    Agua.mostrarEstadisticasAgua(user_id, (err, data) => {
      if (err) {
        console.error('Error al obtener estadísticas:', err);
        res.status(500).json({ error: 'Error al obtener estadísticas' });
      } else {
        const formattedData = data.map(item => ({
          fecha: item.fecha.toISOString().split('T')[0],
          dia: item.dia_semana,
          cantidad_ml: item.total_agua_ml,
        }));
        console.log('Datos obtenidos:', formattedData);
        res.json(formattedData);
      }
    });
  }

}