


import { createTheme } from "@mui/material/styles";
import { red } from '@mui/material/colors';
// https://mui.com/material-ui/customization/color/

const temaClaro = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // Color primario
        },
        secondary: {
            main: '#9c27b0', // Color secundario
        },
        alert: {
            main: red[500]
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
    }
});

export default temaClaro;