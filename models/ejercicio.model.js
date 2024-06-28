const db = require('../config/config');

const Ejercicio = {};

Ejercicio.create = (fecha, tipo, tiempo, user_id, callback) => {
  db.query('INSERT INTO ejercicio (fecha, tipo, tiempo, user_id) VALUES (?, ?, ?, ?)',
    [fecha, tipo, tiempo, user_id],
    (err, result) => {
      if (err) {
        console.error('Error al insertar registro de ejercicio:', err);
        return callback(err, null);
      }
      return callback(null, result.insertId);
    });
};

Ejercicio.mostrarEstadisticas = (user_id, callback) => {
  const sql = `
    SELECT 
      SUM(CASE WHEN tipo = 'caminata lenta' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'caminata lenta' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'trote' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'ejercicio guiado' THEN 1 ELSE 0 END) AS total_ejercicios,
      ROUND(SUM(CASE WHEN tipo = 'caminata lenta' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN tipo = 'caminata lenta' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'caminata rapida' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'trote' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'ejercicio guiado' THEN 1 ELSE 0 END))) AS caminata_lenta,
      ROUND(SUM(CASE WHEN tipo = 'caminata rapida' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN tipo = 'caminata lenta' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'caminata rapida' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'trote' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'ejercicio guiado' THEN 1 ELSE 0 END))) AS caminata_rapida,
      ROUND(SUM(CASE WHEN tipo = 'trote' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN tipo = 'caminata lenta' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'caminata rapida' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'trote' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'ejercicio guiado' THEN 1 ELSE 0 END))) AS trote,
      ROUND(SUM(CASE WHEN tipo = 'ejercicio guiado' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN tipo = 'caminata lenta' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'caminata rapida' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'trote' THEN 1 ELSE 0 END) + SUM(CASE WHEN tipo = 'ejercicio guiado' THEN 1 ELSE 0 END))) AS ejercicio_guiado
    FROM 
      ejercicio
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

Ejercicio.mostrarEstadisticasTiempo = (user_id, callback) => {
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
      ejercicio
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

Ejercicio.mostrarEstadisticasTipo = (user_id, tipo, callback) => {
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
      ejercicio
    WHERE 
      user_id = ? AND
      tipo = ?;
  `;

  db.query(sql, [user_id, tipo], (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};


module.exports = Ejercicio;
