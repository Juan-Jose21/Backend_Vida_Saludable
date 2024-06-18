const db = require('../config/config');

const RegistroEjercicio = {};

RegistroEjercicio.create = (fecha, tipo, tiempo, user_id, callback) => {
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

module.exports = RegistroEjercicio;
