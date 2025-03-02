



const pool = require('./create_pool');

const create_table = async (def_table, label) => {

    const createTableQuery = def_table

    const result = await pool.query(createTableQuery);

    console.log("create_table :: ",
        result?.command === 'CREATE'
            ? `Tabla ${label} creada con éxito`
            : `Fallo la creación de la tabla ${label}`
    );

}


module.exports = {
    create_table
}