

const pool = require("./create_pool")
const {
    precios_huevos,
    init_precios,
    rutas,
    init_rutas,
    direcciones,
    init_direcciones,
    unique_precio,
    unique_ruta,
    unique_direcciones,
} = require("./tablas")


const create_tables = async ({ initTables }) => {

    await create_table(precios_huevos, 'precios_huevos')
    await create_table(rutas, 'rutas')
    await create_table(direcciones, 'direcciones')
    // await add_unique(unique_direcciones)
    // await init_data_base(init_direcciones, 'direcciones')

    if (initTables) {
        await add_unique(unique_precio)
        await add_unique(unique_ruta)
        await add_unique(unique_direcciones)

        await init_data_base(init_precios, 'precios_huevos')
        await init_data_base(init_rutas, 'rutas')
        await init_data_base(init_direcciones, 'direcciones')
    }
}

const create_table = async (def_table, label) => {

    const createTableQuery = def_table

    const result = await pool.query(createTableQuery);

    console.log("create_table :: ",
        result?.command === 'CREATE'
            ? `Tabla ${label} creada con éxito`
            : `Fallo la creación de la tabla ${label}`
    );

}

const init_data_base = async (init_SQL, label) => {

    try {

        await pool.query(init_SQL);

        console.log('Datos iniciales cargados exitosamente en la tabla:', label);
    } catch (error) {
        console.error('Error al inicializar la tabla:', error);
    }
}

const add_unique = async (SQL, label) => {

    try {
        await pool.query(SQL);

        console.log(`create_table :: Add unique : ${label}`);
    } catch (error) {
        console.error('Error :: Add unique:', error);
    }
}



module.exports = {
    create_tables
}
