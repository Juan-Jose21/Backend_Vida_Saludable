const db = require('../config/config');

const Esperanza = {};

Esperanza.create = (fecha, tipo_practica, user_id, callback) => {
  const sql = `
    INSERT INTO esperanza (fecha, tipo_practica, user_id)
    VALUES ($1, $2, $3)
    RETURNING id
  `;

  db.query(sql, [fecha, tipo_practica, user_id], (err, res) => {
    if (err) {
      console.error('Error al insertar registro de esperanza:', err);
      return callback('Error al insertar registro de esperanza', null);
    }
    // Obtén el ID del registro insertado
    return callback(null, res.rows[0].id);
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
      user_id = $1;
  `;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.rows.map(row => ({
        total_tipo: parseInt(row.total_tipo, 10),
        tipo_oracion: parseFloat(row.tipo_oracion),
        tipo_lectura: parseFloat(row.tipo_lectura)
      })));
    }
  });
};

module.exports = Esperanza;
