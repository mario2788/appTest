

// import { pink, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const temaClaro = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // Color primario
        },
        secondary: {
            main: '#9c27b0', // Color secundario
        },
        background: {
            default: '#f2c147', // Fondo claro
            paper: '#e8dede;', // Fondo de elementos como tarjetas
            overPaper: '#c2c2c2'
        },
        text: {
            primary: '#4777f2', // Texto principal en modo claro
            secondary: '#757575', // Texto secundario
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

export default temaClaro;