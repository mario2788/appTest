

const pool = require("../create_pool");


const delete_ruta = async ({ barrio }) => {

    const query = `
      DELETE FROM rutas
      WHERE barrio = $1;
    `;

    try {
        const { command, rowCount } = await pool.query(query, [barrio]);
        if (rowCount > 0) {
            console.log(`Fila eliminada para el barrio: ${barrio}`);
            return ({ command, rowCount })
        } else {
            console.log(`No se encontró ninguna fila para el barrio: ${barrio}`);
        }
    } catch (error) {
        console.error('Error al eliminar la fila:', error.message);
    }
}

module.exports = {
    delete_ruta
}