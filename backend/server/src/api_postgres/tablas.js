

const precios_huevos = `CREATE TABLE IF NOT EXISTS precio_huevos (
    id SERIAL PRIMARY KEY,
    tipo_huevo VARCHAR(50) NOT NULL,
    precio_venta NUMERIC(10) NOT NULL,
    valor_compra NUMERIC(10) NOT NULL,
    porcentaje NUMERIC(10) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);` ;

const rutas = `
    CREATE TABLE IF NOT EXISTS rutas (
        id SERIAL PRIMARY KEY,
        barrio VARCHAR(255) NOT NULL,
        dias TEXT[] NOT NULL
    );
`;

const direcciones = `
    CREATE TABLE IF NOT EXISTS direcciones (
        id SERIAL PRIMARY KEY,
        barrio VARCHAR(255) NOT NULL,
        tipo_via VARCHAR(50) NOT NULL,
        numero_via_principal INT NOT NULL,
        numero_interseccion INT NOT NULL,
        coordenada_adicional INT NOT NULL,
        letra_diferenciacion CHAR(1),
        orientacion_sector VARCHAR(50),
        ultima_interaccion JSONB
);`


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

const init_rutas = `
    INSERT INTO rutas (barrio, dias)
    VALUES
        ('San José', '{"Lunes", "Miércoles", "Viernes"}'),
        ('La Paz', '{"Martes", "Jueves"}')
    ON CONFLICT (barrio) DO NOTHING;
`;

const init_direcciones = `
    INSERT INTO direcciones (
        barrio,
        tipo_via,
        numero_via_principal,
        numero_interseccion,
        coordenada_adicional,
        letra_diferenciacion,
        orientacion_sector,
        ultima_interaccion
    )
    VALUES
        (
            'San José',
            'Calle',
            3,
            45,
            45,
            'A',
            'Sur',
            '{
			   "visitas":[
			        {"fecha_visita":"2025-02-01T15:05:00Z","responsable":"Juan Pérez","observaciones":"Cliente solicitó entrega temprana","estado":"Venta","venta":{"tipo":"AAA Rojo","cantidad":45,"monto":35000}},
			        {"fecha_visita":"2025-02-05T08:05:00Z","responsable":"Juan Pérez","observaciones":"Cliente solicitó entrega temprana","estado":"Entregó tarjeta"},
			        {"fecha_visita":"2025-02-01T12:05:00Z","responsable":"Juan Pérez","observaciones":"Cliente solicitó entrega temprana","estado":"Volver a pasar"}
			   ]
			}'
        ),
        (
            'La Paz',
            'Carrera',
            10,
            20,
            15,
            '',
            'Norte',
            '{
			   "visitas":[
			        {"fecha_visita":"2025-03-01T12:15:00Z","responsable":"María López","observaciones":"Cliente ausente","estado":"Venta","venta":{"tipo":"AA Rojo","cantidad":30,"monto":21600}},
			        {"fecha_visita":"2025-03-02T12:15:00Z","responsable":"María López","observaciones":"Cliente ausente","estado":"Sin interacción"},
			        {"fecha_visita":"2025-03-05T12:15:00Z","responsable":"María López","observaciones":"Cliente ausente","estado":"Volver a pasar"}
			   ]
			}'
        ),
        (
            'San José',
            'Avenida',
            7,
            60,
            1,
            'B',
            'Oeste',
            '{ 
                "visitas":[
                    {"fecha_visita": "2025-03-02T08:35:00Z", "responsable": "Carlos Ramírez", "observaciones": "Entrega exitosa", "estado": "Entregó tarjeta"}
                ]
            }'
        ),
        (
            'El retiro',
            'Carrera',
            5,
            10,
            5,
            '',
            'Sur',
            '{ 
                "visitas":[
                    {"fecha_visita": "2025-03-02T10:35:00Z", "responsable": "Carlos Ramírez", "observaciones": "Entrega exitosa", "estado": "Volver a pasar"},
                    {"fecha_visita": "2025-03-05T11:35:00Z", "responsable": "Carlos Ramírez", "observaciones": "Entrega exitosa", "estado": "Volver a pasar"},
                    {"fecha_visita": "2025-03-06T14:35:00Z", "responsable": "Carlos Ramírez", "observaciones": "Entrega exitosa", "estado": "Sin interacción"},
                    {"fecha_visita": "2025-03-07T18:35:00Z", "responsable": "Carlos Ramírez", "observaciones": "Entrega exitosa", "estado": "Volver a pasar"},
                    {"fecha_visita": "2025-03-12T19:35:00Z", "responsable": "Carlos Ramírez", "observaciones": "Entrega exitosa", "estado": "Sin interacción"}
                ]
            }'
        ),
        (
            'El remanso',
            'Diagonal',
            3,
            2,
            23,
            '',
            '',
            '{ 
                "visitas":[
                    {"fecha_visita": "2025-03-03T13:15:00Z", "responsable": "Carlos Ramírez", "observaciones": "Entrega exitosa", "estado": "Fuera de agenda"}
                ]
            }'
        )
        
    ON CONFLICT (barrio, tipo_via, numero_via_principal, numero_interseccion, coordenada_adicional, letra_diferenciacion, orientacion_sector)
    DO NOTHING;
`;

const unique_precio = 'ALTER TABLE precio_huevos ADD CONSTRAINT unique_tipo_huevo UNIQUE (tipo_huevo)'

const unique_ruta = 'ALTER TABLE rutas ADD CONSTRAINT unique_barrio UNIQUE (barrio)'

const unique_direcciones = `ALTER TABLE direcciones
    ADD CONSTRAINT unique_domicilio UNIQUE (
        barrio,
        tipo_via,
        numero_via_principal,
        numero_interseccion,
        coordenada_adicional,
        letra_diferenciacion,
        orientacion_sector
);`



module.exports = {
    precios_huevos,
    rutas,
    direcciones,
    init_precios,
    init_rutas,
    init_direcciones,
    unique_precio,
    unique_ruta,
    unique_direcciones
}

