import React from 'react';

// Mui
import Box from '@mui/material/Box';

const Rutas = () => {

    const styleBox = {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 3
    }

    return (
        <Box sx={styleBox}>
            <h3>
                Pagina Rutas
            </h3>
        </Box>
    )
}

export default Rutas