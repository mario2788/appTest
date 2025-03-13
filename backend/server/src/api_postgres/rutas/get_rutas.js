

const pool = require("../create_pool");

const get_rutas = async () => {

    // Consulta SQL para obtener los datos
    const query = `
      SELECT barrio, dias
      FROM rutas
      ORDER BY barrio;
    `;

    // Ejecutar la consulta
    try {
        const result = await pool.query(query);
        return result.rows
    } catch (error) {
        console.log("get_rutas :: error", error);
        return false
    }
}


module.exports = {
    get_rutas
}