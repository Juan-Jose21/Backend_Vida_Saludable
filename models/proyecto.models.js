const db = require('../config/config');

const Proyecto = {};
Proyecto.create = (nombre, fecha_inicio, fecha_fin, callback) => {
    const sql = `
      INSERT INTO proyecto (nombre, fecha_inicio, fecha_fin)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
  
    db.query(sql, [nombre, fecha_inicio, fecha_fin], (err, res) => {
      if (err) {
        console.error('Error al insertar registro de Proyecto:', err);
        return callback(err, null);
      }
      return callback(null, res.rows[0].id);
    });
  };

Proyecto.findAll = (result) => {
    const sql = `
        SELECT
            id,
            nombre,
            fecha_inicio,
            fecha_fin,
            estado
        FROM
            proyecto
    `;

    db.query(
        sql,
        (err, res) => {
            if (err) {
                console.log('Error', err);
                result(err, null);
            } else {
                console.log('Proyectos obtenidos: ', res.rows);
                result(null, res.rows);
            }
        }
    );
};
module.exports = Proyecto;