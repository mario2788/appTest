


import { createTheme } from "@mui/material/styles";
import { red } from '@mui/material/colors';
// https://mui.com/material-ui/customization/color/

const temaOscuro = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc', // Color primario (morado claro)
            light: '#cf9ffc', // Versión más clara del primario
            dark: '#9a6fcf', // Versión más oscura del primario
        },
        secondary: {
            main: '#03dac6', // Color secundario (turquesa)
            light: '#35e3d1', // Versión más clara del secundario
            dark: '#029e8f', // Versión más oscura del secundario
        },
        alert: {
            main: '#ff6b6b', // Rojo suave para alertas
            light: '#ff8f8f', // Versión más clara
            dark: '#cc5656', // Versión más oscura
        },
        background: {
            default: '#121212', // Fondo oscuro
            paper: '#1e1e1e', // Fondo de elementos como tarjetas
            overPaper: '#2a2a2a', // Un tono intermedio para resaltar sobre el fondo de papel
        },
        text: {
            primary: '#ffffff', // Texto principal en modo oscuro
            secondary: '#b0b0b0', // Texto secundario
            disabled: '#757575', // Texto deshabilitado
        },
        divider: '#383838', // Color para separadores o bordes
    }
});

export default temaOscuro;