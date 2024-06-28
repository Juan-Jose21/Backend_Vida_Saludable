const db = require('../config/config');

const Despertar = {};

Despertar.create = (fecha, hora, estado, user_id, callback) => {
  db.query('INSERT INTO despertar (fecha, hora, estado, user_id) VALUES (?, ?, ?, ?)',
    [fecha, hora, estado, user_id],
    (err, result) => {
      if (err) {
        console.error('Error al insertar registro de despertar', err);
        return callback(err, null);
      }
      return callback(null, result.insertId);
    });
};

Despertar.mostrarEstadisticas = (user_id, callback) => {
  const sql = `
    SELECT 
      SUM(CASE WHEN estado = 'true' THEN 1 ELSE 0 END) + SUM(CASE WHEN estado = 'true' THEN 1 ELSE 0 END) AS total_estado,
      ROUND(SUM(CASE WHEN estado = 'true' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN estado = 'true' THEN 1 ELSE 0 END) + SUM(CASE WHEN estado = 'false' THEN 1 ELSE 0 END))) AS descanso_bien,
      ROUND(SUM(CASE WHEN estado = 'false' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN estado = 'true' THEN 1 ELSE 0 END) + SUM(CASE WHEN estado = 'false' THEN 1 ELSE 0 END))) AS descanso_mal
    FROM 
      despertar
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

module.exports = Despertar;