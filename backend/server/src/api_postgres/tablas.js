

const precios_huevos = `CREATE TABLE IF NOT EXISTS precio_huevos (
    id SERIAL PRIMARY KEY,
    tipo_huevo VARCHAR(50) NOT NULL,
    precio_venta NUMERIC(10) NOT NULL,
    valor_compra NUMERIC(10) NOT NULL,
    porcentaje NUMERIC(10) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);` ;


module.exports = {
    precios_huevos
}

