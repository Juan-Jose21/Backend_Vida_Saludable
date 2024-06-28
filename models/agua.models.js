const db = require('../config/config');

const Agua = {};

Agua.create = (fecha, hora, cantidad, user_id, callback) => {
  db.query('INSERT INTO agua (fecha, hora, cantidad, user_id) VALUES (?, ?, ?, ?)',
    [fecha, hora, cantidad, user_id],
    (err, result) => {
      if (err) {
        console.error('Error al insertar registro de agua:', err);
        return callback(err, null);
      }
      return callback(null, result.insertId);
    });
};

Agua.mostrarEstadisticasAgua = (user_id, callback) => {
  const sql = `
    SELECT
      DATE(fecha) AS fecha,
      CASE DAYOFWEEK(fecha)
        WHEN 1 THEN 'Dom'
        WHEN 2 THEN 'Lun'
        WHEN 3 THEN 'Mar'
        WHEN 4 THEN 'Mié'
        WHEN 5 THEN 'Jue'
        WHEN 6 THEN 'Vie'
        WHEN 7 THEN 'Sáb'
      END AS dia_semana,
      SUM(cantidad) * 250 AS total_agua_ml
    FROM 
      agua
    WHERE 
      user_id = ?
    GROUP BY 
      fecha;
  `;

  db.query(sql, [user_id], (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

module.exports = Agua;
