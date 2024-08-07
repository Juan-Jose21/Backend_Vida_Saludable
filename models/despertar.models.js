const db = require('../config/config');

const Despertar = {};

Despertar.create = (fecha, hora, estado, user_id, callback) => {
  const sql = `
    INSERT INTO despertar (fecha, hora, estado, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;

  db.query(sql, [fecha, hora, estado, user_id], (err, res) => {
    if (err) {
      console.error('Error al insertar registro de despertar:', err);
      return callback('Error al insertar registro de despertar', null);
    }
    return callback(null, res.rows[0].id);
  });
};

Despertar.mostrarEstadisticas = (user_id, callback) => {
  const sql = `
    SELECT 
      SUM(CASE WHEN estado = 'true' THEN 1 ELSE 0 END) + SUM(CASE WHEN estado = 'false' THEN 1 ELSE 0 END) AS total_estado,
      ROUND(SUM(CASE WHEN estado = 'true' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN estado = 'true' THEN 1 ELSE 0 END) + SUM(CASE WHEN estado = 'false' THEN 1 ELSE 0 END))) AS descanso_bien,
      ROUND(SUM(CASE WHEN estado = 'false' THEN 1 ELSE 0 END) * 100.0 / (SUM(CASE WHEN estado = 'true' THEN 1 ELSE 0 END) + SUM(CASE WHEN estado = 'false' THEN 1 ELSE 0 END))) AS descanso_mal
    FROM 
      despertar
    WHERE 
      user_id = $1;
  `;

  db.query(sql, [user_id], (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      const result = data.rows.map(row => ({
        total_estado: parseInt(row.total_estado, 10),
        descanso_bien: parseFloat(row.descanso_bien),
        descanso_mal: parseFloat(row.descanso_mal)
      }));
      callback(null, result);
    }
  });
};


module.exports = Despertar;