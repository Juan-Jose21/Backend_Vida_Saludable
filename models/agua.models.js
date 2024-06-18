const db = require('../config/config');

const RegistroAgua = {};

RegistroAgua.create = (fecha, hora, cantidad, user_id, callback) => {
  db.query('INSERT INTO agua (fecha, hora, cantidad, user_id) VALUES (?, ?, ?, ?)',
    [fecha, hora, cantidad, user_id],
    (err, result) => {
      if (err) {
        console.error('Error al insertar registro de agua:', err);
        return callback(err, null);
      }
      return callback(null, result.insertId);
    });
};

module.exports = RegistroAgua;
