
const pool = require("../create_pool");

const update_precios = async (data) => {

    const preciosUpdate = []

    for (const row of data) {

        const { tipo_huevo, precio_venta, valor_compra, porcentaje } = row;

        try {
            // Consulta SQL para actualizar la fila
            const query = `
                UPDATE precio_huevos
                SET precio_venta = $1, valor_compra = $2, porcentaje = $3
                WHERE tipo_huevo = $4;
                `;

            const values = [precio_venta, valor_compra, porcentaje, tipo_huevo];
            await pool.query(query, values);

            console.log(`Precio actualizado para ${tipo_huevo}`);
            preciosUpdate.push(tipo_huevo)

        } catch (error) {
            console.error('Error al actualizar el precio:', error);
        }
    }

    return ({
        success: true,
        message: `Precio actualizado para ${preciosUpdate.join(', ')}`
    });
}


module.exports = {
    update_precios
}