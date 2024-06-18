const RegistroAlimentacion = require('../models/alimento_model');

exports.registrarAlimento = (req, res) => {
  try {
    // Extraer campos del cuerpo de la solicitud
    const { fecha, hora, tipo_alimento, saludable, user_id } = req.body;

    // Validar los datos recibidos
    if (!fecha || !hora || !tipo_alimento || !saludable || !user_id) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Crear el registro de alimentación en la base de datos
    RegistroAlimentacion.create({ fecha, hora, tipo_alimento, saludable, user_id }, (err, registro) => {
      if (err) {
        console.error('Error al registrar el alimento:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      // Si se crea el registro con éxito, responder con un código de estado 201 (Created)
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
};

