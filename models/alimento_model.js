const db = require('../config/config');

const Alimentacion = {};

Alimentacion.create = (datosAlimentacion, callback) => {
  const { fecha, hora, tipo_alimento, saludable, user_id } = datosAlimentacion;
  
  if (!fecha || !hora || !tipo_alimento || !saludable || !user_id) {
    return callback('Todos los campos son requeridos', null);
  }

  const sql = `
    INSERT INTO alimentacion (fecha, hora, tipo_alimento, saludable, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

  db.query(sql, [fecha, hora, tipo_alimento, saludable, user_id], (err, res) => {
    if (err) {
      console.error('Error al insertar registro de alimentación:', err);
      return callback('Error al insertar registro de alimentación', null);
    }
    return callback(null, res.rows[0].id);
  });
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
      user_id = $1;
  `;

  db.query(sql, [user_id], (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      const result = data.rows.map(row => ({
        total_alimentos: parseInt(row.total_alimentos, 10),
        si_saludables: parseFloat(row.si_saludables),
        no_saludables: parseFloat(row.no_saludables)
      }));
      callback(null, result);
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
      user_id = $1 AND
      tipo_alimento = $2;
  `;

  db.query(sql, [user_id, tipo_alimento], (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      const result = data.rows.map(row => ({
        total_alimentos: parseInt(row.total_alimentos, 10),
        si_saludables: parseFloat(row.si_saludables),
        no_saludables: parseFloat(row.no_saludables)
      }));
      callback(null, result);
    }
  });
};



module.exports = Alimentacion;
