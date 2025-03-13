
const pool = require("../create_pool");

const get_precios = async () => {

    // Consulta SQL para obtener los datos
    const query = `
      SELECT tipo_huevo, precio_venta, valor_compra, porcentaje
      FROM precio_huevos
      ORDER BY tipo_huevo;
    `;

    // Ejecutar la consulta
    try {
        const result = await pool.query(query);
        return result.rows
    } catch (error) {
        console.log("get_precios :: error", error);
        return false
    }

}


module.exports = {
    get_precios
}