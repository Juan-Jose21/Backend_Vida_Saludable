const { Pool } = require('pg');

// Configura los parámetros de conexión
const pool = new Pool({
    user: 'vida_saludable',
    host: 'dpg-cqpotarqf0us73an991g-a.oregon-postgres.render.com',
    database: 'db_vida_saludable',
    password: 'GC1lIz9tWF0Vudz99z05DNMPh0IdNrFL',
    port: 5432, // puerto por defecto de PostgreSQL
    ssl: {
        rejectUnauthorized: false
    }
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
