

const pool = require("./create_pool");

const add_unique_tipohuevo = async() => {

    const SQL = 'ALTER TABLE precio_huevos ADD CONSTRAINT unique_tipo_huevo UNIQUE (tipo_huevo)'
    
    try {
        await pool.query(SQL);

        console.log('add unique');
    } catch (error) {
        console.error('Error al inicializar la tabla:', error);
    } 
}


module.exports = {
    add_unique_tipohuevo
}