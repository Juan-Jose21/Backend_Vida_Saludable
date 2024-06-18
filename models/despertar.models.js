const db = require('../config/config');

const RegistroDespertar = {};

RegistroDespertar.create = (fecha, hora, estado, user_id, callback) => {
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

module.exports = RegistroDespertar;