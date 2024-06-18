const db = require('../config/config');

const RegistroDormir = {};

RegistroDormir.create = (fecha, hora, user_id, callback) => {
  db.query('INSERT INTO sleep (fecha, hora, user_id) VALUES (?, ?, ?)',
    [fecha, hora, user_id],
    (err, result) => {
      if (err) {
        console.error('Error al insertar registro de dormir', err);
        return callback(err, null);
      }
      return callback(null, result.insertId);
    });
};

module.exports = RegistroDormir;