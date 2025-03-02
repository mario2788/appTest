

const precios_huevos = `CREATE TABLE IF NOT EXISTS precio_huevos (
    id SERIAL PRIMARY KEY,
    tipo_huevo VARCHAR(50) NOT NULL,
    precio_venta NUMERIC(10) NOT NULL,
    valor_compra NUMERIC(10) NOT NULL,
    porcentaje NUMERIC(10) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);` ;

const init_precios = `
    INSERT INTO precio_huevos (tipo_huevo, precio_venta, valor_compra, porcentaje)
    VALUES
    ('AAA Rojo', 22500, 18000, 20),
    ('AAA Blanco', 22500, 18000, 20),
    ('AA Rojo', 21000, 16800, 20),
    ('AA Blanco', 19500, 15600, 20),
    ('A Rojo', 18375, 14700, 20),
    ('A Blanco', 18375, 14700, 20),
    ('B Rojo', 18375, 14700, 20),
    ('B Blanco', 18375, 14700, 20),
    ('C Rojo', 18375, 14700, 20),
    ('C Blanco', 18375, 14700, 20)
    ON CONFLICT (tipo_huevo) DO NOTHING; 
    `;


module.exports = {
    precios_huevos,
    init_precios
}

