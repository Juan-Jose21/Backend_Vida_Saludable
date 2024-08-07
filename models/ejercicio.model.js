const db = require('../config/config');

const Ejercicio = {};

Ejercicio.create = (fecha, tipo, tiempo, user_id, callback) => {
  const sql = `
    INSERT INTO ejercicio (fecha, tipo, tiempo, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;

  db.query(sql, [fecha, tipo, tiempo, user_id], (err, res) => {
    if (err) {
      console.error('Error al insertar registro de ejercicio:', err);
      return callback('Error al insertar registro de ejercicio', null);
    }
    // Obtén el ID del registro insertado
    return callback(null, res.rows[0].id);
  });
};
Ejercicio.mostrarEstadisticas = (user_id, callback) => {
  const sql = `
    SELECT 
      SUM(CASE WHEN tipo = 'caminata lenta' THEN 1 ELSE 0 END) + 
      SUM(CASE WHEN tipo = 'caminata rapida' THEN 1 ELSE 0 END) + 
      SUM(CASE WHEN tipo = 'trote' THEN 1 ELSE 0 END) + 
      SUM(CASE WHEN tipo = 'ejercicio guiado' THEN 1 ELSE 0 END) AS total_ejercicios,
      ROUND(SUM(CASE WHEN tipo = 'caminata lenta' THEN 1 ELSE 0 END) * 100.0 / 
        (SUM(CASE WHEN tipo = 'caminata lenta' THEN 1 ELSE 0 END) + 
         SUM(CASE WHEN tipo = 'caminata rapida' THEN 1 ELSE 0 END) + 
         SUM(CASE WHEN tipo = 'trote' THEN 1 ELSE 0 END) + 
         SUM(CASE WHEN tipo = 'ejercicio guiado' THEN 1 ELSE 0 END))) AS caminata_lenta,
      ROUND(SUM(CASE WHEN tipo = 'caminata rapida' THEN 1 ELSE 0 END) * 100.0 / 
        (SUM(CASE WHEN tipo = 'caminata lenta' THEN 1 ELSE 0 END) + 
         SUM(CASE WHEN tipo = 'caminata rapida' THEN 1 ELSE 0 END) + 
         SUM(CASE WHEN tipo = 'trote' THEN 1 ELSE 0 END) + 
         SUM(CASE WHEN tipo = 'ejercicio guiado' THEN 1 ELSE 0 END))) AS caminata_rapida,
      ROUND(SUM(CASE WHEN tipo = 'trote' THEN 1 ELSE 0 END) * 100.0 / 
        (SUM(CASE WHEN tipo = 'caminata lenta' THEN 1 ELSE 0 END) + 
         SUM(CASE WHEN tipo = 'caminata rapida' THEN 1 ELSE 0 END) + 
         SUM(CASE WHEN tipo = 'trote' THEN 1 ELSE 0 END) + 
         SUM(CASE WHEN tipo = 'ejercicio guiado' THEN 1 ELSE 0 END))) AS trote,
      ROUND(SUM(CASE WHEN tipo = 'ejercicio guiado' THEN 1 ELSE 0 END) * 100.0 / 
        (SUM(CASE WHEN tipo = 'caminata lenta' THEN 1 ELSE 0 END) + 
         SUM(CASE WHEN tipo = 'caminata rapida' THEN 1 ELSE 0 END) + 
         SUM(CASE WHEN tipo = 'trote' THEN 1 ELSE 0 END) + 
         SUM(CASE WHEN tipo = 'ejercicio guiado' THEN 1 ELSE 0 END))) AS ejercicio_guiado
    FROM 
      ejercicio
    WHERE 
      user_id = $1;
  `;

  db.query(sql, [user_id], (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      // Procesar la respuesta para convertir los valores a números
      const result = data.rows.map(row => ({
        total_ejercicios: parseInt(row.total_ejercicios, 10),
        caminata_lenta: parseFloat(row.caminata_lenta),
        caminata_rapida: parseFloat(row.caminata_rapida),
        trote: parseFloat(row.trote),
        ejercicio_guiado: parseFloat(row.ejercicio_guiado)
      }));
      callback(null, result);
    }
  });
};


Ejercicio.mostrarEstadisticasTiempo = (user_id, callback) => {
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
  ejercicio
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

Ejercicio.mostrarEstadisticasTipo = (user_id, tipo, callback) => {
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
  ejercicio
WHERE
  user_id = $1 AND
  tipo = $2;
  `;

  db.query(sql, [user_id, tipo], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.rows);
    }
  });
};


module.exports = Ejercicio;
