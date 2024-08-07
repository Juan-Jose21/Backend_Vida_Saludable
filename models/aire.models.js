const db = require('../config/config');

const Aire = {};

Aire.create = (fecha, tiempo, user_id, callback) => {
  const sql = `
    INSERT INTO aire (fecha, tiempo, user_id)
    VALUES ($1, $2, $3)
    RETURNING id
  `;

  db.query(sql, [fecha, tiempo, user_id], (err, res) => {
    if (err) {
      console.error('Error al insertar registro de aire puro:', err);
      return callback(err, null);
    }
    // Obtén el ID del registro insertado
    return callback(null, res.rows[0].id);
  });
};

Aire.mostrarEstadisticasTiempoAire = (user_id, callback) => {
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
  CAST(SPLIT_PART(tiempo, ':', 2) AS INTEGER) AS minutos
FROM
  aire
WHERE
  user_id = $1;
  `;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.rows);
    }
  });
};



module.exports = Aire;