const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'mysql-vida-saludable.alwaysdata.net',
    user: '366827_api',
    password: 'Vida_saludable#uab',
    database: 'vida-saludable_db'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('BASE DE DATOS CONECTADO');
});

module.exports = db;