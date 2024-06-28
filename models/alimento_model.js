const db = require('../config/config');

const Alimentacion = {};

Alimentacion.create = (datosAlimentacion, callback) => {
  const { fecha, hora, tipo_alimento, saludable, user_id } = datosAlimentacion;
  
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

Alimentacion.mostrarEstadisticas = (user_id, callback) => {
  const sql = `
    SELECT 
      SUM(CASE WHEN saludable = 'si' THEN 1 ELSE 0 END) + SUM(CASE WHEN saludable = 'no' THEN 1 ELSE 0 END) AS total_alimentos,
      ROUND(SUM(CASE WHEN saludable = 'si' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN saludable = 'si' THEN 1 ELSE 0 END) + SUM(CASE WHEN saludable = 'no' THEN 1 ELSE 0 END))) AS si_saludables,
      ROUND(SUM(CASE WHEN saludable = 'no' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN saludable = 'si' THEN 1 ELSE 0 END) + SUM(CASE WHEN saludable = 'no' THEN 1 ELSE 0 END))) AS no_saludables
    FROM 
      alimentacion
    WHERE 
      user_id = ?;
  `;

  db.query(sql, [user_id], (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

Alimentacion.mostrarEstadisticasTipo = (user_id, tipo_alimento, callback) => {
  const sql = `
    SELECT 
      SUM(CASE WHEN saludable = 'si' THEN 1 ELSE 0 END) + SUM(CASE WHEN saludable = 'no' THEN 1 ELSE 0 END) AS total_alimentos,
      ROUND(SUM(CASE WHEN saludable = 'si' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN saludable = 'si' THEN 1 ELSE 0 END) + SUM(CASE WHEN saludable = 'no' THEN 1 ELSE 0 END))) AS si_saludables,
      ROUND(SUM(CASE WHEN saludable = 'no' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN saludable = 'si' THEN 1 ELSE 0 END) + SUM(CASE WHEN saludable = 'no' THEN 1 ELSE 0 END))) AS no_saludables
    FROM 
      alimentacion
    WHERE 
      user_id = ? AND
      tipo_alimento = ?;
  `;

  db.query(sql, [user_id, tipo_alimento], (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};


module.exports = Alimentacion;
