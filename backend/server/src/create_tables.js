

const { create_table } = require("./api_postgres/create_table")
const { add_unique_tipohuevo } = require("./api_postgres/add_unique_tipohuevo")
const { init_data_base } = require("./api_postgres/init_data_base")
const { precios_huevos, init_precios } = require("./api_postgres/tablas")


const create_tables = async() => {
    await create_table(precios_huevos, 'precios_huevos')
    // await add_unique_tipohuevo()
    // await init_data_base(init_precios, 'precios_huevos')
}

module.exports = {
    create_tables
}
