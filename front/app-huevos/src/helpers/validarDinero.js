
export const validarDinero = (input) => {

    let cleanInput = String(input).replace(/[^0-9]/g, '');

    if (!cleanInput) {
        return '';
    }

    const numero = parseInt(cleanInput, 10);

    const numeroFormateado = numero.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return numeroFormateado;
};