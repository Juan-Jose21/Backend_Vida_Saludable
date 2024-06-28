const db = require('../config/config');

const Aire = {};

Aire.create = (fecha, tiempo, user_id, callback) => {
  db.query('INSERT INTO aire (fecha, tiempo, user_id) VALUES (?, ?, ?)',
    [fecha, tiempo, user_id],
    (err, result) => {
      if (err) {
        console.error('Error al insertar registro de aire puro', err);
        return callback(err, null);
      }
      return callback(null, result.insertId);
    });
};

Aire.mostrarEstadisticasTiempoAire = (user_id, callback) => {
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
      HOUR(tiempo) * 60 + MINUTE(tiempo) AS minutos
    FROM  
      aire
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

module.exports = Aire;