const db = require('../config/config');

const RegistroEsperanza = {};

RegistroEsperanza.create = (fecha, tipo_practica, user_id, callback) => {
  db.query('INSERT INTO esperanza (fecha, tipo_practica, user_id) VALUES (?, ?, ?)',
    [fecha, tipo_practica, user_id],
    (err, result) => {
      if (err) {
        console.error('Error al insertar registro de esperanza:', err);
        return callback(err, null);
      }
      return callback(null, result.insertId);
    });
};

module.exports = RegistroEsperanza;
