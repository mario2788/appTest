
const pool = require("./create_pool");
const { init_precios } = require("./tablas");


const init_data_base = async(init_SQL,label) => {

    try {

        await pool.query(init_SQL);

        console.log('Datos iniciales cargados exitosamente en la tabla:', label);
    } catch (error) {
        console.error('Error al inicializar la tabla:', error);
    } 
}

module.exports = {
    init_data_base
}