const Ejercicio = require('../models/ejercicio.model');

module.exports = {

  registrarEjercicio (req, res) {
    const { fecha, tipo, tiempo, user_id } = req.body;
  
    Ejercicio.create(fecha, tipo, tiempo, user_id, (err, registroId) => {
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

  mostrarEstadisticas (req, res)  {
    const { user_id} = req.params;
  
    Ejercicio.mostrarEstadisticas(user_id, (err, data) => {
      if (err) {
        console.error('Error al obtener estadísticas:', err);
        res.status(500).json({ error: 'Error al obtener estadísticas' });
      } else {
        console.log('Datos obtenidos:', data);
        res.json(data);
      }
    });
  },

  mostrarEstadisticasT (req, res) {
    const { user_id } = req.params;
  
    Ejercicio.mostrarEstadisticasTiempo(user_id, (err, data) => {
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

  mostrarEstadisticasTipo (req, res) {
    const { user_id, tipo } = req.params;
  
    Ejercicio.mostrarEstadisticasTipo(user_id, tipo, (err, data) => {
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
  }

}