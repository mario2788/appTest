

export const validarPorcentaje = (input) => {

    const flagNeg = String(input).indexOf('-') === 0;

    const cleanInput = String(input).replace(/[^0-9]/g, '');

    if (!cleanInput) {
        return '';
    }

    const numero = parseInt(cleanInput, 10);

    if (numero < 0 || numero > 100) {
        return '';
    }

    const porcentajeFormateado = flagNeg ? `-${numero}%` : `${numero}%`;

    return porcentajeFormateado;

}