export const validarDinero = (input) => {
    // Paso 1: Limpiar el input para permitir solo números
    let cleanInput = String(input).replace(/[^0-9]/g, '');

    // Paso 2: Si no hay números válidos, retornar cadena vacía
    if (!cleanInput) {
        return '';
    }

    // Paso 3: Convertir el string limpio a un número entero
    const numero = parseInt(cleanInput, 10);

    // Paso 4: Formatear el número como moneda con separadores de miles
    const numeroFormateado = numero.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    // Paso 5: Retornar el resultado final
    return numeroFormateado;
};