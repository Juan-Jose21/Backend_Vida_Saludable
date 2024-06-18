const db = require('../config/config');

const RegistroAire = {};

RegistroAire.create = (fecha, tiempo, user_id, callback) => {
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

module.exports = RegistroAire;