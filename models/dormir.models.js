const db = require('../config/config');

const RegistroDormir = {};

RegistroDormir.create = (fecha, hora, user_id, callback) => {
  const sql = `
    INSERT INTO sleep (fecha, hora, user_id)
    VALUES ($1, $2, $3)
    RETURNING id
  `;

  db.query(sql, [fecha, hora, user_id], (err, res) => {
    if (err) {
      console.error('Error al insertar registro de dormir:', err);
      return callback('Error al insertar registro de dormir', null);
    }
    // Obtén el ID del registro insertado
    return callback(null, res.rows[0].id);
  });
};

module.exports = RegistroDormir;