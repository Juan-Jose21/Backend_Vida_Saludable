const db = require('../config/config');

const Esperanza = {};

Esperanza.create = (fecha, tipo_practica, user_id, callback) => {
  db.query('INSERT INTO esperanza (fecha, tipo_practica, user_id) VALUES (?, ?, ?)',
    [fecha, tipo_practica, user_id],
    (err, result) => {
      if (err) {
        console.error('Error al insertar registro de esperanza:', err);
        return callback(err, null);
      }
      return callback(null, result.insertId);
    });
};

Esperanza.mostrarEstadisticasE = (user_id, callback) => {
  const sql = `
    SELECT 
      SUM(CASE WHEN tipo_practica = 'oracion' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo_practica = 'lectura biblica' THEN 1 ELSE 0 END) AS total_tipo,
      ROUND(SUM(CASE WHEN tipo_practica = 'oracion' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN tipo_practica = 'oracion' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo_practica = 'lectura biblica' THEN 1 ELSE 0 END))) AS tipo_oracion,
      ROUND(SUM(CASE WHEN tipo_practica = 'lectura biblica' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN tipo_practica = 'oracion' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo_practica = 'lectura biblica' THEN 1 ELSE 0 END))) AS tipo_lectura
    FROM 
      esperanza
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

module.exports = Esperanza;
