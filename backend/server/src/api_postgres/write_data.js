
const pool = require('./create_pool');

const write_data = async (obj) => {

    // Consulta para insertar datos en la tabla 'user_activity'
    const insertQuery = `
        INSERT INTO ${obj.table} (user_id, user_name, activity_type, activity_description, additional_info)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

    const arr_data = Object.keys(obj.content).map(key => obj.content[key])
    pool.query(insertQuery, arr_data);
}

module.exports = {
    write_data
}