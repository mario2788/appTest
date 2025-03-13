

const pool = require("../create_pool");

const get_direcciones = async () => {

    // Consulta SQL para obtener los datos
    const query = `
      SELECT * FROM direcciones;
    `;

    // Ejecutar la consulta
    try {
        const result = await pool.query(query);
        return result.rows
    } catch (error) {
        console.log("get_direcciones :: error", error);
        return false
    }
}


module.exports = {
    get_direcciones
}