const db = require('../config/config');

const RegistroSol = {};

RegistroSol.create = (fecha, tiempo, user_id, callback) => {
  db.query('INSERT INTO sol (fecha, tiempo, user_id) VALUES (?, ?, ?)',
    [fecha, tiempo, user_id],
    (err, result) => {
      if (err) {
        console.error('Error al insertar registro de luz solar', err);
        return callback(err, null);
      }
      return callback(null, result.insertId);
    });
};

module.exports = RegistroSol;
