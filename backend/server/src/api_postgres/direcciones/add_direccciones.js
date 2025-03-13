const pool = require("../create_pool");

const add_direcciones = async ({
    barrio,
    tipo_via,
    numero_via_principal,
    numero_interseccion,
    coordenada_adicional,
    letra_diferenciacion,
    orientacion_sector,
    ultima_interaccion
}) => {

    const query = `
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
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id;
  `;

    try {

        const { rows } = await pool.query(query, [
            barrio,
            tipo_via,
            numero_via_principal,
            numero_interseccion,
            coordenada_adicional,
            letra_diferenciacion,
            orientacion_sector,
            JSON.stringify(ultima_interaccion) // Convertir el objeto JSON a string
        ]);

        console.log(`Dirección registrada con ID: ${rows[0].id}`);

        return {
            success: true,
            message: "Dirección creada exitosamente",
            id: rows[0].id
        };
    } catch (error) {
        console.error("Error al agregar dirección:", error.message);
        throw new Error("No se pudo agregar la dirección");
    }
};

module.exports = {
    add_direcciones
};