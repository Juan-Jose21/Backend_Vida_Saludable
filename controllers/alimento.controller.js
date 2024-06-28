const Alimentacion = require('../models/alimento_model');

module.exports = {

  registrarAlimento (req, res) {
    try {
  
      const { fecha, hora, tipo_alimento, saludable, user_id } = req.body;
  
      if (!fecha || !hora || !tipo_alimento || !saludable || !user_id) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }
  
      Alimentacion.create({ fecha, hora, tipo_alimento, saludable, user_id }, (err, registro) => {
        if (err) {
          console.error('Error al registrar el alimento:', err);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
  
        return res.status(201).json({
          success: true,
          message: 'El registro se realizó correctamente',
          data: registro
        });
      });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

mostrarEstadisticas (req, res)  {
  const { user_id} = req.params;

  Alimentacion.mostrarEstadisticas(user_id, (err, data) => {
    if (err) {
      console.error('Error al obtener estadísticas:', err);
      res.status(500).json({ error: 'Error al obtener estadísticas' });
    } else {
      console.log('Datos obtenidos:', data);
      res.json(data);
    }
  });
},

mostrarEstadisticasTipo (req, res)  {
  const { user_id, tipo_alimento} = req.params;

  Alimentacion.mostrarEstadisticasTipo(user_id, tipo_alimento, (err, data) => {
    if (err) {
      console.error('Error al obtener estadísticas:', err);
      res.status(500).json({ error: 'Error al obtener estadísticas' });
    } else {
      console.log('Datos obtenidos:', data);
      res.json(data);
    }
  });
}

}
