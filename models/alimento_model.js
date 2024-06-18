const db = require('../config/config');

const RegistroAlimentacion = {};

RegistroAlimentacion.create = (datosAlimentacion, callback) => {
  const { fecha, hora, tipo_alimento, saludable, user_id } = datosAlimentacion;
  
  // Verificar que todos los datos necesarios estén presentes
  if (!fecha || !hora || !tipo_alimento || !saludable || !user_id) {
    return callback('Todos los campos son requeridos', null);
  }

  db.query(
    'INSERT INTO alimentacion (fecha, hora, tipo_alimento, saludable, user_id) VALUES (?, ?, ?, ?, ?)',
    [fecha, hora, tipo_alimento, saludable, user_id],
    (err, result) => {
      if (err) {
        console.error('Error al insertar registro de alimentación:', err);
        return callback('Error al insertar registro de alimentación', null);
      }
      return callback(null, result.insertId);
    }
  );
};

module.exports = RegistroAlimentacion;
