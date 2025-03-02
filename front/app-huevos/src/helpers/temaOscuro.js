

// import { pink, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const temaOscuro = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc', // Color primario
        },
        secondary: {
            main: '#03dac6', // Color secundario
        },
        background: {
            default: '#121212', // Fondo oscuro
            paper: '#1e1e1e', // Fondo de elementos como tarjetas
            overPaper: '#656565'
        },
        text: {
            primary: '#ffffff', // Texto principal en modo oscuro
            secondary: '#b0b0b0', // Texto secundario
        },
    },
    typography: {
        h1: {
            fontSize: '2rem',
            color: 'peru'
        },
        subtitle1: {
            fontWeight: '500',
            fontSize: '5rem',
            color: 'gold'
        }
    }
});

export default temaOscuro;