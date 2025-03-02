

export const convertirStringANumero = (stringValor) => {

    if (stringValor.includes('%')) {
        const numeroString = stringValor.replace(/[%\s]/g, "");

        return parseFloat(numeroString.replace(",", "."));
    }

    else if (stringValor.match(/[$€£¥]/)) {
        const numeroString = stringValor.replace(/[$€£¥\s.]/g, "");

        return parseFloat(numeroString.replace(",", "."));
    } else {

        const numeroString = stringValor.trim().replace(/\./g, "").replace(",", ".");

        return parseFloat(numeroString);
    }
}