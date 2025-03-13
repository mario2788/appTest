const pool = require("../create_pool");


const add_ruta = async ({ barrio, dias }) => {

    const query = `
          INSERT INTO rutas (barrio, dias)
          VALUES ($1, $2);
        `;

    try {
        const { command, rowCount } = await pool.query(query, [barrio, dias]);
        console.log(`Datos insertados para el barrio: ${barrio}`);

        return ({ command, rowCount })

    } catch (error) {
        console.log("add_ruta :: error,", error);
        return error
    }
}

module.exports = {
    add_ruta
}