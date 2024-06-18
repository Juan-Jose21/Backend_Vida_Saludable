const db = require('../config/config');

const TypeFeeding = {};

TypeFeeding.create = async (type, result) => {

    const sql = `
    INSERT INTO
        tipo_de_alimento(
            name
        )
    VALUES(?)
    `;

    db.query (
        sql,
        [
            type.name
        ],
        (err, res) => {
            if (err){
                console.log('Error', err);
                result(err, null);
            }
            else{
                console.log('Id del nuevo Registro: ', res.insertId);
                result(null,res.insertId);
            }
        }
    )

}

module.exports = TypeFeeding;
