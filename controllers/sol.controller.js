const Sol = require('../models/sol.model');

module.exports = {
  registrarSol (req, res) {
    const { fecha, tiempo, user_id } = req.body;
  
    Sol.create(fecha, tiempo, user_id, (err, registroId) => {
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

  mostrarEstadisticasTiempo (req, res) {
    const { user_id } = req.params;
  
    Sol.mostrarEstadisticasTiempoSol(user_id, (err, data) => {
      if (err) {
        console.error('Error al obtener estadísticas:', err);
        res.status(500).json({ error: 'Error al obtener estadísticas' });
      } else {
        const formattedData = data.map(item => ({
          fecha: item.fecha.toISOString().split('T')[0],
          minutos: item.minutos,
          dia: item.dia_semana
        }));
        console.log('Datos obtenidos:', formattedData);
        res.json(formattedData);
      }
    });
  },

}