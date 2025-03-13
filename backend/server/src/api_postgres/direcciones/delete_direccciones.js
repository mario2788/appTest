
const pool = require("../create_pool");

const delete_direccciones = async (id) => {

    const query = "DELETE FROM direcciones WHERE id = $1 RETURNING id;";

    try {
        const { rows } = await pool.query(query, [id]);
        if (rows.length > 0) {
            return { success: true, message: `Dirección con ID ${id} eliminada.` };
        } else {
            return { success: false, message: `No se encontró ninguna dirección con ID ${id}.` };
        }
    } catch (error) {
        console.error("Error al eliminar dirección:", error.message);
        throw new Error("No se pudo eliminar la dirección.");
    }
};

module.exports = { delete_direccciones };