const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findById = (id, result) => {
    const sql = `
        SELECT
            id,
            name,
            last_name,
            phone,
            password
        FROM
            users
        WHERE
            id = $1
    `;

    db.query(
        sql,
        [id],
        (err, res) => {
            if (err) {
                console.log('Error', err);
                result(err, null);
            } else {
                console.log('Usuario Obtenido: ', res.rows[0]);
                result(null, res.rows[0]);
            }
        }
    );
};

User.findByEmail = (email, result) => {
    const sql = `
        SELECT
            id,
            email,
            name,
            last_name,
            phone,
            password
        FROM
            users
        WHERE
            email = $1
    `;

    db.query(
        sql,
        [email],
        (err, res) => {
            if (err) {
                console.log('Error', err);
                result(err, null);
            } else {
                console.log('Usuario Obtenido: ', res.rows[0]);
                result(null, res.rows[0]);
            }
        }
    );
};


User.create = async (user, result) => {
    const hash = await bcrypt.hash(user.password, 10);

    const sql = `
        INSERT INTO
            users(
                email,
                name,
                last_name,
                phone,
                password,
                role_id,
                proyecto_id,
                created_at
            )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
    `;

    try {
        const res = await db.query(sql, [
            user.email,
            user.name,
            user.last_name,
            user.phone,
            hash,
            user.role_id,
            user.proyecto_id,
            new Date()
        ]);
        console.log('Id del nuevo usuario: ', res.rows[0].id);
        result(null, res.rows[0].id);
    } catch (err) {
        console.log('Error', err);
        result(err, null);
    }
};

User.findAll = (result) => {
    const sql = `
        SELECT
            id,
            email,
            name,
            last_name,
            phone
        FROM
            users
    `;

    db.query(
        sql,
        (err, res) => {
            if (err) {
                console.log('Error', err);
                result(err, null);
            } else {
                console.log('Usuarios obtenidos: ', res.rows);
                result(null, res.rows);
            }
        }
    );
};

User.findAllRoles = (result) => {
    const sql = `
        SELECT
            id,
            name
        FROM
            roles
    `;

    db.query(
        sql,
        (err, res) => {
            if (err) {
                console.log('Error', err);
                result(err, null);
            } else {
                console.log('Roles obtenidos: ', res.rows);
                result(null, res.rows);
            }
        }
    );
};
module.exports = User;