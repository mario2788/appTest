

const { create_table } = require("./api_postgres/create_table")
const { precios_huevos } = require("./api_postgres/tablas")


const create_tables = () => {
    create_table(precios_huevos, 'precios_huevos')
}

module.exports = {
    create_tables
}
