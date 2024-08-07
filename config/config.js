const { Pool } = require('pg');

// Configura los parámetros de conexión
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'app_vida_saludable',
    password: 'Juanjose8923510',
    port: 5433, // puerto por defecto de PostgreSQL
});

// Conectar y manejar errores
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('BASE DE DATOS CONECTADO');
    release();
});

module.exports = pool;
