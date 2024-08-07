const db = require('../config/config');

const Agua = {};

Agua.create = (fecha, hora, cantidad, user_id, callback) => {
  const sql = `
    INSERT INTO agua (fecha, hora, cantidad, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;

  db.query(sql, [fecha, hora, cantidad, user_id], (err, res) => {
    if (err) {
      console.error('Error al insertar registro de agua:', err);
      return callback(err, null);
    }
    return callback(null, res.rows[0].id);
  });
};

Agua.mostrarEstadisticasAgua = (user_id, callback) => {
  const sql = `
    SELECT
  DATE(fecha) AS fecha,
  CASE EXTRACT(DOW FROM fecha)
    WHEN 0 THEN 'Dom'
    WHEN 1 THEN 'Lun'
    WHEN 2 THEN 'Mar'
    WHEN 3 THEN 'Mié'
    WHEN 4 THEN 'Jue'
    WHEN 5 THEN 'Vie'
    WHEN 6 THEN 'Sáb'
  END AS dia_semana,
  SUM(cantidad) * 250 AS total_agua_ml
FROM 
  agua
WHERE 
  user_id = $1
GROUP BY 
  fecha;
  `;

  db.query(sql, [user_id], (err, res) => {
    if (err) {
      console.error('Error al mostrar estadísticas de agua:', err);
      return callback(err, null);
    }
    return callback(null, res.rows);
  });
};

module.exports = Agua;
