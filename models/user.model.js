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
            id = ?
    `;

    db.query(
        sql,
        [id],
        (err, user) => {
            if (err){
                console.log('Error', err);
                result(err, null);
            }
            else{
                console.log('Usuario Obtenido: ', user[0]);
                result(null,user[0]);
            }
        }
    )
}

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
            email = ?
    `;

    db.query(
        sql,
        [email],
        (err, user) => {
            if (err){
                console.log('Error', err);
                result(err, null);
            }
            else{
                console.log('Usuario Obtenido: ', user[0]);
                result(null,user[0])
            }
        }
    )
}

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
                created_at
            )
        VALUES(?, ?, ?, ?, ?, ?)
    `;

    db.query (
        sql,
        [
            user.email,
            user.name,
            user.last_name,
            user.phone,
            hash,
            new Date()
        ],
        (err, res) => {
            if (err){
                console.log('Error', err);
                result(err, null);
            }
            else{
                console.log('Id del nuevo usuario: ', res.insertId);
                result(null,res.insertId)
            }
        }
    )
}

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
        (err, users) => {
            if (err){
                console.log('Error', err);
                result(err, null);
            }
            else{
                console.log('Usuarios obtenidos: ', users);
                result(null, users);
            }
        }
    );
}
module.exports = User;